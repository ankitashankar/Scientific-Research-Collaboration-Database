const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /papers/filter?yearFrom=&yearTo=&minCitations=&maxCitations=&topic_id=&institution_id=
router.get('/filter', (req, res) => {
    const { yearFrom, yearTo, minCitations, maxCitations, topic_id, institution_id } = req.query;

    let sql = `SELECT DISTINCT p.paper_id, p.title, p.year, p.citations`;
    
    // Check if additional columns exist
    db.query(`SHOW COLUMNS FROM Papers WHERE Field IN ('status', 'paper_link')`, (err, cols) => {
        if (!err && cols) {
            cols.forEach(col => {
                sql += `, p.${col.Field}`;
            });
        }
        
        sql += ` FROM Papers p`;
        
        const joins = [];
        const where = [];
        const params = [];

        if (topic_id) {
            joins.push('JOIN Paper_Topic pt ON p.paper_id = pt.paper_id');
            where.push('pt.topic_id = ?');
            params.push(topic_id);
        }
        if (institution_id) {
            joins.push('JOIN Author_Paper ap ON p.paper_id = ap.paper_id');
            joins.push('JOIN Author_Institution ai ON ap.author_id = ai.author_id');
            where.push('ai.institution_id = ?');
            params.push(institution_id);
        }
        if (yearFrom)      { where.push('p.year >= ?');       params.push(yearFrom); }
        if (yearTo)        { where.push('p.year <= ?');       params.push(yearTo); }
        if (minCitations)  { where.push('p.citations >= ?');  params.push(minCitations); }
        if (maxCitations)  { where.push('p.citations <= ?');  params.push(maxCitations); }

        if (joins.length)  sql += ' ' + [...new Set(joins)].join(' ');
        if (where.length)  sql += ' WHERE ' + where.join(' AND ');
        sql += ' ORDER BY p.year DESC';

        db.query(sql, params, (err, rows) => {
            if (err) {
                console.error('Filter query error:', err);
                return res.status(500).json({ error: 'Database error', details: err.message });
            }
            res.json(rows);
        });
    });
});

module.exports = router;
