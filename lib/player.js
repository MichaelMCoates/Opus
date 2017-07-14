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
        <a href="${firstTrack.preview_url}">
          ${firstTrack.name}
        </a>
      </li>`
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
  let playlist = $('.playlist-ul');
  let tracks = playlist.find('a');
  let trackLength = tracks.length;
  let link;
  let playerEl = player[0];
  if (!playerEl) {
    return;
  }
  playerEl.volume = 0.1;
  playerEl.play();
  playerEl.addEventListener('ended', function(e) {
    current++;

    if (current == trackLength) {
      current = 0;
    }

    link = $(tracks[current]);
    run(link, playerEl);
  });

  tracks.click(function(e) {
    e.preventDefault();
    link = $(this);
    current = link.parent().index();
    run(link, playerEl);
  });
}

// Reset player with new song
function run(link, playerEl){
  playerEl.src = link.attr('href');
  parentEl = link.parent();
  parentEl.children().addClass('active');
  parentEl.siblings().children().removeClass('active');
  playerEl.load();
  playerEl.play();
}
