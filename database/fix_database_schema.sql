-- ============================================
-- FIX DATABASE SCHEMA
-- Run this in phpMyAdmin to fix ID issues
-- ============================================

-- This will fix the AUTO_INCREMENT issue for all tables
-- Make sure to backup your database first!

USE research_collaboration_db;

-- Fix Authors table
ALTER TABLE Authors 
MODIFY COLUMN author_id INT AUTO_INCREMENT PRIMARY KEY;

-- Fix Institutions table
ALTER TABLE Institutions 
MODIFY COLUMN institution_id INT AUTO_INCREMENT PRIMARY KEY;

-- Fix Papers table
ALTER TABLE Papers 
MODIFY COLUMN paper_id INT AUTO_INCREMENT PRIMARY KEY;

-- Fix Topics table
ALTER TABLE Topics 
MODIFY COLUMN topic_id INT AUTO_INCREMENT PRIMARY KEY;

-- Fix Collaborations table (if exists)
ALTER TABLE Collaborations 
MODIFY COLUMN collaboration_id INT AUTO_INCREMENT PRIMARY KEY;

-- Reset AUTO_INCREMENT to start from the correct value
-- This finds the maximum ID and sets AUTO_INCREMENT to max+1

SET @max_author = (SELECT IFNULL(MAX(author_id), 0) FROM Authors);
SET @sql = CONCAT('ALTER TABLE Authors AUTO_INCREMENT = ', @max_author + 1);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @max_inst = (SELECT IFNULL(MAX(institution_id), 0) FROM Institutions);
SET @sql = CONCAT('ALTER TABLE Institutions AUTO_INCREMENT = ', @max_inst + 1);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @max_paper = (SELECT IFNULL(MAX(paper_id), 0) FROM Papers);
SET @sql = CONCAT('ALTER TABLE Papers AUTO_INCREMENT = ', @max_paper + 1);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @max_topic = (SELECT IFNULL(MAX(topic_id), 0) FROM Topics);
SET @sql = CONCAT('ALTER TABLE Topics AUTO_INCREMENT = ', @max_topic + 1);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if there are any records with ID = 0 and fix them
UPDATE Authors SET author_id = NULL WHERE author_id = 0;
UPDATE Institutions SET institution_id = NULL WHERE institution_id = 0;
UPDATE Papers SET paper_id = NULL WHERE paper_id = 0;
UPDATE Topics SET topic_id = NULL WHERE topic_id = 0;

SELECT 'Database schema fixed successfully!' AS Status;
