import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { COUNTRIES, getCountryByCode } from './src/data/countries.js';
import { calculateRequirement, DOCUMENT_TYPES } from './src/data/documents.js';
import { INITIAL_TRACKING_ORDERS } from './src/data/tracking.js';
import {
  WORLDWIDE_DESTINATIONS,
  WORLDWIDE_REGIONS,
  FEATURED_REGION_GROUPS,
} from './src/data/worldwideVisaCountries.js';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectCountriesSeoHtml(html: string): string {
  const title = 'International Visa Assistance – Countries We Cover | FileWise South Africa';
  const description =
    'Need help with an international visa application as a South African passport holder? Explore destinations where advance visas or travel authorisations are required, and separate SA document legalisation services.';
  const canonicalUrl = 'https://www.filewise.co.za/countries';

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FileWise',
      url: 'https://www.filewise.co.za/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FileWise',
      url: 'https://www.filewise.co.za/',
      logo: 'https://www.filewise.co.za/favicon-96x96.png',
      email: 'info@filewise.co.za',
      telephone: '+27 50 215 4465',
      sameAs: [
        'https://www.facebook.com/share/1GhTJDMDL7/',
        'https://www.instagram.com/filewise_za',
        'https://www.youtube.com/@Filewise_ZA',
        'https://www.tiktok.com/@filewise8',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.filewise.co.za/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Countries We Assist With',
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Worldwide Visa Application Assistance for South African Passport Holders',
      provider: {
        '@type': 'Organization',
        name: 'FileWise',
        url: 'https://www.filewise.co.za/',
      },
      areaServed: 'Worldwide',
      url: canonicalUrl,
      description,
    },
  ]);

  const featuredHtml = FEATURED_REGION_GROUPS.map((group) => {
    const items = WORLDWIDE_DESTINATIONS.filter((d) => d.featuredGroup === group).sort(
      (a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999)
    );
    const listItems = items
      .map(
        (d) =>
          `<li>${escapeHtml(d.flag)} ${escapeHtml(d.displayName || d.name)} &mdash; ${escapeHtml(
            d.visaStatus
          )}</li>`
      )
      .join('');
    return `<section><h3>${escapeHtml(group)}</h3><ul>${listItems}</ul></section>`;
  }).join('');

  const regionsHtml = WORLDWIDE_REGIONS.map((region) => {
    const sovereign = WORLDWIDE_DESTINATIONS.filter(
      (d) => d.region === region && d.classification === 'sovereign'
    );
    const territories = WORLDWIDE_DESTINATIONS.filter(
      (d) => d.region === region && d.classification !== 'sovereign'
    );
    const sovereignItems = sovereign
      .map(
        (d) =>
          `<li>${escapeHtml(d.flag)} ${escapeHtml(d.name)} &mdash; ${escapeHtml(
            d.visaStatus
          )}</li>`
      )
      .join('');
    const territoryItems = territories
      .map(
        (d) =>
          `<li>${escapeHtml(d.flag)} ${escapeHtml(d.displayName || d.name)} (${escapeHtml(
            d.classificationLabel
          )}) &mdash; ${escapeHtml(d.visaStatus)}</li>`
      )
      .join('');

    return `<section><h3>${escapeHtml(region)}</h3><ul>${sovereignItems}</ul>${
      territories.length > 0
        ? `<h4>${escapeHtml(region)} Territories &amp; Special Regions</h4><ul>${territoryItems}</ul>`
        : ''
    }</section>`;
  }).join('');

  const crawlerFallbackHtml = `<div id="root">
      <header role="banner" style="padding: 20px; font-family: system-ui, sans-serif;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / Countries We Assist With</nav>
        <h1>Countries We Assist With &ndash; Worldwide Visa Application Assistance</h1>
        <p>FileWise assists South African passport holders preparing visa and travel authorisation applications for destinations where entry permission is required before travelling. Visa-free neighbouring and short-visit destinations (including Namibia, Botswana, Lesotho, Eswatini, Zimbabwe, and Mozambique) are excluded from this visa list.</p>
      </header>
      <main role="main" style="padding: 20px; font-family: system-ui, sans-serif;">
        <section>
          <h2>Featured Visa Destinations</h2>
          ${featuredHtml}
        </section>
        <section>
          <h2>Visa &amp; Travel Authorisation Directory</h2>
          ${regionsHtml}
        </section>
        <section>
          <h2>Document Legalisation, Apostilles &amp; Sworn Translations</h2>
          <p>Document legalisation (DIRCO Hague Apostille, High Court Authentication, Pretoria Embassy Attestation, and Sworn Translations) is a separate service offered for documents intended for any country worldwide, including visa-free countries.</p>
        </section>
        <section>
          <h2>Planning your next international trip?</h2>
          <p>Let FileWise help you prepare your visa application. WhatsApp: +27 50 215 4465 | Email: info@filewise.co.za | Website: https://www.filewise.co.za</p>
        </section>
      </main>
    </div>`;

  let updated = html;
  updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  updated = updated.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  updated = updated.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${escapeHtml(title)}" />`
  );
  updated = updated.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${canonicalUrl}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );
  updated = updated.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${jsonLd}</script>`
  );
  updated = updated.replace(/<div\s+id="root">[\s\S]*?<\/main>\s*<\/div>/i, crawlerFallbackHtml);

  return updated;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Filewise Document Legalisation Engine' });
  });

  // Explicit handlers for Googlebot crawlers & favicons
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  app.get(['/favicon.ico', '/favicon.svg', '/favicon-96x96.png', '/favicon-32x32.png', '/apple-touch-icon.png'], (req, res) => {
    const filename = req.path.replace('/', '');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.join(process.cwd(), 'public', filename));
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

    app.get(['/countries', '/countries/'], async (req, res, next) => {
      try {
        const templatePath = path.join(process.cwd(), 'index.html');
        const rawHtml = fs.readFileSync(templatePath, 'utf-8');
        const seoHtml = injectCountriesSeoHtml(rawHtml);
        const transformed = await vite.transformIndexHtml(req.originalUrl, seoHtml);
        res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').end(transformed);
      } catch (err) {
        next(err);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.get(['/countries', '/countries/'], (req, res) => {
      const distIndexPath = path.join(distPath, 'index.html');
      const rawHtml = fs.readFileSync(distIndexPath, 'utf-8');
      const seoHtml = injectCountriesSeoHtml(rawHtml);
      res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').end(seoHtml);
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Filewise Legalisation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
