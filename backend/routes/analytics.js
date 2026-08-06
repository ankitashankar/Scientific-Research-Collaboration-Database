const express = require('express');
const router = express.Router();
const db = require('../db');

// ── 1. Most Cited Authors Leaderboard ─────────────────────────
// SQL: JOIN Author_Paper → Papers, SUM citations, COUNT papers, compute h-index
router.get('/cited-authors', (req, res) => {
    const sql = `
        SELECT
            a.author_id,
            a.name,
            a.email,
            COUNT(ap.paper_id)          AS total_papers,
            COALESCE(SUM(p.citations),0) AS total_citations,
            COALESCE(MAX(p.citations),0) AS max_citations,
            COALESCE(AVG(p.citations),0) AS avg_citations
        FROM Authors a
        LEFT JOIN Author_Paper ap ON a.author_id = ap.author_id
        LEFT JOIN Papers p        ON ap.paper_id  = p.paper_id
        GROUP BY a.author_id
        ORDER BY total_citations DESC
        LIMIT 15
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// ── 2. H-Index per Author ──────────────────────────────────────
// SQL: For each author get all paper citations sorted DESC,
//      h-index = largest h where at least h papers have >= h citations
router.get('/hindex', (req, res) => {
    const sql = `
        SELECT
            a.author_id,
            a.name,
            GROUP_CONCAT(p.citations ORDER BY p.citations DESC) AS citation_list,
            COUNT(ap.paper_id) AS total_papers
        FROM Authors a
        JOIN Author_Paper ap ON a.author_id = ap.author_id
        JOIN Papers p        ON ap.paper_id  = p.paper_id
        GROUP BY a.author_id
        ORDER BY total_papers DESC
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        // Compute h-index in JS from citation_list
        const result = rows.map(row => {
            const citations = row.citation_list
                ? row.citation_list.split(',').map(Number)
                : [];
            let h = 0;
            for (let i = 0; i < citations.length; i++) {
                if (citations[i] >= i + 1) h = i + 1;
                else break;
            }
            return { author_id: row.author_id, name: row.name, h_index: h, total_papers: row.total_papers };
        });
        res.json(result.sort((a, b) => b.h_index - a.h_index).slice(0, 12));
    });
});

// ── 3. Trending Topics Over Time ───────────────────────────────
// SQL: COUNT papers per topic per year via Paper_Topic JOIN Papers
router.get('/trending-topics', (req, res) => {
    const sql = `
        SELECT
            t.topic_name,
            p.year,
            COUNT(pt.paper_id) AS paper_count
        FROM Topics t
        JOIN Paper_Topic pt ON t.topic_id  = pt.topic_id
        JOIN Papers p       ON pt.paper_id = p.paper_id
        WHERE p.year IS NOT NULL
        GROUP BY t.topic_id, p.year
        ORDER BY p.year ASC, paper_count DESC
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);

        // Pivot: { topic -> { year -> count } }
        const topics = {};
        const yearsSet = new Set();
        rows.forEach(r => {
            if (!topics[r.topic_name]) topics[r.topic_name] = {};
            topics[r.topic_name][r.year] = r.paper_count;
            yearsSet.add(r.year);
        });
        const years = Array.from(yearsSet).sort();
        res.json({ topics, years });
    });
});

// ── 4. Institution Publication Heatmap ────────────────────────
// SQL: COUNT papers per institution per year
router.get('/institution-heatmap', (req, res) => {
    const sql = `
        SELECT
            i.name        AS institution,
            p.year,
            COUNT(DISTINCT p.paper_id) AS paper_count
        FROM Institutions i
        JOIN Author_Institution ai ON i.institution_id = ai.institution_id
        JOIN Author_Paper ap       ON ai.author_id     = ap.author_id
        JOIN Papers p              ON ap.paper_id      = p.paper_id
        WHERE p.year IS NOT NULL
        GROUP BY i.institution_id, p.year
        ORDER BY i.name, p.year
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);

        const institutions = {};
        const yearsSet = new Set();
        rows.forEach(r => {
            if (!institutions[r.institution]) institutions[r.institution] = {};
            institutions[r.institution][r.year] = r.paper_count;
            yearsSet.add(r.year);
        });
        const years = Array.from(yearsSet).sort();
        res.json({ institutions, years });
    });
});

// ── 5. Citation Metrics Summary ────────────────────────────────
// SQL: total citations, avg, median approx, top paper
router.get('/citation-metrics', (req, res) => {
    const sql = `
        SELECT
            SUM(citations)                                    AS total_citations,
            ROUND(AVG(citations), 1)                         AS avg_citations,
            MAX(citations)                                    AS max_citations,
            COUNT(*)                                         AS total_papers,
            SUM(CASE WHEN citations = 0 THEN 1 ELSE 0 END)  AS uncited_papers,
            SUM(CASE WHEN citations >= 10 THEN 1 ELSE 0 END) AS highly_cited
        FROM Papers
    `;
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows[0]);
    });
});

module.exports = router;
