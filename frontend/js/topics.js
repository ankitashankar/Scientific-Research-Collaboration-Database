requireAuth();
guardElement('.add-panel', ['admin', 'researcher']);

let _topics = [], _topicPage = 1;

function loadTopics() {
    showSkeleton('topicBody', 3);
    authFetch('http://localhost:5000/topics').then(r => r.json()).then(data => {
        _topics = data;
        _topicPage = 1;
        renderTopics();
    });
}

function renderTopics() {
    const tbody = document.getElementById('topicBody');
    const role  = getRole();
    const slice = _topics.slice((_topicPage - 1) * PAGE_SIZE, _topicPage * PAGE_SIZE);

    if (!_topics.length) {
        tbody.innerHTML = `<tr><td colspan="3"><div class="empty-state"><p>No topics found.</p></div></td></tr>`;
        renderPagination('topicPagination', 0, 1, () => {});
        return;
    }

    tbody.innerHTML = slice.map((t, index) => {
        const serialNum = (_topicPage - 1) * PAGE_SIZE + index + 1;
        return `
        <tr>
            <td><span class="id-badge">#${serialNum}</span></td>
            <td><span class="title-text">${t.topic_name}</span></td>
            <td>${role === 'admin' ? `
                <button class="btn btn-danger" onclick="deleteTopic(${t.topic_id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    Delete
                </button>` : '<span style="color:var(--text-muted);font-size:12px;">—</span>'}
            </td>
        </tr>`;
    }).join('');

    renderPagination('topicPagination', _topics.length, _topicPage, p => { _topicPage = p; renderTopics(); });
}

function addTopic() {
    const topic_name = document.getElementById('topicName').value.trim();
    if (!topic_name) { showToast('Please enter a topic name.', 'error'); return; }
    authFetch('http://localhost:5000/topics/add', {
        method: 'POST', body: JSON.stringify({ topic_name })
    }).then(r => r.json()).then(data => {
        showToast(data.message || 'Topic added.', 'success');
        document.getElementById('topicName').value = '';
        loadTopics();
    }).catch(() => showToast('Failed to add topic.', 'error'));
}

function deleteTopic(id) {
    authFetch(`http://localhost:5000/topics/delete/${id}`, { method: 'DELETE' })
        .then(r => r.json()).then(data => {
            showToast(data.message || 'Topic deleted.', 'info');
            loadTopics();
        }).catch(() => showToast('Failed to delete.', 'error'));
}

loadTopics();
