const db = require('../db');  // ADD THIS

// GET papers
const getPapers = (req, res) => {
    db.query('SELECT * FROM Papers', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
};

// POST paper
const addPaper = (req, res) => {
    const { title, year, citations } = req.body;

    const query = 'INSERT INTO Papers (title, year, citations) VALUES (?, ?, ?)';

    db.query(query, [title, year, citations], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: 'Paper added successfully' });
        }
    });
};

module.exports = { getPapers, addPaper };