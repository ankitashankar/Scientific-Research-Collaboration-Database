# Paper Approval Workflow - Complete Guide

## 🎯 Overview
Papers now require approval before being published to ensure quality control. This prevents spam and maintains the integrity of your research database.

---

## 📋 How It Works

### **For Researchers:**
1. Submit a paper with title, year, and citations
2. Paper status = **"Pending Approval"**
3. Paper is NOT visible to viewers
4. Wait for admin to approve
5. Once approved → Paper becomes visible to everyone

### **For Admins:**
1. Can see all papers (approved, pending, rejected)
2. Can approve papers immediately when adding
3. Can review pending papers from other researchers
4. Can approve or reject with reason
5. Full control over what gets published

### **For Viewers:**
1. Can only see **approved** papers
2. Cannot add papers
3. Read-only access

---

## 🔧 Setup Instructions

### Step 1: Update Database Schema
Run this SQL in phpMyAdmin:

```sql
-- Open: database/add_paper_approval.sql
-- Copy all content and run in phpMyAdmin SQL tab
```

This adds:
- `status` column (draft/pending/approved/rejected)
- `submitted_by` - who submitted the paper
- `submitted_at` - when it was submitted
- `approved_at` - when it was approved
- `approved_by` - which admin approved it
- `rejection_reason` - why it was rejected (optional)

### Step 2: Restart Backend Server
```bash
# Stop server (Ctrl+C)
cd backend
node server.js
```

### Step 3: Test the Feature
1. Login as **researcher**
2. Add a new paper
3. See message: "Paper submitted for approval"
4. Paper shows status: "⏳ Pending"
5. Login as **admin**
6. See "Pending Approvals" section
7. Click "Approve" or "Reject"

---

## 📊 Paper Status Flow

```
┌─────────────────────────────────────────────────────┐
│                  RESEARCHER SUBMITS                 │
│                        PAPER                        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  Status: PENDING │
         │  (Not visible to │
         │     viewers)     │
         └────────┬─────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│   APPROVED   │    │   REJECTED   │
│  (Visible to │    │ (Not visible)│
│   everyone)  │    │              │
└──────────────┘    └──────────────┘
```

---

## 🎨 User Interface

### Researcher View:
```
┌─────────────────────────────────────────┐
│ Submit New Paper                        │
├─────────────────────────────────────────┤
│ Title: [________________]               │
│ Year:  [____]  Citations: [____]        │
│ [Submit for Approval]                   │
│                                         │
│ ℹ️ Papers require admin approval        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Approved Papers                         │
├─────────────────────────────────────────┤
│ ID | Title | Year | Citations | Status  │
│ 1  | AI... | 2023 | 45       | ✓ Approved│
│ 2  | ML... | 2024 | 12       | ⏳ Pending │
└─────────────────────────────────────────┘
```

### Admin View:
```
┌─────────────────────────────────────────┐
│ Submit New Paper                        │
├─────────────────────────────────────────┤
│ Title: [________________]               │
│ Year:  [____]  Citations: [____]        │
│ Status: [Approved ▼]                    │
│ [Add Paper]                             │
│                                         │
│ ℹ️ You can approve papers immediately    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Pending Approvals (3)                   │
├─────────────────────────────────────────┤
│ ID | Title | Year | Submitted | Actions │
│ 5  | DL... | 2024 | Jan 15   | [✓][✗]  │
│ 6  | NN... | 2024 | Jan 14   | [✓][✗]  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Published Papers                        │
├─────────────────────────────────────────┤
│ ID | Title | Year | Citations | Status  │
│ 1  | AI... | 2023 | 45       | ✓ Approved│
│ 2  | ML... | 2024 | 12       | ⏳ Pending │
│ 3  | CV... | 2023 | 8        | ✗ Rejected│
└─────────────────────────────────────────┘
```

### Viewer View:
```
┌─────────────────────────────────────────┐
│ Approved Papers                         │
├─────────────────────────────────────────┤
│ ID | Title | Year | Citations | Status  │
│ 1  | AI... | 2023 | 45       | ✓ Approved│
│ 4  | DL... | 2022 | 67       | ✓ Approved│
└─────────────────────────────────────────┘
(Only approved papers visible)
```

---

## 🔐 Permission Matrix

| Action | Viewer | Researcher | Admin |
|--------|--------|------------|-------|
| View approved papers | ✅ | ✅ | ✅ |
| View pending papers | ❌ | ✅ (own) | ✅ (all) |
| View rejected papers | ❌ | ✅ (own) | ✅ (all) |
| Submit paper | ❌ | ✅ | ✅ |
| Approve paper | ❌ | ❌ | ✅ |
| Reject paper | ❌ | ❌ | ✅ |
| Delete paper | ❌ | ❌ | ✅ |
| Publish immediately | ❌ | ❌ | ✅ |

