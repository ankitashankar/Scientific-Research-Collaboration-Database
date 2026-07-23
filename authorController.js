const db = require('../db');

// GET authors
const getAuthors = (req, res) => {
    db.query('SELECT * FROM Authors', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

// POST author
const addAuthor = (req, res) => {
    const { name, email, country } = req.body;

    const query = 'INSERT INTO Authors (name, email, country) VALUES (?, ?, ?)';

    db.query(query, [name, email, country], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Author added successfully' });
    });
};

module.exports = { getAuthors, addAuthor };