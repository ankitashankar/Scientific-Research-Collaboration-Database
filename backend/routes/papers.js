const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireRole } = require('../middleware/role');
const { verifyToken } = require('../middleware/auth');
const { createNotification, notifyAllViewers, notifyAllAdmins } = require('./notifications');
const { sendMail } = require('../mailer');

// GET — all roles (viewers see only approved, admin/researcher see all)
router.get('/', verifyToken, (req, res) => {
    const userRole = req.user.role;
    db.query('SHOW COLUMNS FROM Papers', (err, columns) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err.message });
        const columnNames = columns.map(col => col.Field);
        let selectFields = 'paper_id, title, year, citations';
        if (columnNames.includes('paper_link')) selectFields += ', paper_link';
        if (columnNames.includes('status')) selectFields += ', status';
        if (columnNames.includes('submitted_by')) selectFields += ', submitted_by';
        if (columnNames.includes('submitted_at')) selectFields += ', submitted_at';
        if (columnNames.includes('approved_by')) selectFields += ', approved_by';
        if (columnNames.includes('approved_at')) selectFields += ', approved_at';
        if (columnNames.includes('rejection_reason')) selectFields += ', rejection_reason';
        let query = `SELECT ${selectFields} FROM Papers`;
        if (columnNames.includes('status')) query += " WHERE status = 'approved'";
        query += ' ORDER BY paper_id ASC';
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err.message });
            res.json(result.map(p => ({ ...p, status: p.status || 'approved', paper_link: p.paper_link || null })));
        });
    });
});

