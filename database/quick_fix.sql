-- ============================================
-- QUICK FIX - Run this in phpMyAdmin
-- ============================================
-- This will fix the AUTO_INCREMENT issue
-- Copy all lines below and paste in phpMyAdmin SQL tab
-- ============================================

USE research_collaboration_db;

-- Step 1: Delete any records with ID = 0 (if they exist)
DELETE FROM Authors WHERE author_id = 0;
DELETE FROM Institutions WHERE institution_id = 0;
DELETE FROM Papers WHERE paper_id = 0;
DELETE FROM Topics WHERE topic_id = 0;

-- Step 2: Make sure ID columns are AUTO_INCREMENT
ALTER TABLE Authors 
MODIFY COLUMN author_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE Institutions 
MODIFY COLUMN institution_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE Papers 
MODIFY COLUMN paper_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE Topics 
MODIFY COLUMN topic_id INT NOT NULL AUTO_INCREMENT;

-- Step 3: Reset AUTO_INCREMENT to correct value
-- (This ensures next insert gets the right ID)

ALTER TABLE Authors AUTO_INCREMENT = 1;
ALTER TABLE Institutions AUTO_INCREMENT = 1;
ALTER TABLE Papers AUTO_INCREMENT = 1;
ALTER TABLE Topics AUTO_INCREMENT = 1;

-- Done! Now restart your backend server and test
SELECT 'Fix completed! Restart your backend server.' AS Message;
