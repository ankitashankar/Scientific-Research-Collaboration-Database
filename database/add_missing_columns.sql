-- =====================================================================
-- ADD MISSING COLUMNS TO PAPERS TABLE
-- Run this in phpMyAdmin SQL tab
-- =====================================================================

USE research_collaboration_db;

-- Add paper_link column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS paper_link TEXT;

-- Add status column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'approved';

-- Add submitted_by column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS submitted_by INT;

-- Add submitted_at column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS submitted_at DATETIME;

-- Add approved_by column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS approved_by INT;

-- Add approved_at column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS approved_at DATETIME;

-- Add rejection_reason column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Update existing papers to have 'approved' status
UPDATE Papers SET status = 'approved' WHERE status IS NULL OR status = '';

-- Verify the changes
SHOW COLUMNS FROM Papers;

-- Check sample data
SELECT paper_id, title, year, citations, status, paper_link FROM Papers LIMIT 3;
