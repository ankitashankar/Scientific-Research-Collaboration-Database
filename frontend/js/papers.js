requireAuth();
guardElement('.add-panel', ['admin', 'researcher']);

let allPapers = [], _paperPage = 1, _lastFiltered = [];
const userRole = getRole();

// Show/hide admin-only elements
if (userRole === 'admin') {
    document.querySelector('.admin-only-field').style.display = 'block';
    document.querySelector('.admin-approval-panel').style.display = 'block';
    document.getElementById('submitBtnText').textContent = 'Add Paper';
    document.getElementById('approvalNotice').textContent = 'As admin, you can approve papers immediately or submit for review.';
    loadPendingPapers();
} else {
    document.getElementById('paperTableTitle').textContent = 'Approved Papers';
}

// ── Load pending papers (admin only) ──────────────────────────
function loadPendingPapers() {
    authFetch('http://localhost:5000/papers/pending').then(r => r.json()).then(data => {
        const tbody = document.getElementById('pendingBody');
        const badge = document.getElementById('pendingCount');
        badge.textContent = data.length;
        
        if (!data.length) {
            tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><p>No pending papers.</p></div></td></tr>`;
            return;
        }
        
        tbody.innerHTML = data.map((p, index) => {
            const serialNum = index + 1;
            const linkCell = p.paper_link
                ? `<a href="${p.paper_link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="padding:4px 8px;background:var(--accent);color:white;text-decoration:none;display:inline-flex;align-items:center;gap:4px;" title="Check paper for originality">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    View Paper
                  </a>`
                : '<span style="color:var(--text-muted);font-size:11px;">No link</span>';
            return `
            <tr>
                <td><span class="id-badge">#${serialNum}</span></td>
                <td><span class="title-text">${p.title}</span></td>
                <td><span class="year-badge">${p.year}</span></td>
                <td><span class="citation-badge">${p.citations}</span></td>
                <td>${linkCell}</td>
                <td style="font-size:12px;color:var(--text-muted);">${formatDate(p.submitted_at)}</td>
                <td>
                    <button class="btn btn-success" onclick="approvePaper(${p.paper_id})" style="margin-right:6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Approve
                    </button>
                    <button class="btn btn-danger" onclick="rejectPaper(${p.paper_id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Reject
                    </button>
                </td>
            </tr>`;
        }).join('');
    });
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function approvePaper(id) {
    if (!confirm('Approve this paper for publication?')) return;
    authFetch(`http://localhost:5000/papers/approve/${id}`, { method: 'PUT' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Paper approved!', 'success');
            loadPendingPapers();
            loadPapers();
        }).catch(() => showToast('Failed to approve paper.', 'error'));
}

function rejectPaper(id) {
    const reason = prompt('Reason for rejection (optional):');
    if (reason === null) return;
    authFetch(`http://localhost:5000/papers/reject/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ reason })
    }).then(r => r.json()).then(data => {
        showToast(data.message || 'Paper rejected.', 'info');
        loadPendingPapers();
    }).catch(() => showToast('Failed to reject paper.', 'error'));
}

// ── Load dropdown options ──────────────────────────────────────
// Removed - no longer needed for filters

// ── Load all papers (initial) ──────────────────────────────────
function loadPapers() {
    showSkeleton('paperBody', 7);
    authFetch('http://localhost:5000/papers')
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(data => {
            console.log('Papers loaded:', data.length, 'papers');
            console.log('Sample paper:', data[0]);
            allPapers = data;
            displayPapers(data, false);
        })
        .catch(err => {
            console.error('Failed to load papers:', err);
            document.getElementById('paperBody').innerHTML = 
                `<tr><td colspan="7"><div class="empty-state"><p style="color:red;">Error loading papers: ${err.message}</p></div></td></tr>`;
        });
}

// ── Display papers ─────────────────────────────────────────────
function displayPapers(data, showMeta = true) {
    _lastFiltered = data;
    _paperPage = 1;
    _renderPaperPage(showMeta);
}

function _renderPaperPage(showMeta) {
    const tbody = document.getElementById('paperBody');
    const meta  = document.getElementById('resultsMeta');
    const count = document.getElementById('resultsCount');
    const role  = getRole();
    const data  = _lastFiltered;
    const slice = data.slice((_paperPage - 1) * PAGE_SIZE, _paperPage * PAGE_SIZE);

    if (showMeta) { meta.style.display = 'block'; count.textContent = data.length; }
    else { meta.style.display = 'none'; }

    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><p>No papers match your filters.</p></div></td></tr>`;
        renderPagination('paperPagination', 0, 1, () => {});
        return;
    }

    tbody.innerHTML = slice.map((p, index) => {
        const serialNum = (_paperPage - 1) * PAGE_SIZE + index + 1;
        const statusBadge = getStatusBadge(p.status);
        const linkIcon = p.paper_link ? `
            <a href="${p.paper_link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="padding:4px 8px;background:var(--accent);color:white;text-decoration:none;display:inline-flex;align-items:center;gap:4px;" title="View Official Paper">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Link
            </a>` : '<span style="color:var(--text-muted);font-size:11px;">No link</span>';
        return `
        <tr>
            <td><span class="id-badge">#${serialNum}</span></td>
            <td><span class="title-text">${p.title}</span></td>
            <td><span class="year-badge">${p.year}</span></td>
            <td><span class="citation-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
                ${p.citations}
            </span></td>
            <td>${statusBadge}</td>
            <td>${linkIcon}</td>
            <td>${role === 'admin' ? `
                <button class="btn btn-danger" onclick="deletePaper(${p.paper_id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    Delete
                </button>` : '<span style="color:var(--text-muted);font-size:12px;">—</span>'}
            </td>
        </tr>`;
    }).join('');

    renderPagination('paperPagination', data.length, _paperPage, p => { _paperPage = p; _renderPaperPage(showMeta); });
}

function getStatusBadge(status) {
    const badges = {
        'approved': '<span class="status-badge status-approved">✓ Approved</span>',
        'pending': '<span class="status-badge status-pending">⏳ Pending</span>',
        'rejected': '<span class="status-badge status-rejected">✗ Rejected</span>',
        'draft': '<span class="status-badge status-draft">📝 Draft</span>'
    };
    return badges[status] || '<span class="status-badge">—</span>';
}

// ── PDF Upload & Auto-Extract ─────────────────────────────────
async function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') { showToast('Please upload a PDF file', 'error'); return; }
    if (file.size > 10 * 1024 * 1024) { showToast('File size must be less than 10MB', 'error'); return; }

    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar   = document.getElementById('progressBar');
    const uploadStatus  = document.getElementById('uploadStatus');
    const uploadBtn     = document.getElementById('uploadBtn');

    uploadProgress.style.display = 'block';
    uploadBtn.disabled = true;
    progressBar.style.width = '20%';
    uploadStatus.textContent = 'Uploading PDF...';

    const formData = new FormData();
    formData.append('pdf', file);

    try {
        progressBar.style.width = '50%';
        uploadStatus.textContent = 'Extracting metadata...';

        const response = await fetch('http://localhost:5000/pdf/extract', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${getToken()}` },
            body: formData
        });

        progressBar.style.width = '90%';

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.details || err.error || `HTTP ${response.status}`);
        }

        const result = await response.json();
        if (!result.success || !result.data) throw new Error('No data extracted from PDF');

        progressBar.style.width = '100%';
        uploadStatus.textContent = 'Done! ✓';
        populateFormWithExtractedData(result.data);
        showToast('PDF data extracted successfully!', 'success');

    } catch (error) {
        progressBar.style.width = '0%';
        uploadStatus.textContent = 'Failed.';
        showToast('PDF extraction failed: ' + error.message, 'error');
    } finally {
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            progressBar.style.width = '0%';
            uploadBtn.disabled = false;
            document.getElementById('pdfFile').value = '';
        }, 2500);
    }
}

function populateFormWithExtractedData(data) {
    // Fill form fields
    document.getElementById('title').value     = data.title     || '';
    document.getElementById('year').value      = data.year      || '';
    document.getElementById('citations').value = data.citations || 0;
    document.getElementById('paperLink').value = data.paper_link || '';

    // Remove old summary if any
    const old = document.querySelector('.extracted-info');
    if (old) old.remove();

    // Build compact summary of extra info (authors, abstract, keywords)
    const extras = [];
    if (data.authors && data.authors.length)   extras.push(`<strong>Authors:</strong> ${data.authors.join(', ')}`);
    if (data.keywords && data.keywords.length) extras.push(`<strong>Keywords:</strong> ${data.keywords.join(', ')}`);
    if (data.abstract) extras.push(`<strong>Abstract:</strong> ${data.abstract.substring(0, 250)}${data.abstract.length > 250 ? '…' : ''}`);

    if (!extras.length) return;

    const div = document.createElement('div');
    div.className = 'extracted-info';
    div.style.cssText = 'margin-top:12px;padding:12px 16px;background:#f0fdf4;border-left:4px solid #22c55e;border-radius:6px;font-size:12px;color:#374151;line-height:1.7;';
    div.innerHTML = extras.map(e => `<p style="margin:0 0 4px;">${e}</p>`).join('')
        + '<p style="margin:8px 0 0;font-size:11px;color:#16a34a;">✓ Review the fields above, then click Submit.</p>';

    document.querySelector('.info-notice').before(div);
}

// ── Add / Delete ───────────────────────────────────────────────
function addPaper() {
    const title      = document.getElementById('title').value.trim();
    const year       = document.getElementById('year').value.trim();
    const citations  = document.getElementById('citations').value.trim();
    const paper_link = document.getElementById('paperLink').value.trim();
    const status     = userRole === 'admin' ? document.getElementById('paperStatus').value : 'pending';
    
    if (!title || !year || !citations) { showToast('Please fill in all fields.', 'error'); return; }
    
    authFetch('http://localhost:5000/papers', {
        method: 'POST', 
        body: JSON.stringify({ title, year, citations, paper_link, status })
    }).then(r => {
        if (!r.ok) return r.json().then(e => { throw new Error(e.message || e.sqlMessage || 'Server error'); });
        return r.json();
    }).then(data => {
        const message = data.status === 'approved' 
            ? 'Paper added and published!' 
            : 'Paper submitted for approval. Admin will review it soon.';
        showToast(message, 'success');
        document.getElementById('title').value = '';
        document.getElementById('year').value = '';
        document.getElementById('citations').value = '';
        document.getElementById('paperLink').value = '';
        const info = document.querySelector('.extracted-info');
        if (info) info.remove();
        loadPapers();
        if (userRole === 'admin') loadPendingPapers();
    }).catch(err => showToast('Failed to add paper: ' + err.message, 'error'));
}

function deletePaper(id) {
    authFetch(`http://localhost:5000/papers/${id}`, { method: 'DELETE' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Paper deleted.', 'info');
            loadPapers();
        }).catch(() => showToast('Failed to delete paper.', 'error'));
}

loadPapers();
