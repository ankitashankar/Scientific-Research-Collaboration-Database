// ── Auth helpers ───────────────────────────────────────────────
function getToken()   { return localStorage.getItem('rdb_token'); }
function getUser()    { return JSON.parse(localStorage.getItem('rdb_user') || 'null'); }
function isLoggedIn() { return !!getToken(); }
function getRole()    { return getUser()?.role || null; }

function logout() {
    localStorage.removeItem('rdb_token');
    localStorage.removeItem('rdb_user');
    window.location.href = 'login.html';
}

function requireAuth() {
    if (!isLoggedIn()) window.location.href = 'login.html';
}

function guardElement(selector, allowedRoles) {
    const role = getRole();
    document.querySelectorAll(selector).forEach(el => {
        if (!allowedRoles.includes(role)) el.style.display = 'none';
    });
}

function authFetch(url, options = {}) {
    const token = getToken();
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) { logout(); throw new Error('Session expired.'); }
        return res;
    });
}

// ── Run after DOM is ready ─────────────────────────────────────
function _onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
}

_onReady(function () {

    // Active sidebar link
    document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
        if (link.href === location.href) link.classList.add('active');
    });

    // Inject global search bar before .page-header
    const header = document.querySelector('.page-header');
    if (header) {
        const bar = document.createElement('div');
        bar.className = 'global-search-wrap';
        bar.id = 'globalSearchWrap';
        bar.innerHTML = `
            <div class="global-search-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="globalSearchInput" placeholder="Search authors, papers, institutions…" autocomplete="off">
                <span class="search-kbd">Ctrl K</span>
            </div>
            <div class="search-dropdown" id="searchDropdown"></div>`;
        header.parentNode.insertBefore(bar, header);
    }

    // Inject user info + logout + notifications into sidebar footer
    const footer = document.querySelector('.sidebar-footer');
    const user = getUser();
    if (footer && user) {
        const roleColors = { admin: '#ef4444', researcher: '#f59e0b', viewer: '#10b981' };
        const color = roleColors[user.role] || '#9090b0';
        footer.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                <div style="width:34px;height:34px;border-radius:50%;background:${color}22;border:1.5px solid ${color}55;
                    display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${color};flex-shrink:0;">
                    ${user.username.charAt(0).toUpperCase()}
                </div>
                <div style="line-height:1.3;min-width:0;flex:1;">
                    <div style="font-size:13px;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${user.username}</div>
                    <div style="font-size:11px;color:${color};text-transform:capitalize;">${user.role}</div>
                </div>
            </div>
            <button onclick="logout()" style="width:100%;display:flex;align-items:center;gap:8px;padding:8px 10px;
                background:#f9f9f9;border:1px solid #e0e0e0;border-radius:8px;
                color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;"
                onmouseover="this.style.background='#fff1f2'; this.style.borderColor='#fda4af'; this.style.color='#e11d48';"
                onmouseout="this.style.background='#f9f9f9'; this.style.borderColor='#e0e0e0'; this.style.color='var(--text-secondary)';">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
            </button>`;
    }

    // Mobile hamburger
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        const ham = document.createElement('button');
        ham.className = 'hamburger';
        ham.setAttribute('aria-label', 'Open menu');
        ham.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
        document.body.appendChild(ham);

        ham.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('open'); });
        overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); });
    }
});

// ── Skeleton rows ───────────────────────────────────────
function showSkeleton(tbodyId, cols, rows = 6) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const widths = [40, 80, 60, 50, 45, 55, 40];
    tbody.innerHTML = Array.from({ length: rows }, () =>
        `<tr class="skeleton-row">${Array.from({ length: cols }, (_, i) =>
            `<td><span class="skeleton" style="width:${widths[i % widths.length]}%;height:14px;"></span></td>`
        ).join('')}</tr>`
    ).join('');
}

// ── Pagination ──────────────────────────────────────────
const PAGE_SIZE = 10;

function renderPagination(containerId, total, page, onPageChange) {
    let el = document.getElementById(containerId);
    if (!el) return; // placeholder must exist in HTML
    const totalPages = Math.ceil(total / PAGE_SIZE);
    if (totalPages <= 1) { el.innerHTML = ''; return; }

    const from = (page - 1) * PAGE_SIZE + 1;
    const to   = Math.min(page * PAGE_SIZE, total);

    // Build page buttons (show at most 5 around current)
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
        else if (pages[pages.length - 1] !== '...') pages.push('...');
    }

    el.className = 'pagination';
    el.innerHTML = `
        <span>${from}–${to} of ${total}</span>
        <div class="pagination-btns">
            <button class="pg-btn" ${page === 1 ? 'disabled' : ''} data-p="${page-1}">&lsaquo;</button>
            ${pages.map(p => p === '...'
                ? `<button class="pg-btn" disabled>…</button>`
                : `<button class="pg-btn ${p === page ? 'active' : ''}" data-p="${p}">${p}</button>`
            ).join('')}
            <button class="pg-btn" ${page === totalPages ? 'disabled' : ''} data-p="${page+1}">&rsaquo;</button>
        </div>`;

    el.querySelectorAll('.pg-btn[data-p]').forEach(btn =>
        btn.addEventListener('click', () => onPageChange(+btn.dataset.p))
    );
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        error:   `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        info:    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icons[type]}<span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
