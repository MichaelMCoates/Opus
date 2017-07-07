<script src="https://d3js.org/d3.v4.min.js"></script>
<svg width="960" height="600"></svg>
<script>

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

;
// d3.json('/api/data',
d3.request('/api/data').mimeType("application/json").response(function(xhr) { return JSON.parse(xhr.responseText); }).get({}, function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var gnodes = svg.selectAll('g.gnode')
    .data(graph.nodes)
    .enter()
    .append('g')
    .classed('gnode', true);

  var node = gnodes.append("circle")
      .attr("r", 7)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    var label = gnodes.append("text")
        .text(function( d) { return d.id; })
        .attr('class', 'mytext')
         .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return "start";
        })
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 12);

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    label
        .attr("x", function(d) { //<-- NEED TO POSITION THESE TOO
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
    }
  });

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

</script>
