// Response function to add songs to the player
function addSongsToDOM(songs) {
  ARTIST_INFO.tracks = songs.tracks.filter((track) => { return track.preview_url !== null; });
  let artistInfo = $('.artist-info');
  artistInfo.empty();

  let playerDiv = $('.player-div');
  playerDiv.empty();

  let playlistUl = $('.playlist-ul');
  playlistUl.empty();

  let nextButtonDiv = $('.next-button-div');
  nextButtonDiv.empty();

  if (ARTIST_INFO.tracks.length > 0) {
    // Add player to DOM
    let firstTrack = ARTIST_INFO.tracks[0];

    artistInfo.append(`
      <a target='_blank' href="${firstTrack.external_urls.spotify}">
        <h1>Now Playing: ${ARTIST_INFO.name}</h1>
      </a>`
    );

    playerDiv.append(
      // `<audio
      //   src="${firstTrack.preview_url}"
      //   controls="controls"
      //   >
      //   Your browser does not support the <code>audio</code> element.
      // </audio>`
      `<div id="player1" class="aplayer"></div>`
    );


    var ap = new APlayer({
      element: document.getElementById('player1'),                       // Optional, player element
      narrow: false,                                                     // Optional, narrow style
      autoplay: true,                                                    // Optional, autoplay song(s), not supported by mobile browsers
      mutex: true,                                                       // Optional, pause other players when this player playing
      theme: '#e6d0b2',                                                  // Optional, theme color, default: #b7daff
      // mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
      // preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
      // listmaxheight: '513px',                                             // Optional, max height of play list
      music: {                                                           // Required, music info, see: ###With playlist
          title: `${firstTrack.name}`,                                          // Required, music title
          author: `${ARTIST_INFO.name}`,                          // Required, music author
          url: `${firstTrack.preview_url}`,  // Required, music url
          pic: `${firstTrack.album.images[2].url}`,  // Optional, music picture
      }
    });

    // Add track to DOM
    // playlistUl.append(
    //   `<li class='playlist-li'>
    //     <a target='_blank' href="${firstTrack.external_urls.spotify}">
    //       ${firstTrack.name}
    //     </a>
    //   </li>`
    // );

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

  // initializePlayer();
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
