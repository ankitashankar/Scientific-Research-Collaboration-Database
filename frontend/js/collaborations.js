requireAuth();
guardElement('.add-panel', ['admin', 'researcher']);

let _collabs = [], _collabPage = 1;

function loadCollaborations() {
    showSkeleton('collaborationBody', 5);
    authFetch('http://localhost:5000/collaborations').then(r => r.json()).then(data => {
        _collabs = data;
        _collabPage = 1;
        renderCollaborations();
    });
}

function renderCollaborations() {
    const tbody = document.getElementById('collaborationBody');
    const role  = getRole();
    const slice = _collabs.slice((_collabPage - 1) * PAGE_SIZE, _collabPage * PAGE_SIZE);

    if (!_collabs.length) {
        tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><p>No collaborations found.</p></div></td></tr>`;
        renderPagination('collabPagination', 0, 1, () => {});
        return;
    }

    tbody.innerHTML = slice.map((c, index) => {
        const serialNum = (_collabPage - 1) * PAGE_SIZE + index + 1;
        return `
        <tr>
            <td><span class="id-badge">#${serialNum}</span></td>
            <td><span class="title-text">${c.author1}</span></td>
            <td><span class="title-text">${c.author2}</span></td>
            <td><span class="year-badge">${c.collaboration_count}</span></td>
            <td>${role === 'admin' ? `
                <button class="btn btn-danger" onclick="deleteCollaboration(${c.collaboration_id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    Delete
                </button>` : '<span style="color:var(--text-muted);font-size:12px;">—</span>'}
            </td>
        </tr>`;
    }).join('');

    renderPagination('collabPagination', _collabs.length, _collabPage, p => { _collabPage = p; renderCollaborations(); });
}

function addCollaboration() {
    const author1_id          = document.getElementById('author1').value.trim();
    const author2_id          = document.getElementById('author2').value.trim();
    const collaboration_count = document.getElementById('count').value.trim();
    if (!author1_id || !author2_id || !collaboration_count) {
        showToast('Please fill in all fields.', 'error'); return;
    }
    authFetch('http://localhost:5000/collaborations/add', {
        method: 'POST', body: JSON.stringify({ author1_id, author2_id, collaboration_count })
    }).then(r => r.json()).then(data => {
        showToast(data.message || 'Collaboration added.', 'success');
        document.getElementById('author1').value = '';
        document.getElementById('author2').value = '';
        document.getElementById('count').value = '';
        loadCollaborations();
    }).catch(() => showToast('Failed to add collaboration.', 'error'));
}

function deleteCollaboration(id) {
    authFetch(`http://localhost:5000/collaborations/delete/${id}`, { method: 'DELETE' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Collaboration deleted.', 'info');
            loadCollaborations();
        }).catch(() => showToast('Failed to delete.', 'error'));
}

loadCollaborations();
