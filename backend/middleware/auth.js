const jwt = require('jsonwebtoken');
const JWT_SECRET = 'researchdb_jwt_secret_2024';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = { verifyToken, JWT_SECRET };
