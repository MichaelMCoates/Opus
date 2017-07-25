// Sends AJAX request to backend to avoid CORS
function PingSpotifyAPIAJAX(url) {
  return $.ajax('/cors', { data: { url } });
}

// For fetching chosen nodes
function utilFetchArtist(id) {
  let url = `https://api.spotify.com/v1/artists/${id}`;
  PingSpotifyAPIAJAX(url)
    .then((response) => addParentNode(response))
    .then(() => utilFetchRelatedArtists(id));
}

// Fetch related artists and songs for selected artist
function utilFetchRelatedArtists(id) {
  let url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
  utilFetchTopSongs(id);
  PingSpotifyAPIAJAX(url).then((response) => addRelativeNodes(response, id));
}

// Fetch songs for selected artist
function utilFetchTopSongs(id) {
  let url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US&market=US`;
  PingSpotifyAPIAJAX(url).then((response) => addSongsToDOM(response));
}

// Search for artist and add to DOM as chosen node
function utilSearch(query) {
  query = query.trim();
  let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`;
  PingSpotifyAPIAJAX(url)
    .then((response) => {
      if (response.error) {
        alert("Token Error! Sorry about that, try again!");
      } else if (response.artists.items.length === 0) {
        alert("Spotify couldn't find an artist by that name. Try again!");
      } else {
        let id = response.artists.items[0].id;
        utilFetchArtist(id);
      }
    });
}
