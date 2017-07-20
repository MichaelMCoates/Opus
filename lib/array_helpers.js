
// API Responses/Array Constant Helpers/D3 Formatters

// For 1 node. Result from search
function addParentNode(response) {
  ARTIST_INFO.name = response.name;

  // Prevent adding the same parent node again
  if (!NODES_OBJ[`${response.id}`]) {
    response.chosen = true;
    NODES_OBJ[`${response.id}`] = response;
  } else {
    NODES_OBJ[`${response.id}`].chosen = true;
  }

  clickedIds[response.id] = true;

  // Create links to other parent nodes
  CHOSEN_ARR.forEach((chosen) => {
    let linkKey = `${response.id}-${chosen.id}`;
    let linkKey2 = `${chosen.id}-${response.id}`;
    LINKS_OBJ[`${linkKey}`] = { "source": `${response.id}`, "target": `${chosen.id}`, "chosen": true};
    LINKS_OBJ[`${linkKey2}`] = { "source": `${response.id}`, "target": `${chosen.id}`, "chosen": true};
  });

  CHOSEN_ARR.push(response);

  // After updating constants, re-render D3
  update();
}

// For relatives of selected node
function addRelativeNodes(response, parentId) {
  // Grab 8 related artists
  artists = [response.artists[0]].concat(response.artists.slice(1, 8));

  // Create nodes and links for those artists
  artists.forEach((artist) => {
    artist.x = point[0];
    artist.y = point[1];

    // Prevent adding the same node again
    if (!NODES_OBJ[`${artist.id}`]) {
      NODES_OBJ[`${artist.id}`] = artist;
    }

    // Create links
    let linkKey = `${artist.id}-${parentId}`;
    let linkKey2 = `${parentId}-${artist.id}`;
    LINKS_OBJ[`${linkKey}`] = { "source": `${artist.id}`, "target": `${parentId}`};
    LINKS_OBJ[`${linkKey2}`] = { "source": `${parentId}`, "target": `${artist.id}`};
  });

  // After updating constants, re-render D3
  update();
}
