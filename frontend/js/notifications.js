(function () {
    // Wait for DOM + utils.js to be ready
    function init() {
        const token = getToken(); // from utils.js — uses 'rdb_token'
        if (!token) return;

        const header = document.querySelector('.page-header');
        if (!header) return;

        // Inject bell
        const bell = document.createElement('div');
        bell.id = 'notif-bell';
        bell.style.cssText = 'position:absolute;top:16px;right:16px;cursor:pointer;z-index:100;';
        bell.innerHTML = `
            <div id="notif-btn" style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;background:var(--bg-surface);border:1px solid var(--border);border-radius:50%;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span id="notif-badge" style="display:none;position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:10px;font-weight:700;min-width:16px;height:16px;border-radius:8px;align-items:center;justify-content:center;padding:0 3px;"></span>
            </div>
            <div id="notif-dropdown" style="display:none;position:absolute;right:0;top:46px;width:320px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);box-shadow:0 8px 24px rgba(0,0,0,0.15);z-index:1000;">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border);">
                    <span style="font-weight:600;font-size:14px;">Notifications</span>
                    <button id="mark-all-btn" style="font-size:11px;color:var(--accent);background:none;border:none;cursor:pointer;padding:0;">Mark all read</button>
                </div>
                <div id="notif-list" style="max-height:320px;overflow-y:auto;"></div>
            </div>`;

        header.style.position = 'relative';
        header.appendChild(bell);

        // Events
        document.getElementById('notif-btn').addEventListener('click', function (e) {
            e.stopPropagation();
            const dd = document.getElementById('notif-dropdown');
            const isOpen = dd.style.display === 'block';
            dd.style.display = isOpen ? 'none' : 'block';
            if (!isOpen) loadNotifications();
        });

        document.getElementById('mark-all-btn').addEventListener('click', function (e) {
            e.stopPropagation();
            authFetch('http://localhost:5000/notifications/mark-all-read', { method: 'PUT' })
                .then(() => { refreshCount(); loadNotifications(); })
                .catch(console.error);
        });

        document.addEventListener('click', function (e) {
            const bellEl = document.getElementById('notif-bell');
            if (bellEl && !bellEl.contains(e.target)) {
                const dd = document.getElementById('notif-dropdown');
                if (dd) dd.style.display = 'none';
            }
        });

        function refreshCount() {
            authFetch('http://localhost:5000/notifications/unread-count')
                .then(r => r.json())
                .then(data => {
                    const badge = document.getElementById('notif-badge');
                    if (!badge) return;
                    if (data.count > 0) {
                        badge.textContent = data.count > 99 ? '99+' : data.count;
                        badge.style.display = 'flex';
                    } else {
                        badge.style.display = 'none';
                    }
                })
                .catch(console.error);
        }

        function loadNotifications() {
            const list = document.getElementById('notif-list');
            list.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px;">Loading…</p>';
            authFetch('http://localhost:5000/notifications')
                .then(r => r.json())
                .then(data => {
                    if (!data.length) {
                        list.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px;">No notifications</p>';
                        return;
                    }
                    list.innerHTML = data.map(n => `
                        <div class="notif-item" data-id="${n.notification_id}" data-link="${n.link || ''}"
                            style="padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;background:${n.is_read ? 'transparent' : 'rgba(99,102,241,0.06)'};">
                            <div style="font-size:13px;font-weight:${n.is_read ? '400' : '600'};color:var(--text-primary);margin-bottom:2px;">${n.title}</div>
                            <div style="font-size:12px;color:var(--text-muted);">${n.message}</div>
                            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${timeAgo(n.created_at)}</div>
                        </div>`).join('');

                    list.querySelectorAll('.notif-item').forEach(item => {
                        item.addEventListener('click', function () {
                            const id = this.dataset.id;
                            const link = this.dataset.link;
                            authFetch('http://localhost:5000/notifications/mark-read/' + id, { method: 'PUT' })
                                .then(() => {
                                    refreshCount();
                                    if (link) {
                                        // Resolve relative link against the frontend base path
                                        const base = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
                                        const page = link.replace(/^\//, '');
                                        window.location.href = base + page;
                                    } else {
                                        loadNotifications();
                                    }
                                })
                                .catch(console.error);
                        });
                    });
                })
                .catch(() => {
                    list.innerHTML = '<p style="text-align:center;color:red;font-size:13px;padding:20px;">Failed to load</p>';
                });
        }

        function timeAgo(dateStr) {
            const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
            if (diff < 60) return 'just now';
            if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
            if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
            return Math.floor(diff / 86400) + 'd ago';
        }

        refreshCount();
        setInterval(refreshCount, 30000);
    }

    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
})();
