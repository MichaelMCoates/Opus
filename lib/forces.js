var simulation = d3.forceSimulation()
  .force("collision", d3.forceCollide(75))
  .force("charge", d3.forceManyBody().strength(-30000).distanceMin(400))
  .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(140).strength(1).iterations(4))
  .force("center", d3.forceCenter(0, 0))
  .alphaDecay(0.018)
  .alpha(0.4)
  .on("tick", ticked);

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

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  text.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });

  image.attr('transform', function(d) {
    let thisY = (d.y + height / 2);
    let thisX = (d.x + width / 2);
    return `translate(${thisX}, ${thisY})`;
  });

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}
