requireAuth();
authFetch('http://localhost:5000/collaborations')
.then(r => r.json())
.then(data => {
    const container = document.querySelector('.network-container');
    const W = container.clientWidth;
    const H = container.clientHeight;

    const svg = d3.select('#networkGraph')
        .attr('width', W).attr('height', H);

    // Defs: glow filter + arrow marker
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Background gradient
    const grad = defs.append('linearGradient').attr('id', 'bgGrad')
        .attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
    grad.append('stop').attr('offset', '0%').attr('stop-color', '#f0f9ff');
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#e0f2fe');
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'url(#bgGrad)');

    const g = svg.append('g');

    svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => g.attr('transform', e.transform)));

    // Build nodes & links
    const nodeSet = new Set();
    data.forEach(d => { nodeSet.add(d.author1); nodeSet.add(d.author2); });
    const nodes = Array.from(nodeSet).map(id => ({ id }));
    const links = data.map(d => ({
        source: d.author1, target: d.author2, value: d.collaboration_count
    }));

    const palette = ['#7c3aed','#f59e0b','#10b981','#06b6d4','#ef4444','#ec4899','#a855f7','#34d399'];

    const colorMap = {};
    nodes.forEach((n, i) => { colorMap[n.id] = palette[i % palette.length]; });

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(140))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collision', d3.forceCollide(45));

    // Links
    const link = g.append('g').selectAll('line').data(links).enter().append('line')
        .attr('stroke', '#b8d8eb')
        .attr('stroke-width', d => Math.max(1.5, Math.min(d.value, 6)))
        .attr('stroke-opacity', 0.6);

    // Link labels
    const linkLabel = g.append('g').selectAll('text').data(links).enter().append('text')
        .text(d => d.value)
        .attr('fill', '#7f9ab0')
        .attr('font-size', '11px')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Inter, sans-serif');

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .style('position', 'fixed')
        .style('background', '#ffffff')
        .style('border', '1px solid #d7e8f3')
        .style('border-radius', '10px')
        .style('padding', '10px 16px')
        .style('font-size', '13px')
        .style('font-family', 'Inter, sans-serif')
        .style('color', '#153146')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('z-index', 9999)
        .style('box-shadow', '0 10px 30px rgba(26,80,112,0.2)');

    // Nodes
    const node = g.append('g').selectAll('circle').data(nodes).enter().append('circle')
        .attr('r', 20)
        .attr('fill', d => colorMap[d.id])
        .attr('fill-opacity', 0.2)
        .attr('stroke', d => colorMap[d.id])
        .attr('stroke-width', 2.5)
        .style('cursor', 'pointer')
        .style('filter', 'url(#glow)')
        .on('mouseover', (event, d) => {
            d3.select(event.currentTarget).attr('fill-opacity', 0.4).attr('r', 24);
            tooltip.style('opacity', 1).html(`<strong>${d.id}</strong>`);
        })
        .on('mousemove', event => {
            tooltip.style('left', (event.clientX + 14) + 'px').style('top', (event.clientY - 10) + 'px');
        })
        .on('mouseout', event => {
            d3.select(event.currentTarget).attr('fill-opacity', 0.2).attr('r', 20);
            tooltip.style('opacity', 0);
        })
        .call(d3.drag()
            .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
            .on('end',   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
        );

    // Labels
    const label = g.append('g').selectAll('text').data(nodes).enter().append('text')
        .text(d => d.id)
        .attr('fill', '#4d6c82')
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('font-family', 'Inter, sans-serif')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none');

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        linkLabel
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2 - 4);
        node.attr('cx', d => d.x).attr('cy', d => d.y);
        label.attr('x', d => d.x).attr('y', d => d.y + 34);
    });
});
