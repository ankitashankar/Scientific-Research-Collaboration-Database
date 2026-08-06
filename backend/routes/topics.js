const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireRole } = require('../middleware/role');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Topics ORDER BY topic_id ASC', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post('/add', requireRole('admin', 'researcher'), (req, res) => {
    const { topic_name } = req.body;
    if (!topic_name) return res.status(400).json({ message: 'Topic name is required.' });
    db.query('INSERT INTO Topics (topic_name) VALUES (?)', [topic_name], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Topic added successfully.' });
    });
});

router.put('/update/:id', requireRole('admin', 'researcher'), (req, res) => {
    const { topic_name } = req.body;
    db.query('UPDATE Topics SET topic_name=? WHERE topic_id=?', [topic_name, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Topic updated.' });
    });
});

router.delete('/delete/:id', requireRole('admin'), (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Paper_Topic WHERE topic_id=?', [id], () => {
        db.query('DELETE FROM Topics WHERE topic_id=?', [id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Topic deleted.' });
        });
    });
});

module.exports = router;
