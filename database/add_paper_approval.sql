-- ============================================
-- ADD PAPER APPROVAL WORKFLOW
-- Run this in phpMyAdmin SQL tab
-- ============================================

USE research_collaboration_db;

-- Add status column to Papers table
ALTER TABLE Papers 
ADD COLUMN status ENUM('draft', 'pending', 'approved', 'rejected') 
NOT NULL DEFAULT 'pending' 
AFTER citations;

-- Add submitted_by column to track who submitted the paper
ALTER TABLE Papers 
ADD COLUMN submitted_by INT NULL 
AFTER status;

-- Add submission and approval timestamps
ALTER TABLE Papers 
ADD COLUMN submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
AFTER submitted_by;

ALTER TABLE Papers 
ADD COLUMN approved_at TIMESTAMP NULL 
AFTER submitted_at;

ALTER TABLE Papers 
ADD COLUMN approved_by INT NULL 
AFTER approved_at;

-- Add rejection reason (optional)
ALTER TABLE Papers 
ADD COLUMN rejection_reason TEXT NULL 
AFTER approved_by;

-- Update existing papers to 'approved' status (so they remain visible)
UPDATE Papers SET status = 'approved' WHERE status = 'pending';

SELECT 'Paper approval workflow added successfully!' AS Message;

-- View the updated structure
DESCRIBE Papers;
