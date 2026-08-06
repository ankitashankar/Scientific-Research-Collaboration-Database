requireAuth();
guardElement('.add-panel', ['admin', 'researcher']);
guardElement('.delete-btn-cell', ['admin']);

let _authors = [], _authorPage = 1;

function loadAuthors() {
    showSkeleton('authorBody', 4);
    authFetch('http://localhost:5000/authors').then(r => r.json()).then(data => {
        _authors = data;
        _authorPage = 1;
        renderAuthors();
    });
}

function renderAuthors() {
    const tbody = document.getElementById('authorBody');
    const role  = getRole();
    const slice = _authors.slice((_authorPage - 1) * PAGE_SIZE, _authorPage * PAGE_SIZE);

    if (!_authors.length) {
        tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><p>No authors found.</p></div></td></tr>`;
        renderPagination('authorPagination', 0, 1, () => {});
        return;
    }

    tbody.innerHTML = slice.map((a, index) => {
        const serialNum = (_authorPage - 1) * PAGE_SIZE + index + 1;
        return `
        <tr style="cursor:pointer;" onclick="openAuthorPapers(${a.author_id}, '${a.name.replace(/'/g, "\\'")}')"
            onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background=''">
            <td><span class="id-badge">#${serialNum}</span></td>
            <td><span class="title-text">${a.name}</span></td>
            <td style="color:var(--text-secondary)">${a.email}</td>
            <td onclick="event.stopPropagation()">${role === 'admin' ? `
                <button class="btn btn-danger" onclick="deleteAuthor(${a.author_id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    Delete
                </button>` : '<span style="color:var(--text-muted);font-size:12px;">—</span>'}
            </td>
        </tr>`;
    }).join('');

    renderPagination('authorPagination', _authors.length, _authorPage, p => { _authorPage = p; renderAuthors(); });
}

function addAuthor() {
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) { showToast('Please fill in all fields.', 'error'); return; }
    authFetch('http://localhost:5000/authors/add', {
        method: 'POST', body: JSON.stringify({ name, email })
    }).then(r => r.json()).then(data => {
        showToast(data.message || 'Author added.', 'success');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        loadAuthors();
    }).catch(() => showToast('Failed to add author.', 'error'));
}

function deleteAuthor(id) {
    authFetch(`http://localhost:5000/authors/delete/${id}`, { method: 'DELETE' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Author deleted.', 'info');
            loadAuthors();
        }).catch(() => showToast('Failed to delete author.', 'error'));
}

function openAuthorPapers(id, name) {
    const modal = document.getElementById('authorPapersModal');
    const list  = document.getElementById('modalPapersList');
    document.getElementById('modalAuthorName').textContent = name + ' — Papers';
    list.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">Loading…</p>';
    modal.style.display = 'flex';

    authFetch(`http://localhost:5000/authors/${id}/papers`)
        .then(r => r.json())
        .then(papers => {
            if (!papers.length) {
                list.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No papers found for this author.</p>';
                return;
            }
            list.innerHTML = papers.map(p => `
                <div style="padding:12px 20px;border-bottom:1px solid var(--border);">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
                        <div style="flex:1;">
                            <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">${p.title}</div>
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                                <span class="year-badge">${p.year}</span>
                                <span class="citation-badge">${p.citations} citations</span>
                            </div>
                        </div>
                        ${p.paper_link
                            ? `<a href="${p.paper_link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm"
                                style="padding:4px 10px;background:var(--accent);color:white;text-decoration:none;display:inline-flex;align-items:center;gap:4px;flex-shrink:0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                View
                               </a>`
                            : ''}
                    </div>
                </div>`).join('');
        })
        .catch(() => {
            list.innerHTML = '<p style="text-align:center;padding:24px;color:red;font-size:13px;">Failed to load papers.</p>';
        });
}

function closeAuthorModal() {
    document.getElementById('authorPapersModal').style.display = 'none';
}

document.addEventListener('click', e => {
    const modal = document.getElementById('authorPapersModal');
    if (modal && e.target === modal) closeAuthorModal();
});

loadAuthors();
