requireAuth();

const PALETTE = ['#2b4a3a', '#476b55', '#5c8a6f', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

Chart.defaults.color = '#444444';
Chart.defaults.borderColor = '#e2e8e5';
Chart.defaults.font.family = 'Inter, sans-serif';

const tooltipDefaults = {
    backgroundColor: '#ffffff', borderColor: '#e2e8e5', borderWidth: 1,
    titleColor: '#111111', bodyColor: '#444444', padding: 12, cornerRadius: 8
};

let chartInstances = {};

// ── Animate counter ────────────────────────────────────────────
function animateCount(el, target, decimals = 0) {
    let n = 0;
    const step = Math.max(0.1, target / 35);
    const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString();
        if (n >= target) clearInterval(t);
    }, 28);
}

function loadAnalyticsData() {
    // ── Fetch all analytics in parallel ───────────────────────────
    Promise.all([
        authFetch('http://localhost:5000/analytics/citation-metrics').then(r => r.json()),
        authFetch('http://localhost:5000/analytics/cited-authors').then(r => r.json()),
        authFetch('http://localhost:5000/analytics/hindex').then(r => r.json()),
        authFetch('http://localhost:5000/analytics/trending-topics').then(r => r.json()),
        authFetch('http://localhost:5000/analytics/institution-heatmap').then(r => r.json()),
    ]).then(([metrics, citedAuthors, hindex, trending, heatmap]) => {

        // ── Metric Cards ───────────────────────────────────────────
        animateCount(document.getElementById('mTotalCit'),    Number(metrics.total_citations) || 0);
        animateCount(document.getElementById('mAvgCit'),      Number(metrics.avg_citations)   || 0, 1);
        animateCount(document.getElementById('mHighlyCit'),   Number(metrics.highly_cited)    || 0);
        animateCount(document.getElementById('mMaxCit'),      Number(metrics.max_citations)   || 0);
        animateCount(document.getElementById('mUncited'),     Number(metrics.uncited_papers)  || 0);
        animateCount(document.getElementById('mTotalPapers'), Number(metrics.total_papers)    || 0);

        // Destroy existing charts before recreating
        Object.values(chartInstances).forEach(chart => chart.destroy());
        chartInstances = {};

        // ── Chart 1: Trending Topics (animated multi-line) ─────────
        const { topics, years } = trending;
        const topicNames = Object.keys(topics).slice(0, 6); // top 6 topics
        chartInstances.trending = new Chart(document.getElementById('chartTrending'), {
            type: 'line',
            data: {
                labels: years,
                datasets: topicNames.map((name, i) => ({
                    label: name,
                    data: years.map(y => topics[name][y] || 0),
                    borderColor: PALETTE[i % PALETTE.length],
                    backgroundColor: PALETTE[i % PALETTE.length] + '18',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: false,
                }))
            },
            options: {
                responsive: true,
                animation: { duration: 1200, easing: 'easeInOutQuart' },
                scales: {
                    x: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444' } },
                    y: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444', stepSize: 1 }, beginAtZero: true }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#444444', font: { size: 11 }, boxWidth: 10, padding: 12 } },
                    tooltip: tooltipDefaults
                }
            }
        });

        // ── Chart 2: H-Index Bar Chart ─────────────────────────────
        const top10h = hindex.slice(0, 10);
        chartInstances.hindex = new Chart(document.getElementById('chartHIndex'), {
            type: 'bar',
            data: {
                labels: top10h.map(a => a.name.split(' ').slice(-1)[0]), // last name
                datasets: [{
                    label: 'H-Index',
                    data: top10h.map(a => a.h_index),
                    backgroundColor: top10h.map((_, i) => PALETTE[i % PALETTE.length] + 'cc'),
                    borderColor:     top10h.map((_, i) => PALETTE[i % PALETTE.length]),
                    borderWidth: 1.5,
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 1000, easing: 'easeOutBounce' },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#444444', font: { size: 11 } } },
                    y: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444', stepSize: 1 }, beginAtZero: true }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { ...tooltipDefaults,
                        callbacks: {
                            title: (items) => top10h[items[0].dataIndex]?.name || '',
                            label: (item) => ` H-Index: ${item.raw}`
                        }
                    }
                }
            }
        });

        // ── Leaderboard Table ──────────────────────────────────────
        const maxCit = citedAuthors[0]?.total_citations || 1;
        const tbody = document.getElementById('leaderboardBody');
        if (!citedAuthors.length) {
            tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><p>No data available.</p></div></td></tr>`;
        } else {
            tbody.innerHTML = citedAuthors.map((a, i) => {
                const rank = i + 1;
                const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-n';
                const barW = Math.max(4, Math.round((a.total_citations / maxCit) * 140));
                const hIdx = hindex.find(h => h.author_id === a.author_id)?.h_index ?? '—';
                return `<tr>
                    <td><span class="leaderboard-rank ${rankClass}">${rank}</span></td>
                    <td>
                        <div style="font-weight:600;color:var(--text-primary);">${a.name}</div>
                        <div style="font-size:11.5px;color:var(--text-muted);">${a.email}</div>
                    </td>
                    <td><span class="year-badge">${a.total_papers}</span></td>
                    <td>
                        <div class="citation-bar-wrap">
                            <div class="citation-bar" style="width:${barW}px;"></div>
                            <span style="font-weight:700;color:var(--text-primary);">${Number(a.total_citations).toLocaleString()}</span>
                        </div>
                    </td>
                    <td style="color:var(--text-secondary);">${Number(a.avg_citations).toFixed(1)}</td>
                    <td style="color:var(--warning);font-weight:600;">${a.max_citations}</td>
                    <td><span class="hindex-badge">h = ${hIdx}</span></td>
                </tr>`;
            }).join('');
        }

        // ── Institution Heatmap ────────────────────────────────────
        const { institutions, years: hYears } = heatmap;
        const instNames = Object.keys(institutions);
        const wrap = document.getElementById('heatmapWrap');

        if (!instNames.length || !hYears.length) {
            wrap.innerHTML = `<p style="color:var(--text-muted);font-size:13px;padding:20px 0;">No institution-year data available. Link authors to institutions and papers first.</p>`;
        } else {
            // Find max for color scaling
            let globalMax = 0;
            instNames.forEach(inst => hYears.forEach(y => {
                const v = institutions[inst][y] || 0;
                if (v > globalMax) globalMax = v;
            }));

            function heatColor(val) {
                if (!val) return 'var(--bg-surface)';
                const intensity = val / globalMax;
                const r = Math.round(43 + (100 - 43) * intensity);
                const g = Math.round(74 + (160 - 74) * intensity);
                const b = Math.round(58 + (120 - 58) * intensity);
                return `rgba(${r},${g},${b},${0.15 + intensity * 0.7})`;
            }

            let html = `<table class="heatmap-table"><thead><tr><th></th>`;
            hYears.forEach(y => { html += `<th>${y}</th>`; });
            html += `</tr></thead><tbody>`;

            instNames.forEach(inst => {
                const shortName = inst.length > 22 ? inst.slice(0, 22) + '…' : inst;
                html += `<tr><td class="inst-label" title="${inst}">${shortName}</td>`;
                hYears.forEach(y => {
                    const val = institutions[inst][y] || 0;
                    const bg  = heatColor(val);
                    const txt = val > 0 ? val : '';
                    html += `<td class="heatmap-cell" style="background:${bg};" title="${inst} · ${y}: ${val} papers">${txt}</td>`;
                });
                html += `</tr>`;
            });

            html += `</tbody></table>`;
            wrap.innerHTML = html;
        }

        // Update last refresh time
        updateRefreshIndicator();

    }).catch(err => console.error('Analytics error:', err));
}

function updateRefreshIndicator() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let indicator = document.getElementById('refreshIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'refreshIndicator';
        indicator.style.cssText = `position:fixed;bottom:20px;right:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:8px 14px;font-size:11px;color:var(--text-muted);z-index:1000;box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
        document.body.appendChild(indicator);
    }
    indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;color:var(--success);"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>Updated: ${timeStr}`;
}

// Initial load
loadAnalyticsData();

// Auto-refresh every 30 seconds
setInterval(() => {
    loadAnalyticsData();
}, 30000);
