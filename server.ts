import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { COUNTRIES, getCountryByCode } from './src/data/countries.js';
import { calculateRequirement, DOCUMENT_TYPES } from './src/data/documents.js';
import { INITIAL_TRACKING_ORDERS } from './src/data/tracking.js';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Filewise Document Legalisation Engine' });
  });

  // Explicit handlers for Googlebot crawlers
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  // Get all countries or filter by query
  app.get('/api/countries', (req, res) => {
    const q = ((req.query.q as string) || '').toLowerCase().trim();
    const region = ((req.query.region as string) || '').trim();

    let result = COUNTRIES;
    if (region && region !== 'ALL') {
      result = result.filter(c => c.region === region);
    }
    if (q) {
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }

    res.json({ countries: result, count: result.length });
  });

  // Get specific requirement between origin & destination
  app.get('/api/requirement', (req, res) => {
    const originCode = (req.query.origin as string) || 'ZA';
    const destCode = (req.query.destination as string) || 'AE';

    const origin = getCountryByCode(originCode);
    const destination = getCountryByCode(destCode);

    const requirement = calculateRequirement(origin, destination);
    res.json(requirement);
  });

  // Get document types
  app.get('/api/document-types', (req, res) => {
    res.json(DOCUMENT_TYPES);
  });

  // Track order endpoint
  app.get('/api/track/:orderId', (req, res) => {
    const orderId = (req.params.orderId || '').toUpperCase().trim();
    const found = INITIAL_TRACKING_ORDERS.find(o => o.id === orderId || o.trackingNumber.toUpperCase() === orderId);

    if (found) {
      res.json({ success: true, order: found });
    } else {
      res.status(404).json({
        success: false,
        message: `Order reference ${orderId} not found. Try demo codes FW-98214 or FW-74309.`
      });
    }
  });

  // Serve static assets from public folder
  const publicPath = path.join(process.cwd(), 'public');
  app.use(express.static(publicPath));

  // Serve static files in production or mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Filewise Legalisation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
