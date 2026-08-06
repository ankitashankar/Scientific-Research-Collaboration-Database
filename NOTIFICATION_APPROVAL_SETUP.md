# Paper Approval Notification Setup Guide

## Step 1: Update Database
Run this SQL in phpMyAdmin:

```sql
USE research_collaboration_db;

-- Update the type enum to include paper_added
ALTER TABLE Notifications 
MODIFY COLUMN type ENUM('paper_submitted', 'paper_approved', 'paper_rejected', 'paper_added', 'info') NOT NULL DEFAULT 'info';
```

## Step 2: Restart Backend Server
1. Stop the backend server (Ctrl+C in terminal)
2. Start it again: `node server.js`

## Step 3: Test the Notification Flow

### Test 1: Paper Submission (Researcher → Admin)
1. Login as **researcher**
2. Submit a new paper
3. Login as **admin**
4. Check notifications - you should see "New Paper Submitted"
5. Check email - admin should receive email notification

### Test 2: Paper Approval (Admin → Researcher & Viewers)
1. Login as **admin**
2. Approve a pending paper
3. Login as **researcher** (who submitted the paper)
4. Check notifications - should see "Paper Approved"
5. Check email - researcher should receive approval email
6. Login as **viewer**
7. Check notifications - should see "New Paper Added"

### Test 3: Paper Rejection (Admin → Researcher)
1. Login as **admin**
2. Reject a pending paper with a reason
3. Login as **researcher** (who submitted the paper)
4. Check notifications - should see "Paper Rejected" with reason
5. Check email - researcher should receive rejection email

## Notification Flow Summary

### When Researcher Submits Paper:
- ✅ All admins get in-app notification
- ✅ All admins get email notification

### When Admin Approves Paper:
- ✅ Submitter (researcher) gets in-app notification
- ✅ Submitter gets email notification
- ✅ All viewers get in-app notification about new paper

### When Admin Rejects Paper:
- ✅ Submitter (researcher) gets in-app notification with reason
- ✅ Submitter gets email notification with reason

## Troubleshooting

### If notifications don't appear:
1. Check browser console for errors
2. Check backend terminal for error messages
3. Verify Notifications table exists in database
4. Verify notification type enum includes all types
5. Restart backend server

### If emails don't send:
1. Verify .env file has correct EMAIL_USER and EMAIL_PASS
2. Check backend terminal for email errors
3. Verify Gmail app password is correct
4. Check spam folder

## Console Logs
The backend will log:
- "Admins notified about paper submission"
- "Submitter notified about approval"
- "Submitter notified about rejection"
- Any errors will be logged with details
