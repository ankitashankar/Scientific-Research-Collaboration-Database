const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');

// ── REGISTER ──────────────────────────────────────────────────
router.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required.' });
    }

    const allowedRoles = ['admin', 'researcher', 'viewer'];
    const userRole = allowedRoles.includes(role) ? role : 'viewer';

    // Check duplicate email
    db.query('SELECT user_id FROM Users WHERE email = ?', [email], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (rows.length > 0) return res.status(409).json({ message: 'Email already registered.' });

        const hash = bcrypt.hashSync(password, 10);
        db.query(
            'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, hash, userRole],
            (err2, result) => {
                if (err2) return res.status(500).json({ message: 'Failed to create user.' });
                res.status(201).json({ message: 'Account created successfully.' });
            }
        );
    });
});

// ── LOGIN ─────────────────────────────────────────────────────
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    db.query('SELECT * FROM Users WHERE email = ?', [email], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password.' });

        const user = rows[0];
        const valid = bcrypt.compareSync(password, user.password_hash);
        if (!valid) return res.status(401).json({ message: 'Invalid email or password.' });

        const token = jwt.sign(
            { user_id: user.user_id, username: user.username, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: { user_id: user.user_id, username: user.username, email: user.email, role: user.role }
        });
    });
});

// ── ME (verify token + return user info) ──────────────────────
router.get('/me', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
