const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
        [req.user.user_id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        });
});

router.get('/unread-count', (req, res) => {
    db.query('SELECT COUNT(*) as count FROM Notifications WHERE user_id = ? AND is_read = FALSE',
        [req.user.user_id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ count: result[0].count });
        });
});

router.put('/mark-read/:id', (req, res) => {
    db.query('UPDATE Notifications SET is_read = TRUE WHERE notification_id = ? AND user_id = ?',
        [req.params.id, req.user.user_id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Notification marked as read' });
        });
});

router.put('/mark-all-read', (req, res) => {
    db.query('UPDATE Notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
        [req.user.user_id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'All notifications marked as read' });
        });
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Notifications WHERE notification_id = ? AND user_id = ?',
        [req.params.id, req.user.user_id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Notification deleted' });
        });
});

function createNotification(userId, type, title, message, link = null, io = null) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Notifications (user_id, type, title, message, link) VALUES (?, ?, ?, ?, ?)',
            [userId, type, title, message, link],
            (err, result) => {
                if (err) {
                    console.error(`Failed to create notification for user ${userId}:`, err);
                    return reject(err);
                }
                console.log(`✓ Notification created for user ${userId} (ID: ${result.insertId}, type: ${type})`);
                // Emit real-time notification via WebSocket
                if (io) {
                    const notification = {
                        notification_id: result.insertId,
                        user_id: userId,
                        type,
                        title,
                        message,
                        link,
                        is_read: false,
                        created_at: new Date()
                    };
                    io.to(`user-${userId}`).emit('new-notification', notification);
                }
                resolve(result);
            });
    });
}

function notifyAllAdmins(type, title, message, link = null, io = null) {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id FROM Users WHERE role = "admin"', (err, admins) => {
            if (err) {
                console.error('Error fetching admins:', err);
                return reject(err);
            }
            console.log(`Found ${admins.length} admins to notify`);
            if (!admins.length) {
                console.warn('No admins found to notify');
                return resolve([]);
            }
            Promise.all(admins.map(a => createNotification(a.user_id, type, title, message, link, io)))
                .then(() => {
                    console.log(`Successfully notified ${admins.length} admins`);
                    resolve();
                })
                .catch(err => {
                    console.error('Error creating admin notifications:', err);
                    reject(err);
                });
        });
    });
}

function notifyAllViewers(type, title, message, link = null, io = null, excludeUserId = null) {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id FROM Users WHERE role IN ("viewer", "researcher")', (err, users) => {
            if (err) {
                console.error('Error fetching viewers/researchers:', err);
                return reject(err);
            }
            console.log(`Found ${users.length} viewers/researchers to notify`);
            const targets = excludeUserId ? users.filter(u => u.user_id !== excludeUserId) : users;
            console.log(`Notifying ${targets.length} users (excluded: ${excludeUserId})`);
            if (!targets.length) return resolve([]);
            Promise.all(targets.map(u => createNotification(u.user_id, type, title, message, link, io)))
                .then(() => {
                    console.log(`Successfully notified ${targets.length} users`);
                    resolve();
                })
                .catch(err => {
                    console.error('Error creating notifications:', err);
                    reject(err);
                });
        });
    });
}

module.exports = { router, createNotification, notifyAllAdmins, notifyAllViewers };
