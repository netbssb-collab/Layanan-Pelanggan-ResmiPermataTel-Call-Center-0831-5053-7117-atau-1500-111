import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { verifyContactNumber, OFFICIAL_PERMATA_CONTACTS } from './src/data/officialContacts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing.');
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'PermataTel Customer Care Hub Backend',
      timestamp: new Date().toISOString(),
      geminiConfigured: !!process.env.GEMINI_API_KEY
    });
  });

  // API Route: Verification of phone number / WhatsApp
  app.post('/api/verify-number', (req, res) => {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber || typeof phoneNumber !== 'string') {
        res.status(400).json({ error: 'Nomor telepon tidak valid.' });
        return;
      }

      const result = verifyContactNumber(phoneNumber);
      res.json(result);
    } catch (err: any) {
      console.error('Error verifying number:', err);
      res.status(500).json({ error: 'Gagal memproses verifikasi nomor.' });
    }
  });

  // API Route: Official Directory
  app.get('/api/contacts', (req, res) => {
    res.json({ contacts: OFFICIAL_PERMATA_CONTACTS });
  });

  // API Route: Gemini Chat with Google Search Grounding
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
        return;
      }

      const ai = getGeminiAI();

      const systemInstruction = `
Kamu adalah PermataCare AI Assistant - Asisten Resmi Layanan Pelanggan PermataTel (PermataBank).
Tugasmu:
1. Memberikan informasi layanan perbankan PermataBank yang akurat, ramah, dan profesional dalam bahasa Indonesia.
2. Membantu nasabah dengan informasi kontak resmi PermataTel (1500111 untuk umum, 1500100 untuk Priority, 1500110 untuk Syariah, WA Resmi Centang Hijau +6281280000111).
3. Melindungi nasabah dari penipuan/scam/phishing. SELALU tegaskan bahwa PermataBank TIDAK PERNAH meminta OTP, PIN ATM, Password PermataMobile X, CVV kartu, atau meminta menginstal file APK lewat WhatsApp/HP seluler pribadi.
4. Jika nasabah menanyakan tentang nomor HP seperti +6283150537117 atau nomor seluler biasa yang mengaku Call Center, PERINGATKAN BAHWA ITU ADALAH INDIKASI PENIPUAN/SCAM karena Call Center Resmi PermataTel adalah 1500111.
5. Gunakan Google Search Grounding secara aktif untuk memberikan berita terbaru, lokasi kantor cabang PermataBank, fitur terbaru PermataMobile X, serta penyesuaian tarif/layanan terkini.
      `;

      // Build context prompt
      const promptText = `
${systemInstruction}

Pertanyaan/Pesan Nasabah:
"${message}"

Sediakan jawaban lengkap, jelas dengan format markdown yang rapi, poin-poin yang mudah dibaca, dan langkah aman.
      `.trim();

      // Call Gemini model with Google Search Grounding
      // Using gemini-2.5-flash with googleSearch tool enabled
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || 'Maaf, sistem tidak dapat memproses tanggapan saat ini.';

      // Extract search grounding sources and queries
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];
      const rawChunks = groundingMetadata?.groundingChunks || [];

      const groundingSources: { title: string; url: string }[] = [];
      if (Array.isArray(rawChunks)) {
        for (const chunk of rawChunks) {
          if (chunk.web?.uri && chunk.web?.title) {
            // Avoid duplicate URLs
            if (!groundingSources.some((s) => s.url === chunk.web.uri)) {
              groundingSources.push({
                title: chunk.web.title,
                url: chunk.web.uri,
              });
            }
          }
        }
      }

      res.json({
        reply: responseText,
        groundingSources,
        searchQueries,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Gemini Chat API Error:', err);
      // Fallback response if Gemini API key is missing or encounters temporary error
      if (err.message && err.message.includes('GEMINI_API_KEY')) {
        res.status(500).json({
          error: 'API Key Gemini belum dikonfigurasi. Silakan atur GEMINI_API_KEY pada panel Secrets.',
          fallbackReply: `Layanan Pelanggan Resmi PermataTel dapat dihubungi melalui:\n- Call Center 24/7: **1500111**\n- WhatsApp Resmi (Centang Hijau): **0812-8000-0111**\n- Email Resmi: **care@permatabank.co.id**\n\n*Catatan Keamanan:* PermataBank tidak pernah meminta OTP, PIN, atau Password Anda.`
        });
        return;
      }

      res.status(500).json({
        error: err.message || 'Gagal memproses tanggapan AI.',
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PermataTel Hub] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
