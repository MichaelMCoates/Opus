// Response function to add songs to the player
function addSongsToDOM(songs) {
  ARTIST_INFO.tracks = songs.tracks.filter((track) => { return track.preview_url !== null; });
  let artistInfo = $('.artist-info');
  artistInfo.empty();
  artistInfo.append(`<h1>Now Playing: ${ARTIST_INFO.name}</h1>`);

  let playerDiv = $('.player-div');
  playerDiv.empty();

  let playlistUl = $('.playlist-ul');
  playlistUl.empty();

  let nextButtonDiv = $('.next-button-div');
  nextButtonDiv.empty();

  if (ARTIST_INFO.tracks.length > 0) {
    // Add player to DOM
    let firstTrack = ARTIST_INFO.tracks[0];

    playerDiv.append(
      `<audio
        src="${firstTrack.preview_url}"
        controls="controls"
        >
        Your browser does not support the <code>audio</code> element.
      </audio>`
    );

    // Add track to DOM
    playlistUl.append(
      `<li class='playlist-li'>
        <a target='_blank' href="${firstTrack.external_urls.spotify}">
          ${firstTrack.name}
        </a>
      </li>`
    );

    nextButtonDiv.append(
      `<div class='next-button-inside-div'>
        <img class='next-button' src="assets/next.svg"></img>
      </div>`
    );
  } else {
    playlistUl.append(
      '<li> No Tracks Available for Preview </li>'
    );
  }

  initializePlayer();
}

// Set up player element
function initializePlayer() {
  let current = 0;
  let player = $('audio');
  // let playlist = $('.playlist-ul');
  let tracks = ARTIST_INFO.tracks;
  let trackLength = tracks.length;
  let arrow = $('.next-button-inside-div');
  let arrowEl = arrow[0];
  let link;
  let playerEl = player[0];
  if (!playerEl) {
    return;
  }
  playerEl.volume = 0.1;
  playerEl.play();
  playerEl.addEventListener('ended', function (e) {
    current++;

    if (current == trackLength) {
      current = 0;
    }

    next = ARTIST_INFO.tracks[current];

    run(next, playerEl);
  });

  arrowEl.addEventListener('click', function (e) {
    e.stopPropagation();
    current++;
    if (current == trackLength) {
      current = 0;
    }
    next = ARTIST_INFO.tracks[current];
    // debugger
    run(next, playerEl);
  });

}

function nextSong(e) {

}

// Reset player with new song
function run(link, playerEl){
  let playlistLI = $('.playlist-li');
  playlistLI.replaceWith(
    `<li class='playlist-li'>
      <a target='_blank' href="${link.external_urls.spotify}">
        ${link.name}
      </a>
    </li>`
  );
  playerEl.src = link.preview_url;
  playerEl.load();
  playerEl.play();
}
