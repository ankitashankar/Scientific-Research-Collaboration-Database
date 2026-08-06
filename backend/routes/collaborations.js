const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireRole } = require('../middleware/role');

router.get('/', (req, res) => {
    const sql = `
        SELECT c.collaboration_id, a1.name AS author1, a2.name AS author2, c.collaboration_count
        FROM Collaborations c
        JOIN Authors a1 ON c.author1_id = a1.author_id
        JOIN Authors a2 ON c.author2_id = a2.author_id
        ORDER BY c.collaboration_count DESC
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post('/add', requireRole('admin', 'researcher'), (req, res) => {
    const { author1_id, author2_id, collaboration_count } = req.body;
    db.query(
        'INSERT INTO Collaborations (author1_id, author2_id, collaboration_count) VALUES (?, ?, ?)',
        [author1_id, author2_id, collaboration_count],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Collaboration added successfully.' });
        }
    );
});

router.delete('/delete/:id', requireRole('admin'), (req, res) => {
    db.query('DELETE FROM Collaborations WHERE collaboration_id=?', [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Collaboration deleted.' });
    });
});

module.exports = router;
