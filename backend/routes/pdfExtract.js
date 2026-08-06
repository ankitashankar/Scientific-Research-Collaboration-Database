const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const https = require('https');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads/papers');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '.pdf');
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files are allowed'));
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Fetch citation count — tries CrossRef first (by DOI), then Semantic Scholar (by title)
function fetchCitations(doi, title) {
    return new Promise((resolve) => {
        if (doi) {
            const doiId = doi.replace(/https?:\/\/doi\.org\//, '');
            const url = `https://api.crossref.org/works/${encodeURIComponent(doiId)}`;
            const req = https.get(url, { headers: { 'User-Agent': 'ResearchCollabDB/1.0 (mailto:admin@researchdb.com)' } }, (res) => {
                let data = '';
                res.on('data', c => { data += c; });
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        const count = json.message && json.message['is-referenced-by-count'];
                        if (count !== undefined && count !== null) return resolve(count);
                    } catch {}
                    // CrossRef failed, try Semantic Scholar by title
                    fetchByTitle(title, resolve);
                });
            });
            req.on('error', () => fetchByTitle(title, resolve));
            req.setTimeout(8000, () => { req.destroy(); fetchByTitle(title, resolve); });
        } else {
            fetchByTitle(title, resolve);
        }
    });
}

function fetchByTitle(title, resolve) {
    if (!title) return resolve(0);
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(title)}&fields=citationCount&limit=1`;
    const req = https.get(url, { headers: { 'User-Agent': 'ResearchCollabDB/1.0' } }, (res) => {
        let data = '';
        res.on('data', c => { data += c; });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                resolve((json.data && json.data[0] && json.data[0].citationCount) || 0);
            } catch { resolve(0); }
        });
    });
    req.on('error', () => resolve(0));
    req.setTimeout(8000, () => { req.destroy(); resolve(0); });
}

// Debug endpoint
router.post('/debug', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file' });
        const data = await pdfParse(fs.readFileSync(req.file.path));
        fs.unlinkSync(req.file.path);
        res.json({
            lines: data.text.split('\n').map((l, i) => `${i}: ${l}`).slice(0, 120),
            info: data.info
        });
    } catch (e) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: e.message });
    }
});

// Extract metadata from PDF
router.post('/extract', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No PDF file uploaded' });
        const pdfPath = req.file.path;
        const pdfData = await pdfParse(fs.readFileSync(pdfPath));
        fs.unlinkSync(pdfPath);

        const metadata = extractPaperMetadata(pdfData.text, pdfData.info);

        // Fetch citations from Semantic Scholar using DOI first, then title
        metadata.citations = await fetchCitations(metadata.paper_link, metadata.title);

        res.json({ success: true, data: metadata });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: 'Failed to extract data from PDF', details: error.message });
    }
});

function isJournalHeaderLine(line) {
    const l = line.trim();
    if (/\b(vol|volume|no|issue|pp|page)\b\.?\s*\d/i.test(l)) return true;
    if (/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(l)) return true;
    if (/^(abstract|introduction|keywords|received|accepted|published|doi|http|issn|e-issn|copyright|©|proceedings|conference)/i.test(l)) return true;
    if (/^\d+$/.test(l)) return true;
    if (l.length > 5 && !/[a-z]/.test(l)) return true;
    if (/\d+\s*[-–]\s*\d+/.test(l) && /\b(pp|page|p\.)\b/i.test(l)) return true;
    return false;
}

function extractPaperMetadata(text, pdfInfo) {
    const metadata = { title: '', year: '', citations: 0, authors: [], abstract: '', keywords: [], paper_link: '' };

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // ── TITLE ──────────────────────────────────────────────────────────────────
    if (pdfInfo && pdfInfo.Title && pdfInfo.Title.trim().length > 15 && !isJournalHeaderLine(pdfInfo.Title.trim())) {
        metadata.title = pdfInfo.Title.trim().replace(/\s+/g, ' ');
    } else {
        for (const line of lines.slice(0, 40)) {
            if (line.length >= 20 && line.length <= 250 && !isJournalHeaderLine(line) && !/^\d/.test(line) && /[a-z]/.test(line)) {
                metadata.title = line.replace(/\s+/g, ' ');
                break;
            }
        }
    }

    // ── YEAR ───────────────────────────────────────────────────────────────────
    const pubYear = text.match(/(?:published|received|accepted|©|copyright)\s*[:\-]?\s*(?:\w+\s+)?((19|20)\d{2})\b/i);
    if (pubYear) {
        metadata.year = pubYear[1];
    } else {
        const allYears = [...text.matchAll(/\b((19|20)\d{2})\b/g)].map(m => m[1]);
        if (allYears.length) {
            const freq = {};
            allYears.slice(0, 30).forEach(y => { freq[y] = (freq[y] || 0) + 1; });
            metadata.year = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
        }
    }
    if (!metadata.year && pdfInfo && pdfInfo.CreationDate) {
        const m = pdfInfo.CreationDate.match(/(19|20)\d{2}/);
        if (m) metadata.year = m[0];
    }

    // ── AUTHORS ────────────────────────────────────────────────────────────────
    const abstractIdx = text.search(/\babstract\b/i);
    const header = text.substring(0, abstractIdx > 100 ? abstractIdx : 1500);
    const headerLines = header.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const badWord = /university|institute|department|college|school|india|email|@|journal|vol|issue|abstract|introduction|http|doi|©|inc\.|ltd\.|pvt\.|faculty|center|centre|laboratory|lab\b|research\s+group/i;

    const explicitMatch = header.match(/(?:authors?|by)\s*[:\-]\s*([^\n]{5,200})/i);
    if (explicitMatch) {
        const parts = explicitMatch[1]
            .split(/[,;]\s*(?:and\s+)?|\s+and\s+/)
            .map(a => a.trim())
            .filter(a => a.length > 3 && /^[A-Z]/.test(a) && /[a-z]/.test(a) && !badWord.test(a) && !/\d/.test(a));
        if (parts.length) metadata.authors = parts;
    }

    if (!metadata.authors.length) {
        const nameRe = /^[A-Z][a-zA-Z.''\-]{1,20}(\s+[A-Z][a-zA-Z.''\-]{1,20}){1,4}(,\s*[A-Z][a-zA-Z.''\-]{1,20}(\s+[A-Z][a-zA-Z.''\-]{1,20}){1,4})*$/;
        for (const line of headerLines) {
            if (nameRe.test(line) && /[a-z]/.test(line) && !badWord.test(line) && !/\d/.test(line) && line.length < 120) {
                const parts = line.split(/,\s*/).map(p => p.trim()).filter(p => p.length > 3 && /[a-z]/.test(p) && /^[A-Z]/.test(p));
                if (parts.length >= 1) { metadata.authors = parts; break; }
            }
        }
    }

    // ── ABSTRACT ───────────────────────────────────────────────────────────────
    const absMatch = text.match(/\babstract\b[\s:\-]+([^\n].{80,2500}?)(?=\n{2,}|\b(?:keywords?|index\s+terms?|1\.?\s*introduction)\b)/is);
    if (absMatch) metadata.abstract = absMatch[1].trim().replace(/\s+/g, ' ');

    // ── KEYWORDS ───────────────────────────────────────────────────────────────
    const kwMatch = text.match(/(?:keywords?|index\s+terms?)\s*[:\-]\s*([^\n]{5,300})/i);
    if (kwMatch) {
        metadata.keywords = kwMatch[1].split(/[,;·•—]/).map(k => k.trim()).filter(k => k.length > 2 && k.length < 60);
    }

    // ── DOI / LINK ─────────────────────────────────────────────────────────────
    const doiUrl = text.match(/https?:\/\/doi\.org\/[^\s,;)>"'\]]+/i);
    if (doiUrl) {
        metadata.paper_link = doiUrl[0].replace(/[.,;)>"'\]]+$/, '');
    } else {
        const bareDoi = text.match(/\bdoi\s*[:\-]\s*(10\.[^\s,;)>"'\]]+)/i);
        if (bareDoi) {
            metadata.paper_link = 'https://doi.org/' + bareDoi[1].replace(/[.,;)>"'\]]+$/, '');
        } else {
            const knownUrl = text.match(/https?:\/\/(?:arxiv\.org|ieeexplore\.ieee\.org|dl\.acm\.org|link\.springer\.com|www\.sciencedirect\.com|researchgate\.net)[^\s,;)>"'\]]*/i);
            if (knownUrl) metadata.paper_link = knownUrl[0].replace(/[.,;)>"'\]]+$/, '');
        }
    }
    if (!metadata.paper_link && pdfInfo) {
        const src = [pdfInfo.Subject, pdfInfo.Keywords, pdfInfo.Creator].filter(Boolean).join(' ');
        const m = src.match(/https?:\/\/[^\s,;)>"']+/);
        if (m) metadata.paper_link = m[0].replace(/[.,;)>"']+$/, '');
    }

    return metadata;
}

module.exports = router;
