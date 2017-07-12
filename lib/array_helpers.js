function addParentNode(response) {
  if (!NODES_OBJ[`${response.id}`]) {
    response.chosen = true;
    NODES_OBJ[`${response.id}`] = response;
  } else {
    NODES_OBJ[`${response.id}`].chosen = true;
  }

  CHOSEN_ARR.forEach((chosen) => {
    let linkKey = `${response.id}-${chosen.id}`;
    let linkKey2 = `${chosen.id}-${response.id}`;
    LINKS_OBJ[`${linkKey}`] = { "source": `${response.id}`, "target": `${chosen.id}`, "value": 6, };
    LINKS_OBJ[`${linkKey2}`] = { "source": `${response.id}`, "target": `${chosen.id}`, "value": 6, };
  });
  CHOSEN_ARR.push(response);

  update();
}

function addRelativeNodes(response, parentId) {
  artists = [response.artists[0]].concat(response.artists.slice(1, 8));
  artists.forEach((artist) => {
    artist.x = point[0];
    artist.y = point[1];
    if (!NODES_OBJ[`${artist.id}`]) {
      NODES_OBJ[`${artist.id}`] = artist;
    }
    let linkKey = `${artist.id}-${parentId}`;
    let linkKey2 = `${parentId}-${artist.id}`;
    LINKS_OBJ[`${linkKey}`] = { "source": `${artist.id}`, "target": `${parentId}`, "value": 6, };
    LINKS_OBJ[`${linkKey2}`] = { "source": `${parentId}`, "target": `${artist.id}`, "value": 6, };
  });

  update();
}
