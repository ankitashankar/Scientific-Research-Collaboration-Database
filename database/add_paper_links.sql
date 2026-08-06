-- Add paper_link column if it doesn't exist
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS paper_link TEXT;

-- Check if column exists and show sample data
SELECT paper_id, title, paper_link FROM Papers LIMIT 5;
