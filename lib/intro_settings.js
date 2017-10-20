// Settings for Intro.js, a tour library

document.addEventListener("DOMContentLoaded", function(event) {
  var intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    showProgress: true,
    hidePrev: true,
    hideNext: true,
    overlayOpacity: 0.5,
    skipLabel: "Esc",
    doneLabel: "Esc",
    nextLabel: 'Press Enter →',
    steps: [
      {
        intro: "Welcome to Opus! <br><br> Opus is an artist-exploration data-visualization application, built with the Spotify Web API and D3.js. Our goal is to help you find your next favorite artist! <br><br> Opus works best with the screen window maximized. If yours currently isn't, we recommend changing the size, refreshing the page, and clicking the Tour button. <br><br> Press enter for a tour around.<br> Press escape to skip this tutorial.",
        tooltipClass: 'intro',
      },
      {
        element: '#search-step',
        intro: "Let's begin! First, you'll type an artist you like here and press Enter. <br><br> Let's listen to some Otis Redding. <br><br> CAUTION: Audio will begin playing.",
      },
      {
        element: '#node-step',
        intro: "The artists you enter will be added to the view with a yellow border. You can add multiple artists if you like!",
        position: 'right',
      },
      {
        element: '#image-step',
        intro: 'When you click on an artist\'s picture, Opus will fetch that artist\'s top songs and related artists from Spotify. Try clicking on another artist! You can zoom with the scrollwheel and drag the view around as your artist map grows.',
        position: 'left'
      },
      {
        element: '#artist-box-step',
        intro: "Here are your audio controls. Click on the track name to open it in Spotify!",
        position: 'top'
      },
      {
        element: '#center-zoom-step',
        intro: 'Click this to re-center your force graph.'
      },
      {
        element: '#reset-step',
        intro: 'Click this to reset the whole page.'
      },
      {
        element: '#body-step',
        intro: 'And that\'s it! <br><br> Opus hopes that you find your new favorite artist here!'
      }
    ]
  });

  // Fire off requests during demo/tour
  intro.onchange(function(targetElement) {
    let inputEl = $('.search-input');
    switch (targetElement.id) {
      case 'search-step':
        inputEl.val("Otis Redding");
        break;
      case 'node-step':
        utilSearch(inputEl.val());
        inputEl.val('');
        break;
      case 'image-step':
        ARTIST_INFO.name = "Al Green";
        clickedIds['3dkbV4qihUeMsqN4vBGg93'] = true;
        utilFetchRelatedArtists('3dkbV4qihUeMsqN4vBGg93');
        break;
      case 'body-step':
        $('.introjs-prevbutton').attr('style', 'display: none;');
        break;
      default:
        inputEl.focus();
        break;
    }
  });

  if (localStorage.getItem("introDisabled") == null) {
    localStorage.setItem("introDisabled", true);
    intro.start();
  }

  $('.tour-button').click(() => intro.start());
});