// GET single paper details (for review modal)
router.get('/detail/:id', verifyToken, (req, res) => {
    const sql = `
        SELECT p.*, u.username AS submitted_by_name
        FROM Papers p
        LEFT JOIN Users u ON p.submitted_by = u.user_id
        WHERE p.paper_id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (!result.length) return res.status(404).json({ message: 'Paper not found' });
        res.json(result[0]);
    });
});

// GET pending papers — admin only
router.get('/pending', requireRole('admin'), (req, res) => {
    db.query('SHOW COLUMNS FROM Papers', (err, columns) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err.message });
        const columnNames = columns.map(col => col.Field);
        if (!columnNames.includes('status')) return res.json([]);
        let selectFields = 'paper_id, title, year, citations';
        if (columnNames.includes('paper_link')) selectFields += ', paper_link';
        selectFields += ', status';
        if (columnNames.includes('submitted_by')) selectFields += ', submitted_by';
        if (columnNames.includes('submitted_at')) selectFields += ', submitted_at';
        db.query(`SELECT ${selectFields} FROM Papers WHERE status = 'pending' ORDER BY submitted_at DESC`, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err.message });
            res.json(result);
        });
    });
});

// ADD — admin, researcher
router.post('/', requireRole('admin', 'researcher'), (req, res) => {
    const { title, year, citations, paper_link, status } = req.body;
    const userId = req.user.user_id;
    const userRole = req.user.role;
    const paperStatus = userRole === 'admin' && status === 'approved' ? 'approved' : 'pending';
    db.query(
        'INSERT INTO Papers (title, year, citations, paper_link, status, submitted_by, submitted_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [title, year, citations, paper_link || null, paperStatus, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            const paperId = result.insertId;
            const message = paperStatus === 'approved' ? 'Paper added and approved successfully.' : 'Paper submitted for approval.';

            if (paperStatus === 'pending') {
                notifyAllAdmins('paper_pending', 'New Paper Awaiting Approval', `A new paper "${title}" was submitted for approval.`, '/papers.html')
                    .catch(err => console.error('Failed to notify admins:', err));
            } else {
                // Admin directly approved — notify all viewers & researchers
                notifyAllViewers('paper_added', 'New Paper Added', `A new paper has been published: "${title}"`, '/papers.html')
                    .catch(err => console.error('Failed to notify viewers:', err));
            }
            res.json({ message, paperId, status: paperStatus });
        }
    );
});

// APPROVE paper — admin only
router.put('/approve/:id', requireRole('admin'), (req, res) => {
    const paperId = req.params.id;
    const userId = req.user.user_id;
    db.query('SELECT title, submitted_by FROM Papers WHERE paper_id = ?', [paperId], (err, papers) => {
        if (err) return res.status(500).json(err);
        if (!papers.length) return res.status(404).json({ message: 'Paper not found' });
        const paper = papers[0];
        db.query(
            'UPDATE Papers SET status = "approved", approved_at = NOW(), approved_by = ? WHERE paper_id = ?',
            [userId, paperId],
            (err) => {
                if (err) return res.status(500).json(err);
                // Notify the submitter
                if (paper.submitted_by) {
                    db.query('SELECT email FROM Users WHERE user_id = ?', [paper.submitted_by], (err, users) => {
                        if (!err && users.length) {
                            sendMail(users[0].email, 'Paper Approved', `<p>Your paper <strong>"${paper.title}"</strong> has been approved and is now visible to all users.</p>`)
                                .catch(err => console.error('Email error:', err));
                        }
                    });
                    createNotification(paper.submitted_by, 'paper_approved', 'Paper Approved', `Your paper "${paper.title}" has been approved and published.`, '/papers.html')
                        .catch(err => console.error('Notification error:', err));
                }
                // Notify all viewers & researchers except the submitter (they get paper_approved above)
                notifyAllViewers('paper_added', 'New Paper Added', `A new paper has been published: "${paper.title}"`, '/papers.html', null, paper.submitted_by || null)
                    .catch(err => console.error('Failed to notify viewers on approval:', err));
                res.json({ message: 'Paper approved successfully.' });
            }
        );
    });
});

// REJECT paper — admin only
router.put('/reject/:id', requireRole('admin'), (req, res) => {
    const paperId = req.params.id;
    const { reason } = req.body;
    db.query('SELECT title, submitted_by FROM Papers WHERE paper_id = ?', [paperId], (err, papers) => {
        if (err) return res.status(500).json(err);
        if (!papers.length) return res.status(404).json({ message: 'Paper not found' });
        const paper = papers[0];
        const rejectionReason = reason || 'No reason provided';
        db.query(
            'UPDATE Papers SET status = "rejected", rejection_reason = ? WHERE paper_id = ?',
            [rejectionReason, paperId],
            (err) => {
                if (err) return res.status(500).json(err);
                if (paper.submitted_by) {
                    createNotification(paper.submitted_by, 'paper_rejected', 'Paper Rejected', `Your paper "${paper.title}" was rejected. Reason: ${rejectionReason}`, '/papers.html')
                        .catch(err => console.error('Notification error:', err));
                }
                res.json({ message: 'Paper rejected.' });
            }
        );
    });
});

// DELETE — admin only
router.delete('/:id', requireRole('admin'), (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM Paper_Topic WHERE paper_id=?', [id], () => {
        db.query('DELETE FROM Author_Paper WHERE paper_id=?', [id], () => {
            db.query('DELETE FROM Papers WHERE paper_id=?', [id], (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: 'Paper deleted successfully.' });
            });
        });
    });
});

// GET paper statistics
router.get('/stats', verifyToken, (req, res) => {
    const queries = [
        "SELECT COUNT(*) as total FROM Papers",
        "SELECT COUNT(*) as pending FROM Papers WHERE status = 'pending'",
        "SELECT COUNT(*) as approved FROM Papers WHERE status = 'approved'",
        "SELECT COUNT(*) as rejected FROM Papers WHERE status = 'rejected'"
    ];
    Promise.all(queries.map(q => new Promise((resolve, reject) => {
        db.query(q, (err, result) => { if (err) reject(err); else resolve(result[0]); });
    }))).then(results => {
        res.json({ total: results[0].total, pending: results[1].pending, approved: results[2].approved, rejected: results[3].rejected });
    }).catch(err => res.status(500).json(err));
});

module.exports = router;
