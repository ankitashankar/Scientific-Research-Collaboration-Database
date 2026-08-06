const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireRole } = require('../middleware/role');

// GET — all roles
router.get('/', (req, res) => {
    db.query('SELECT * FROM Authors ORDER BY author_id ASC', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// GET papers by author
router.get('/:id/papers', (req, res) => {
    db.query(
        `SELECT p.paper_id, p.title, p.year, p.citations, p.paper_link, p.status
         FROM papers p
         JOIN author_paper ap ON p.paper_id = ap.paper_id
         WHERE ap.author_id = ?
         ORDER BY p.year DESC`,
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// ADD — admin, researcher
router.post('/add', requireRole('admin', 'researcher'), (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO Authors (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Author added successfully.' });
    });
});

// UPDATE — admin, researcher
router.put('/update/:id', requireRole('admin', 'researcher'), (req, res) => {
    const { name, email } = req.body;
    db.query('UPDATE Authors SET name=?, email=? WHERE author_id=?', [name, email, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Author updated.' });
    });
});

// DELETE — admin only
router.delete('/delete/:id', requireRole('admin'), (req, res) => {
    db.query('DELETE FROM Authors WHERE author_id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Author deleted.' });
    });
});

module.exports = router;
