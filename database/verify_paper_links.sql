-- =====================================================================
-- VERIFY AND FIX PAPER LINKS
-- Run this in phpMyAdmin to ensure paper_link column exists and is populated
-- =====================================================================

USE research_collaboration_db;

-- Step 1: Add paper_link column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS paper_link TEXT;

-- Step 2: Check current state
SELECT 
    COUNT(*) as total_papers,
    COUNT(paper_link) as papers_with_links,
    COUNT(*) - COUNT(paper_link) as papers_without_links
FROM Papers;

-- Step 3: Show sample of papers with and without links
SELECT paper_id, title, 
    CASE 
        WHEN paper_link IS NULL OR paper_link = '' THEN 'NO LINK'
        ELSE 'HAS LINK'
    END as link_status,
    LEFT(paper_link, 50) as link_preview
FROM Papers 
LIMIT 10;

-- If you see papers without links, you need to run the UPDATE statements
-- from the mysuru_research_db_with_links (1).sql file
-- Look for lines starting with: UPDATE Papers SET paper_link = ...