---

## 💡 Use Cases

### Use Case 1: Researcher Submits Paper
```
1. Researcher logs in
2. Goes to Papers page
3. Fills form: "Deep Learning in Healthcare", 2024, 15 citations
4. Clicks "Submit for Approval"
5. Sees success: "Paper submitted for approval. Admin will review it soon."
6. Paper appears in their list with status "⏳ Pending"
7. Paper is NOT visible to viewers yet
```

### Use Case 2: Admin Approves Paper
```
1. Admin logs in
2. Sees "Pending Approvals (1)" section
3. Reviews paper: "Deep Learning in Healthcare"
4. Clicks "Approve" button
5. Confirms approval
6. Paper status changes to "✓ Approved"
7. Paper now visible to everyone
8. Researcher gets notified (via toast)
```

### Use Case 3: Admin Rejects Paper
```
1. Admin reviews paper
2. Finds issues (duplicate, low quality, etc.)
3. Clicks "Reject" button
4. Enters reason: "Duplicate paper already exists"
5. Paper status changes to "✗ Rejected"
6. Paper remains hidden from viewers
7. Researcher can see rejection reason
```

### Use Case 4: Admin Publishes Immediately
```
1. Admin adds new paper
2. Selects status: "Approved (Publish Now)"
3. Clicks "Add Paper"
4. Paper is immediately visible to everyone
5. No approval workflow needed
```

---

## 🗄️ Database Schema

### Papers Table Structure:
```sql
CREATE TABLE Papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    year INT NOT NULL,
    citations INT DEFAULT 0,
    status ENUM('draft', 'pending', 'approved', 'rejected') DEFAULT 'pending',
    submitted_by INT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    approved_by INT NULL,
    rejection_reason TEXT NULL
);
```

---

## 🔍 API Endpoints

### GET /papers
- **Viewers**: Returns only approved papers
- **Researchers**: Returns approved + own pending/rejected
- **Admins**: Returns all papers

### GET /papers/pending
- **Admin only**
- Returns all papers with status = 'pending'

### POST /papers
- **Researcher**: Creates paper with status = 'pending'
- **Admin**: Can choose status (pending or approved)

### PUT /papers/approve/:id
- **Admin only**
- Changes status to 'approved'
- Sets approved_at and approved_by

### PUT /papers/reject/:id
- **Admin only**
- Changes status to 'rejected'
- Stores rejection_reason

---

## 🎨 Status Badge Colors

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| ✓ Approved | Green | ✓ | Published & visible |
| ⏳ Pending | Orange | ⏳ | Awaiting approval |
| ✗ Rejected | Red | ✗ | Not approved |
| 📝 Draft | Gray | 📝 | Work in progress |

---

## 🚀 Benefits

### Quality Control
- ✅ Prevents spam papers
- ✅ Ensures data accuracy
- ✅ Maintains database integrity

### Workflow Management
- ✅ Clear approval process
- ✅ Audit trail (who submitted, who approved)
- ✅ Rejection reasons for feedback

### User Experience
- ✅ Researchers know their submission status
- ✅ Admins have centralized review panel
- ✅ Viewers only see quality content

---

## 🐛 Troubleshooting

### Issue: "Column 'status' doesn't exist"
**Solution:** Run the SQL script `add_paper_approval.sql`

### Issue: All papers showing as pending
**Solution:** Run this SQL to approve existing papers:
```sql
UPDATE Papers SET status = 'approved' WHERE status = 'pending';
```

### Issue: Pending section not showing
**Solution:** Make sure you're logged in as admin

### Issue: Can't approve papers
**Solution:** Check user role - only admins can approve

---

## 📝 Summary

**Before:**
- ❌ Anyone could add papers
- ❌ No quality control
- ❌ Spam risk

**After:**
- ✅ Papers require approval
- ✅ Admin review process
- ✅ Quality controlled
- ✅ Audit trail
- ✅ Status tracking

---

## 📚 Files Modified

### Backend:
- ✅ `backend/routes/papers.js` - Added approval endpoints
- ✅ `database/add_paper_approval.sql` - Database schema

### Frontend:
- ✅ `frontend/papers.html` - Added approval UI
- ✅ `frontend/js/papers.js` - Added approval logic
- ✅ `frontend/css/style.css` - Added status badge styles

---

**Your research database is now protected with a professional approval workflow! 🎉**
