$('.search-form').submit(function(event) {
  event.preventDefault();
  let inputEl = $('.search-input');
  utilSearch(inputEl.val());
  inputEl.val('');
});

$('.reset-button').click(function(e) {
  NODES_OBJ = {};
  LINKS_OBJ = {};
  CHOSEN_ARR = [];
  nodes = [];
  links = [];
  point = [0, 0];
  ARTIST_INFO = '';
  ARTIST_TRACKS = [];
  $('.artist-info').empty();
  $('.playlist-ul').empty();
  $('.player-div').empty();
  update();
});

var viewportWidth = $(window).width();
var viewportHeight = $(window).height();

$('.svg-div').append(
  `<svg
    width=${viewportWidth}
    height=${viewportHeight * 0.75}
    >
  </svg>`
);
