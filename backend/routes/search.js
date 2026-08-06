const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /search?q=keyword
router.get('/', (req, res) => {
    const q = `%${req.query.q || ''}%`;
    if (!req.query.q || req.query.q.trim().length < 1) {
        return res.json({ authors: [], papers: [], institutions: [] });
    }

    const results = {};
    let done = 0;
    const finish = () => { if (++done === 3) res.json(results); };

    db.query(
        'SELECT author_id AS id, name, email FROM Authors WHERE name LIKE ? OR email LIKE ? LIMIT 6',
        [q, q], (err, rows) => { results.authors = err ? [] : rows; finish(); }
    );
    db.query(
        'SELECT paper_id AS id, title, year, citations FROM Papers WHERE title LIKE ? LIMIT 6',
        [q], (err, rows) => { results.papers = err ? [] : rows; finish(); }
    );
    db.query(
        'SELECT institution_id AS id, name FROM Institutions WHERE name LIKE ? LIMIT 6',
        [q], (err, rows) => { results.institutions = err ? [] : rows; finish(); }
    );
});

module.exports = router;
