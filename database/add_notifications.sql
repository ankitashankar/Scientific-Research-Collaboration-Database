-- ============================================
-- ADD NOTIFICATIONS SYSTEM
-- Run this in phpMyAdmin SQL tab
-- ============================================

USE research_collaboration_db;

-- Create Notifications table
CREATE TABLE IF NOT EXISTS Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('paper_submitted', 'paper_approved', 'paper_rejected', 'info') NOT NULL DEFAULT 'info',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(500) NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Add index for faster queries
CREATE INDEX idx_user_read ON Notifications(user_id, is_read);
CREATE INDEX idx_created_at ON Notifications(created_at DESC);

SELECT 'Notifications table created successfully!' AS Message;
