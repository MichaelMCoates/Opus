// Response function to add songs to the player
let globalAP;
let globalVolume = 0.5;

function addSongsToDOM(songs) {
  ARTIST_INFO.tracks = songs.tracks.filter((track) => { return track.preview_url !== null; });

  let playerDiv = $('.player-div');
  playerDiv.empty();

  let nextButtonDiv = $('.next-button-div');
  nextButtonDiv.empty();

  if (ARTIST_INFO.tracks.length > 0) {
    // Add player to DOM
    let firstTrack = ARTIST_INFO.tracks[0];

    playerDiv.append(
      `<div id="player1" class="aplayer"></div>`
    );

    nextButtonDiv.append(
      `<div class='next-button-inside-div'>
        <img class='next-button' src="assets/next.svg"></img>
      </div>`
    );

    initializePlayer(firstTrack);
  } else {
    if (globalAP) {
      globalAP.destroy();
      globalAP = null;
    }
    playerDiv.append(
      '<h1> No Tracks Available for Preview </h1><br/>'
    );
  }
}

// Set up player element
function initializePlayer(firstTrack) {
  globalAP = new APlayer({
    element: document.getElementById('player1'),
    narrow: false,
    autoplay: true,
    mutex: true,
    theme: '#e6d0b2',
    mode: 'order',
    listmaxheight: '0px',
    music: {
        title: `<a target='_blank' href="${firstTrack.external_urls.spotify}"><img class='logo' src="assets/logo.svg"></img>${firstTrack.name}</a>`,
        author: `<a target='_blank' href="${firstTrack.external_urls.spotify}">${ARTIST_INFO.name}</a>`,
        url: `${firstTrack.preview_url}`,
        pic: `${firstTrack.album.images[2].url}`,
    }
  });

  globalAP.volume(globalVolume);

  let current = 0;
  let tracks = ARTIST_INFO.tracks;
  let trackLength = tracks.length;
  let arrow = $('.next-button-inside-div');
  let arrowEl = arrow[0];
  let link;

  globalAP.on('ended', function (e) {
    current++;

    if (current == trackLength) {
      current = 0;
    }

    next = ARTIST_INFO.tracks[current];

    run(next, globalAP);
  });

  arrowEl.addEventListener('click', function (e) {
    e.stopPropagation();
    current++;

    if (current == trackLength) {
      current = 0;
    }

    next = ARTIST_INFO.tracks[current];

    run(next, globalAP);
  });

}

// Reset player with new song
function run(link, globalAP){
  globalAP.addMusic([{
      title: `<a target='_blank' href="${link.external_urls.spotify}"><img class='logo' src="assets/logo.svg"></img>${link.name}</a>`,
      author: `<a target='_blank' href="${link.external_urls.spotify}">${ARTIST_INFO.name}</a>`,
      url: `${link.preview_url}`,
      pic: `${link.album.images[2].url}`,
  }]);
  globalAP.setMusic(globalAP.playIndex + 1);
}
