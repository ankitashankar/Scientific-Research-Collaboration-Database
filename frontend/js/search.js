// Global search — runs after DOM ready
function _onReadySearch(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
}
_onReadySearch(function() {
    // Small delay so utils.js injectGlobalSearch runs first
    setTimeout(initGlobalSearch, 0);
});

function initGlobalSearch() {
    const wrap = document.getElementById('globalSearchWrap');
    const input = document.getElementById('globalSearchInput');
    const dropdown = document.getElementById('searchDropdown');
    if (!wrap || !input || !dropdown) return;

    let debounceTimer = null;
    let activeIndex = -1;

    function highlight(text, query) {
        if (!query) return text;
        const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(re, '<mark>$1</mark>');
    }

    function renderDropdown(data, query) {
        dropdown.innerHTML = '';
        const { authors = [], papers = [], institutions = [] } = data;
        const total = authors.length + papers.length + institutions.length;

        if (total === 0) {
            dropdown.innerHTML = `<div class="search-no-results">No results for "<strong>${query}</strong>"</div>`;
            dropdown.classList.add('open');
            return;
        }

        if (authors.length) {
            dropdown.innerHTML += `<div class="search-section-label">Authors</div>`;
            authors.forEach(a => {
                dropdown.innerHTML += `
                <a class="search-result-item" href="authors.html">
                    <div class="sri-icon author">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                        <div class="sri-main">${highlight(a.name, query)}</div>
                        <div class="sri-sub">${a.email || ''}</div>
                    </div>
                </a>`;
            });
        }

        if (papers.length) {
            dropdown.innerHTML += `<div class="search-section-label">Papers</div>`;
            papers.forEach(p => {
                dropdown.innerHTML += `
                <a class="search-result-item" href="papers.html">
                    <div class="sri-icon paper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                        <div class="sri-main">${highlight(p.title, query)}</div>
                        <div class="sri-sub">${p.year} · ${p.citations} citations</div>
                    </div>
                </a>`;
            });
        }

        if (institutions.length) {
            dropdown.innerHTML += `<div class="search-section-label">Institutions</div>`;
            institutions.forEach(i => {
                dropdown.innerHTML += `
                <a class="search-result-item" href="institutions.html">
                    <div class="sri-icon inst">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div>
                        <div class="sri-main">${highlight(i.name, query)}</div>
                        <div class="sri-sub">Institution</div>
                    </div>
                </a>`;
            });
        }

        dropdown.classList.add('open');
        activeIndex = -1;
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        activeIndex = -1;
    }

    input.addEventListener('input', () => {
        const q = input.value.trim();
        clearTimeout(debounceTimer);
        if (q.length < 2) { closeDropdown(); return; }

        debounceTimer = setTimeout(() => {
            authFetch(`http://localhost:5000/search?q=${encodeURIComponent(q)}`)
                .then(r => r.json())
                .then(data => renderDropdown(data, q))
                .catch(() => closeDropdown());
        }, 220);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            items.forEach((el, i) => el.style.background = i === activeIndex ? 'var(--bg-hover)' : '');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, -1);
            items.forEach((el, i) => el.style.background = i === activeIndex ? 'var(--bg-hover)' : '');
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            items[activeIndex]?.click();
        } else if (e.key === 'Escape') {
            closeDropdown();
            input.blur();
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) closeDropdown();
    });

    // Keyboard shortcut: / or Ctrl+K to focus
    document.addEventListener('keydown', (e) => {
        if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== input) {
            e.preventDefault();
            input.focus();
            input.select();
        }
    });
}
