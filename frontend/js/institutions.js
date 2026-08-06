requireAuth();
guardElement('.add-panel', ['admin', 'researcher']);

let _institutions = [], _instPage = 1;

function loadInstitutions() {
    showSkeleton('institutionBody', 3);
    authFetch('http://localhost:5000/institutions').then(r => r.json()).then(data => {
        _institutions = data;
        _instPage = 1;
        renderInstitutions();
    });
}

function renderInstitutions() {
    const tbody = document.getElementById('institutionBody');
    const role  = getRole();
    const slice = _institutions.slice((_instPage - 1) * PAGE_SIZE, _instPage * PAGE_SIZE);

    if (!_institutions.length) {
        tbody.innerHTML = `<tr><td colspan="3"><div class="empty-state"><p>No institutions found.</p></div></td></tr>`;
        renderPagination('instPagination', 0, 1, () => {});
        return;
    }

    tbody.innerHTML = slice.map((i, index) => {
        const serialNum = (_instPage - 1) * PAGE_SIZE + index + 1;
        return `
        <tr style="cursor:pointer;" onclick="openInstAuthors(${i.institution_id}, '${i.name.replace(/'/g, "\\'")}')"
            onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background=''">
            <td><span class="id-badge">#${serialNum}</span></td>
            <td><span class="title-text">${i.name}</span></td>
            <td onclick="event.stopPropagation()">${role === 'admin' ? `
                <button class="btn btn-danger" onclick="deleteInstitution(${i.institution_id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    Delete
                </button>` : '<span style="color:var(--text-muted);font-size:12px;">—</span>'}
            </td>
        </tr>`;
    }).join('');

    renderPagination('instPagination', _institutions.length, _instPage, p => { _instPage = p; renderInstitutions(); });
}

function addInstitution() {
    const name = document.getElementById('institutionName').value.trim();
    if (!name) { showToast('Please enter a name.', 'error'); return; }
    authFetch('http://localhost:5000/institutions/add', {
        method: 'POST', body: JSON.stringify({ name })
    }).then(r => r.json()).then(data => {
        showToast(data.message || 'Institution added.', 'success');
        document.getElementById('institutionName').value = '';
        loadInstitutions();
    }).catch(() => showToast('Failed to add institution.', 'error'));
}

function deleteInstitution(id) {
    authFetch(`http://localhost:5000/institutions/delete/${id}`, { method: 'DELETE' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Institution deleted.', 'info');
            loadInstitutions();
        }).catch(() => showToast('Failed to delete.', 'error'));
}

function openInstAuthors(id, name) {
    const modal = document.getElementById('instAuthorsModal');
    const list  = document.getElementById('modalAuthorsList');
    document.getElementById('modalInstName').textContent = name + ' — Authors';
    list.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">Loading…</p>';
    modal.style.display = 'flex';

    authFetch(`http://localhost:5000/institutions/${id}/authors`)
        .then(r => r.json())
        .then(authors => {
            if (!authors.length) {
                list.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No authors found for this institution.</p>';
                return;
            }
            list.innerHTML = authors.map(a => `
                <div style="display:flex;align-items:center;gap:12px;padding:10px 20px;border-bottom:1px solid var(--border);">
                    <div style="width:34px;height:34px;border-radius:50%;background:var(--accent-light,#ede9fe);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--accent);flex-shrink:0;">
                        ${a.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${a.name}</div>
                        <div style="font-size:12px;color:var(--text-muted);">${a.email || '—'}</div>
                    </div>
                </div>`).join('');
        })
        .catch(() => {
            list.innerHTML = '<p style="text-align:center;padding:24px;color:red;font-size:13px;">Failed to load authors.</p>';
        });
}

function closeInstModal() {
    document.getElementById('instAuthorsModal').style.display = 'none';
}

document.addEventListener('click', e => {
    const modal = document.getElementById('instAuthorsModal');
    if (modal && e.target === modal) closeInstModal();
});

loadInstitutions();
