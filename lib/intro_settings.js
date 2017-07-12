document.addEventListener("DOMContentLoaded", function(event) {
  var intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      showBullets: false,
      showProgress: true,
      hidePrev: true,
      tooltipClass: 'tooltip',
      nextLabel: 'Press Enter →',
      steps: [
        {
          intro: "Welcome to Opus! <br><br> Opus is an artist-recommendation data visualization application, using the Spotify Web API and D3.js. Our goal is to help you find your next favorite artist! <br><br> Press enter for a tour around.",
          tooltipClass: 'intro',
        },
        {
          element: '#step1',
          intro: "Let's start by typing an artist you like here! Then press Enter.<br><br> CAUTION: Audio will begin playing.",
        },
        {
          element: '#step2',
          intro: "The artists you enter will be added to the view.",
          position: 'right',
        },
        {
          element: '#step3',
          intro: 'Opus will fetch samples of their top songs from Spotify, as well as artists related to them.',
          position: 'left'
        },
        {
          element: '#step3',
          intro: "Click on another artist to fetch their songs and relations.",
          position: 'right'
        },
        {
          element: '#step5',
          intro: "Click on a song to play a 30 second sample.",
          position: 'top'
        },
        {
          element: '#step6',
          intro: 'Click this to reset the whole page.'
        },
        {
          intro: 'And that\'s it! Try adding multiple artists, zooming in and out of the view, and dragging the circles around.<br><br> Opus hopes that you find your new favorite artist here!'
        }
      ]
    });

    intro.onchange(function(targetElement) {
      let inputEl = $('.search-input');

      switch (targetElement.id) {
        case 'step1':
          break;
        case 'step2':
          utilSearch(inputEl.val());
          inputEl.val('');
          break;
        default:
          inputEl.focus();


      }
    }).start();
});
