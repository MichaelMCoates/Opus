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

async function grabTracksFromPlaylist(playlist_id) {
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    const playlist = await PingSpotifyAPIAJAX(`https://api.spotify.com/v1/playlists/${playlist_id}`)

    trackList = []

    console.log(playlist);
    
    playlist.tracks.items.forEach((item) => {
        artists = [];
        item.track.artists.forEach((artist) => artists.push(artist.name))
        trackList.push(`${artists.join(" ")} - ${item.track.name}`)
    })
    
    formattedTrackList = trackList.join(`\n`)

    copyToClipboard(formattedTrackList)
    console.log(formattedTrackList)
}

async function grabTracksFromPlaylistAndCopyScript(playlist_id) {
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    const playlist = await PingSpotifyAPIAJAX(`https://api.spotify.com/v1/playlists/${playlist_id}`)

    trackList = []

    console.log(playlist);
    
    playlist.tracks.items.forEach((item) => {
        artists = [];
        item.track.artists.forEach((artist) => artists.push(artist.name))
        trackList.push(`${artists.join(" ")} - ${item.track.name}`)
    })
    
    formattedTrackList = trackList.join(`\n`)
    console.log(formattedTrackList)

    textToCopy = `function similarity(s1, s2) {
          var longer = s1;
          var shorter = s2;
          if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
          }
          var longerLength = longer.length;
          if (longerLength == 0) {
            return 1.0;
          }
          return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
        }
    
        function editDistance(s1, s2) {
          s1 = s1.toLowerCase();
          s2 = s2.toLowerCase();
    
          var costs = new Array();
          for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
              if (i == 0)
                costs[j] = j;
              else {
                if (j > 0) {
                  var newValue = costs[j - 1];
                  if (s1.charAt(i - 1) != s2.charAt(j - 1))
                    newValue = Math.min(Math.min(newValue, lastValue),
                      costs[j]) + 1;
                  costs[j - 1] = lastValue;
                  lastValue = newValue;
                }
              }
            }
            if (i > 0)
              costs[s2.length] = lastValue;
          }
          return costs[s2.length];
        }
    
        // All the songs you want to download go here, with new lines between songs.
        playlistString = \`${formattedTrackList}\`
    
        // Grab the search bar and button elements
        searchBar = document.getElementById("q");
        searchButton = document.getElementById("snd");
    
        // Turn our fat string into an array
        songsArray = playlistString.split("\\n");
        console.log('songsArray', songsArray);
    
        // Set up some timeout functions so that the script doesn't move too fast, 
        // otherwise you'll miss downloads. 
        // Feel free to increase the 2000 number if you find you keep missing downloads. 
        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    
        async function sleep(fn) {
            await timeout(1000);
    
            // 1/28/2022 Added the await here so that when we retry, we don't go to the next song
            await fn();
            await timeout(500);
        }
    
        // Array to store songs that didn't download properly.
        errorSongs = [];
    
        // Array to store songs that might not be the correctly downloaded songs
        dissimilarSongs = [];
    
        for (let song of songsArray) {
            console.log("Default Song Name", song);
            // Remove symbols
            noSpecialChars = song.replace(/[$,\[\]@%-]/g, '');
            words = noSpecialChars.split(" ")
            // Remove words with weird characters
            filteredWords = words.filter((word) => !/[^a-zA-Z0-9 ]/g.test(word))
            filteredSong = filteredWords.join(" ")
            // Put the song name in and kick off the search.
            console.log("Filtered Song Name", filteredSong)
    
    
            // Put the song name in and kick off the search.
            searchBar.value = filteredSong;
            searchButton.click();
            console.log('search button clicked for', song)
            // Wait some time and then try to download the song.
            await sleep(async () => {
                try {
                    firstDownloadButton = document.getElementsByClassName("darken-4")[0]
                    console.log('firstDownloadButton got for', song) 
                    firstResultName = document.getElementById('results_t').firstChild.firstChild.innerText
                    console.log('firstResultName for firstDownloadButton: ', firstResultName) 
                    similarityPercentage = similarity(song, firstResultName)
                    console.log('Similarity Percentage = ', similarityPercentage)
                    if (similarityPercentage < 0.5) {
                        dissimilarSongs.push({song, firstResultName, similarityPercentage})
                    }
                } catch (e) {
                    console.log('error attempting to search', song, e)
                    errorSongs.push(song);
                    return;
                }
    
               try {
                   console.log('attempting to window.open for', firstDownloadButton.parentNode.href)
                   window.open(firstDownloadButton.parentNode.href, "_blank")
                   window.focus()
               } catch (e) {
                   console.log('error attempting to open', song, e)
                   errorSongs.push(song);
               }
            });
        }
    
        // General info
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log("Script has completed!");
        console.log(\`\${songsArray.length - errorSongs.length} songs successfully downloaded out of \${songsArray.length}\`)
        console.log(\`\${errorSongs.length} songs still need to be downloaded, here they are:\`);
        console.log(errorSongs);
        console.log("Dissimilar Songs:")
        console.log(dissimilarSongs)
    `

    copyToClipboard(textToCopy);
}
