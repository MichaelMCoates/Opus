
// D3 Constants
let NODES_OBJ = {};
let LINKS_OBJ = {};
let CHOSEN_ARR = [];
let nodes = [];
let links = [];
let point = [0, 0];
let ARTIST_INFO = '';
let ARTIST_TRACKS = [];

// D3 View Setup
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  color = d3.scaleOrdinal(d3.schemeCategory20);

// Zoom setup
var zoom = d3.zoom()
    .on("zoom", zoomed);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "#ffffff")
    .style("pointer-events", "all")
    .call(zoom);

function zoomed() {
  g.attr("transform", d3.event.transform);
}

// D3 Component Setup
let g = svg.append("g"),
  link = g.append("g").attr("stroke", "#000000").attr("stroke-width", 1).selectAll(".link"),
  node = g.append("g").attr('id', 'step3').selectAll(".node"),
  text = g.append("g").attr('id', 'step2').selectAll(".text"),
  image = g.append("g").attr('id', 'step4').selectAll(".image");

// D3 Render Function
function update() {
  let nodesArray = Object.values(NODES_OBJ);
  let linksArray = Object.values(LINKS_OBJ);

  // Update nodes. Circular objects for borders and layout.
  node = node.data(nodesArray, function(d) { return d.id; } );
  node.exit().remove();
  node = node.enter()
    .append("circle")
    .attr('class', 'node')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("r", 36)
    .attr('fill', '#000')
    .style("cursor", "pointer")
    .on('click', (d) => utilFetchRelatedArtists(`${d.id}`))
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .merge(node);

  // Conditional rendering for chosen nodes. Gold border vs. black
  node.filter(function(d, i) { return d.chosen;} )
    .attr('fill', '#FFD700')
    .attr('r', 45);

  // Artist Images.
  image = image.data(nodesArray, function(d) { return d.id; } );
  image.exit().remove();
  image = image.enter()
    .append('g')
    .attr('class', 'image')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .style("cursor", "pointer")
    .on('click', (d) => {
      // Set rendering point for children nodes after being fetches
      point[0] = d.x;
      point[1] = d.y;
      utilFetchRelatedArtists(`${d.id}`);
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .merge(image);

  // For circular images instead of rectangular
  image.append("clipPath")
    .attr('id', function(d) {return (`clipCircle${d.id}`);})
    .attr('class', 'clipPath')
    .append('circle')
    .attr('fill', '#222326')
    .attr("stroke", "#fff")
    .attr("stroke-width", 50)
    .attr('r', 35);

  // Image append and resize
  image.append('image')
    .attr('xlink:href', function(d) {
      if (d.images[2]) {
        return d.images[2].url;
      } else {
        return 'https://s3-us-west-2.amazonaws.com/opus-pro/opus-logo.png';
      }
    })
    .attr('width',
      function(d) {
        let artistImage = d.images[2];
        if (!artistImage) {
          return 70;
        } else if (artistImage.width > artistImage.height) {
          return 70 * (artistImage.width / artistImage.height);
        } else {
          return 70;
        }
      }
    )
    .attr('height',
      function(d) {
        let artistImage2 = d.images[2];
        if (!artistImage2) {
          return 70;
        } else if (artistImage2.height > artistImage2.width) {
          return 70 * (artistImage2.height / artistImage2.width);
        } else {
          return 70;
        }
      }
    )
    .attr('y', '-35px')
    .attr("clip-path", function(d) {return (`url(#clipCircle${d.id})`);})
    .attr('x', '-35px');

  // Links between nodes
  link = link.data(linksArray, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter()
    .append("line")
    .attr('class', 'link')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("fill", function(d) { return color(2); })
    .merge(link);

  // Artist name text
  text = text.data(nodesArray, function(d) { return d.id; } );
  text.exit().remove();
  text = text.enter()
    .append("text")
    .attr('class', 'text')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("dx", 38)
    .attr("dy", 3)
    .style("fill", "#000")
    .style("font-size", 16)
    .style('text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff')
    .text(function(d) { return d.name; })
    .merge(text);

  // Reheat/restart simulation to put new nodes in proper place.
  simulation.nodes(nodesArray);
  simulation.force("link").links(linksArray);
  simulation.alpha(0.1).restart();
}
