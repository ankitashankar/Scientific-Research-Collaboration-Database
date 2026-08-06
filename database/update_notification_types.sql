-- ============================================
-- UPDATE NOTIFICATION TYPES
-- Run this in phpMyAdmin SQL tab
-- ============================================

USE research_collaboration_db;

-- Update the type enum to include paper_added
ALTER TABLE Notifications 
MODIFY COLUMN type ENUM('paper_submitted', 'paper_approved', 'paper_rejected', 'paper_added', 'info') NOT NULL DEFAULT 'info';

SELECT 'Notification types updated successfully!' AS Message;
