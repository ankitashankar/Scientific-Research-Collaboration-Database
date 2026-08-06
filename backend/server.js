const express = require('express');
const cors = require('cors');
const app = express();

const { verifyToken } = require('./middleware/auth');

app.use(cors());
app.use(express.json());

// ── Public routes (no token needed) ──────────────────────────
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ── Protected routes (token required) ────────────────────────
const authorRoutes        = require('./routes/authors');
const paperRoutes         = require('./routes/papers');
const institutionRoutes   = require('./routes/institutions');
const topicRoutes         = require('./routes/topics');
const collaborationRoutes = require('./routes/collaborations');
const analyticsRoutes     = require('./routes/analytics');
const searchRoutes        = require('./routes/search');
const paperFilterRoutes   = require('./routes/paperfilter');
const pdfExtractRoutes    = require('./routes/pdfExtract');
const { router: notificationRoutes } = require('./routes/notifications');

app.use('/notifications', verifyToken, notificationRoutes);
app.use('/analytics',      verifyToken, analyticsRoutes);
app.use('/search',         verifyToken, searchRoutes);
app.use('/pdf',            verifyToken, pdfExtractRoutes);
app.use('/papers/filter',  verifyToken, paperFilterRoutes);
app.use('/authors',        verifyToken, authorRoutes);
app.use('/papers',         verifyToken, paperRoutes);
app.use('/institutions',   verifyToken, institutionRoutes);
app.use('/topics',         verifyToken, topicRoutes);
app.use('/collaborations', verifyToken, collaborationRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
