const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireRole } = require('../middleware/role');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Institutions ORDER BY institution_id ASC', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post('/add', requireRole('admin', 'researcher'), (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required.' });
    db.query('INSERT INTO Institutions (name) VALUES (?)', [name], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Institution added successfully.' });
    });
});

router.put('/update/:id', requireRole('admin', 'researcher'), (req, res) => {
    const { name } = req.body;
    db.query('UPDATE Institutions SET name=? WHERE institution_id=?', [name, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Institution updated.' });
    });
});

router.get('/:id/authors', (req, res) => {
    db.query(
        `SELECT a.author_id, a.name, a.email
         FROM authors a
         JOIN author_institution ai ON a.author_id = ai.author_id
         WHERE ai.institution_id = ?
         ORDER BY a.name ASC`,
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

router.delete('/delete/:id', requireRole('admin'), (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Author_Institution WHERE institution_id=?', [id], () => {
        db.query('DELETE FROM Institutions WHERE institution_id=?', [id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Institution deleted.' });
        });
    });
});

module.exports = router;
