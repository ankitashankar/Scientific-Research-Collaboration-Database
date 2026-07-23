const db = require('../db');

// GET institutions
const getInstitutions = (req, res) => {
    db.query('SELECT * FROM Institutions', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

// POST institution
const addInstitution = (req, res) => {
    const { name, country } = req.body;

    const query = 'INSERT INTO Institutions (name, country) VALUES (?, ?)';

    db.query(query, [name, country], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Institution added successfully' });
    });
};

module.exports = { getInstitutions, addInstitution };