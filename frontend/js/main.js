requireAuth();

const PALETTE = ['#2b4a3a', '#476b55', '#5c8a6f', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];

Chart.defaults.color = '#444444';
Chart.defaults.borderColor = '#e2e8e5';
Chart.defaults.font.family = 'Inter, sans-serif';

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: { labels: { color: '#444444', font: { size: 12 }, boxWidth: 12, padding: 16 } },
        tooltip: {
            backgroundColor: '#ffffff', borderColor: '#e2e8e5', borderWidth: 1,
            titleColor: '#111111', bodyColor: '#444444', padding: 12, cornerRadius: 8,
        }
    }
};

let chartInstances = {};

function animateCount(el, target) {
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n;
        if (n >= target) clearInterval(t);
    }, 28);
}

function loadDashboardData() {
    Promise.all([
        authFetch('http://localhost:5000/authors').then(r => r.json()),
        authFetch('http://localhost:5000/papers').then(r => r.json()),
        authFetch('http://localhost:5000/institutions').then(r => r.json()),
        authFetch('http://localhost:5000/topics').then(r => r.json()),
        authFetch('http://localhost:5000/collaborations').then(r => r.json()),
    ]).then(([authors, papers, institutions, topics, collabs]) => {

        animateCount(document.getElementById('authorCount'), authors.length);
        animateCount(document.getElementById('paperCount'), papers.length);
        animateCount(document.getElementById('institutionCount'), institutions.length);
        animateCount(document.getElementById('topicCount'), topics.length);

        // Destroy existing charts before recreating
        Object.values(chartInstances).forEach(chart => chart.destroy());
        chartInstances = {};

        // Chart 1: Papers by Year
        const yearMap = {};
        papers.forEach(p => { yearMap[p.year] = (yearMap[p.year] || 0) + 1; });
        const years = Object.keys(yearMap).sort();
        chartInstances.papersByYear = new Chart(document.getElementById('chartPapersByYear'), {
            type: 'line',
            data: {
                labels: years,
                datasets: [{ label: 'Papers', data: years.map(y => yearMap[y]),
                    borderColor: '#2b4a3a', backgroundColor: 'rgba(43,74,58,0.1)',
                    borderWidth: 2.5, pointBackgroundColor: '#2b4a3a', pointBorderColor: '#ffffff',
                    pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 7, tension: 0.4, fill: true }]
            },
            options: { ...chartDefaults,
                scales: {
                    x: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444' } },
                    y: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444', stepSize: 1 }, beginAtZero: true }
                },
                plugins: { ...chartDefaults.plugins, legend: { display: false } }
            }
        });

        // Chart 2: Topics Distribution
        chartInstances.topics = new Chart(document.getElementById('chartTopics'), {
            type: 'doughnut',
            data: {
                labels: topics.map(t => t.topic_name),
                datasets: [{ data: topics.map((_, i) => i + 1),
                    backgroundColor: PALETTE, borderColor: '#ffffff', borderWidth: 3, hoverOffset: 8 }]
            },
            options: { ...chartDefaults, cutout: '62%',
                plugins: { ...chartDefaults.plugins,
                    legend: { position: 'bottom', labels: { color: '#444444', font: { size: 11 }, boxWidth: 10, padding: 12 } }
                }
            }
        });

        // Chart 3: Citations per Paper (top 10)
        const top10 = [...papers].sort((a, b) => b.citations - a.citations).slice(0, 10);
        chartInstances.citations = new Chart(document.getElementById('chartCitations'), {
            type: 'bar',
            data: {
                labels: top10.map(p => p.title.length > 22 ? p.title.slice(0, 22) + '…' : p.title),
                datasets: [{ label: 'Citations', data: top10.map(p => p.citations),
                    backgroundColor: top10.map((_, i) => i % 2 === 0 ? 'rgba(43,74,58,0.75)' : 'rgba(71,107,85,0.75)'),
                    borderColor: top10.map((_, i) => i % 2 === 0 ? '#2b4a3a' : '#476b55'),
                    borderWidth: 1.5, borderRadius: 6, borderSkipped: false }]
            },
            options: { ...chartDefaults,
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#444444', font: { size: 11 } } },
                    y: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444' }, beginAtZero: true }
                },
                plugins: { ...chartDefaults.plugins, legend: { display: false } }
            }
        });

        // Chart 4: Top Collaboration Pairs
        const topCollabs = [...collabs].sort((a, b) => b.collaboration_count - a.collaboration_count).slice(0, 8);
        chartInstances.collabs = new Chart(document.getElementById('chartCollabs'), {
            type: 'bar',
            data: {
                labels: topCollabs.map(c => `${c.author1} & ${c.author2}`),
                datasets: [{ label: 'Joint Works', data: topCollabs.map(c => c.collaboration_count),
                    backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10b981',
                    borderWidth: 2, borderRadius: 6, borderSkipped: false }]
            },
            options: { ...chartDefaults, indexAxis: 'y',
                scales: {
                    x: { grid: { color: '#f0f4f2' }, ticks: { color: '#444444', stepSize: 1 }, beginAtZero: true },
                    y: { grid: { display: false }, ticks: { color: '#444444', font: { size: 12 } } }
                },
                plugins: { ...chartDefaults.plugins, legend: { display: false } }
            }
        });

        // Update last refresh time
        updateRefreshIndicator();

    }).catch(err => console.error('Dashboard fetch error:', err));
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
loadDashboardData();

// Auto-refresh every 30 seconds
setInterval(() => {
    loadDashboardData();
}, 30000);
