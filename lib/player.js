function addSongsToDOM(songs) {
  let name = songs.tracks[0].artists[0].name;
  let tracks = songs.tracks.filter((track) => { return track.preview_url !== null; });
  let artistInfo = $('.artist-info');
  artistInfo.empty();
  artistInfo.append(`<h1>Now Playing: ${name}</h1>`);

  let playerDiv = $('.player-div');
  playerDiv.empty();

  let playlistUl = $('.playlist-ul');
  playlistUl.empty();

  if (tracks.length > 0) {
    playerDiv.append(
      `<audio
        src="${tracks[0].preview_url}"
        controls="controls"
        >
        Your browser does not support the <code>audio</code> element.
      </audio>`
    );

    tracks.forEach((track, idx) => {
      if (idx === 0) {
        playlistUl.append(
          `<li class='playlist-li'>
            <a class='active' href="${track.preview_url}">
              ${idx + 1}. ${track.name}
            </a>
          </li>`
        );
      } else {
        playlistUl.append(
          `<li class='playlist-li'>
          <a href="${track.preview_url}">
          ${idx + 1}. ${track.name}
          </a>
          </li>`
        );
      }
    });
  } else {
    playlistUl.append(
      '<li> No Tracks Available for Preview </li>'
    );
  }

  initializePlayer();
}

function initializePlayer() {
  let current = 0;
  let player = $('audio');
  let playlist = $('.playlist-ul');
  let tracks = playlist.find('a');
  let trackLength = tracks.length;
  let link;
  let playerEl = player[0];
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

function run(link, playerEl){
  playerEl.src = link.attr('href');
  parentEl = link.parent();
  parentEl.children().addClass('active');
  parentEl.siblings().children().removeClass('active');
  playerEl.load();
  playerEl.play();
}
