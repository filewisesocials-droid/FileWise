import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { COUNTRIES, getCountryByCode } from './src/data/countries.js';
import { calculateRequirement, DOCUMENT_TYPES } from './src/data/documents.js';
import { INITIAL_TRACKING_ORDERS } from './src/data/tracking.js';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client (Lazy check on API endpoints)
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Filewise Document Legalisation Engine' });
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
    const originCode = (req.query.origin as string) || 'GB';
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

  // Calculate customized quote
  app.post('/api/quote/calculate', (req, res) => {
    const body = req.body || {};
    const { originCode = 'GB', destinationCode = 'AE', documents = [], speed = 'STANDARD', needTranslation = false, translationPages = 1, needSolicitorCertification = true, needReturnCourier = true } = body;

    const origin = getCountryByCode(originCode);
    const destination = getCountryByCode(destinationCode);
    const requirement = calculateRequirement(origin, destination);

    let baseDocFee = 0;
    let docDetails: any[] = [];

    for (const docItem of documents) {
      const docType = DOCUMENT_TYPES.find(d => d.id === docItem.typeId) || DOCUMENT_TYPES[0];
      const qty = docItem.quantity || 1;
      const docFee = docType.typicalFeeZAR * qty;
      baseDocFee += docFee;
      docDetails.push({
        typeId: docType.id,
        name: docType.name,
        quantity: qty,
        unitFee: docType.typicalFeeZAR,
        totalDocFee: docFee
      });
    }

    if (documents.length === 0) {
      baseDocFee = 1350; // default fallback single document in ZAR
    }

    // Speed multiplier
    let speedFee = 0;
    if (speed === 'EXPRESS') {
      speedFee = 1170;
    } else if (speed === 'SUPER_EXPRESS') {
      speedFee = 2520;
    }

    // Translation fee
    const translationTotal = needTranslation ? (translationPages || 1) * Math.max(origin.translationFeePerPageZAR, destination.translationFeePerPageZAR) : 0;

    // Solicitor certification
    const solicitorTotal = needSolicitorCertification ? origin.solicitorFeeZAR * (documents.length || 1) : 0;

    // Embassy or Apostille Govt Fee
    const govtFee = requirement.isHagueToHague ? origin.apostilleFeeZAR * (documents.length || 1) : (origin.apostilleFeeZAR + destination.embassyAttestationFeeZAR) * (documents.length || 1);

    // Courier shipping
    const courierFee = needReturnCourier ? 810 : 0;

    const totalEstimate = baseDocFee + speedFee + translationTotal + solicitorTotal + govtFee + courierFee;

    const estDays = speed === 'SUPER_EXPRESS' ? 2 : speed === 'EXPRESS' ? requirement.totalEstimatedDaysExpress : requirement.totalEstimatedDaysStandard;

    res.json({
      origin: origin.name,
      destination: destination.name,
      isHagueToHague: requirement.isHagueToHague,
      legalisationType: requirement.legalisationType,
      currency: 'ZAR',
      breakdown: {
        baseDocFee,
        speedFee,
        translationTotal,
        solicitorTotal,
        govtFee,
        courierFee
      },
      totalFeeZAR: totalEstimate,
      estimatedProcessingDays: estDays,
      docDetails
    });
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

  // AI Document Legalisation Advisor endpoint
  app.post('/api/ai/advise', async (req, res) => {
    try {
      const { prompt, originCountry = 'United Kingdom', destinationCountry = 'UAE', documentType = 'Degree Certificate' } = req.body;
      
      const ai = getAi();
      if (!ai) {
        return res.json({
          reply: `To get real-time tailored consular legalisation advice for ${documentType} from ${originCountry} to ${destinationCountry}, please provide your GEMINI_API_KEY in Settings > Secrets.\n\nGeneral Rule: Documents issued in ${originCountry} intended for use in ${destinationCountry} require notary verification, state legalization, and embassy attestation.`
        });
      }

      const systemInstruction = `You are Filewise AI Legalisation Advisor, a world-class consular law specialist and document legalisation authority.
Provide ultra-accurate, clear, step-by-step guidance on Apostille, Embassy Attestation, Solicitor notarisation, and Ministry of Foreign Affairs (MOFA) compliance for international documents.
Note: All pricing and fee estimates MUST be expressed in South African Rand (ZAR / R).
Always structure your answers with:
1. Clear Status (e.g. Hague Convention member vs Non-Hague procedure)
2. Exact Step-by-Step Sequence (Authority names e.g. FCDO UK, US Dept of State, UAE MOFA)
3. Essential Prerequisites (e.g. Original vs Certified Copy, Sworn Translation)
4. Estimated Timeline, Fees in ZAR (R), & Pro Tips to prevent rejection. Keep formatting clean with bullet points and bold headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `User Question: ${prompt}\nContext: Document Origin: ${originCountry}, Destination: ${destinationCountry}, Document Type: ${documentType}`,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Error calling Gemini AI:', err);
      res.status(500).json({ error: err.message || 'Failed to generate legalisation advice' });
    }
  });

  // AI Document Scanner & Analyzer endpoint
  app.post('/api/ai/scan-document', async (req, res) => {
    try {
      const { documentText, originCountry = 'United Kingdom', destinationCountry = 'United Arab Emirates' } = req.body;

      const ai = getAi();
      if (!ai) {
        return res.json({
          analysis: {
            detectedCategory: 'ACADEMIC',
            documentName: 'Academic Degree Certificate',
            apostilleEligible: true,
            notaryRequired: true,
            recommendation: 'Document requires Notary Public authentication before state legalization. Upload your Gemini API key in Settings > Secrets for instant AI optical scanning.'
          }
        });
      }

      const prompt = `Analyze this document text/description and determine legalisation compliance for use in ${destinationCountry} (Origin: ${originCountry}):
"""
${documentText}
"""

Return a strict JSON object matching this schema:
{
  "detectedCategory": "PERSONAL" | "ACADEMIC" | "COMMERCIAL" | "LEGAL" | "MEDICAL",
  "documentName": string,
  "apostilleEligible": boolean,
  "notaryRequired": boolean,
  "requiresTranslation": boolean,
  "riskFlags": string[],
  "nextActionSteps": string[],
  "summary": string
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ analysis: parsed });
    } catch (err: any) {
      console.error('Error scanning document with Gemini:', err);
      res.status(500).json({ error: 'Failed to scan document' });
    }
  });

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
