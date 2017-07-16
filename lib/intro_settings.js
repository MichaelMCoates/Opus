// Settings for Intro.js, an tour library

document.addEventListener("DOMContentLoaded", function(event) {
  var intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    showProgress: true,
    hidePrev: true,
    hideNext: true,
    // overlayOpacity: 0,
    tooltipClass: 'tooltip',
    nextLabel: 'Press Enter →',
    steps: [
      {
        intro: "Welcome to Opus! <br><br> Opus is an artist-recommendation data visualization application, using the Spotify Web API and D3.js. Our goal is to help you find your next favorite artist! <br><br> Press enter for a tour around.",
        tooltipClass: 'intro',
      },
      {
        element: '#search-step',
        intro: "Let's begin! Type an artist you like here. Then press Enter. <br><br> CAUTION: Audio will begin playing.",
      },
      {
        element: '#node-step',
        intro: "The artists you enter will be added to the view, with a yellow border. You can add multiple artists if you like!",
        position: 'right',
      },
      {
        element: '#image-step',
        intro: 'Opus will fetch each artist\'s top songs and related artists from Spotify. Try clicking on another artist! You can zoom and drag the view around as your artist map grows.',
        position: 'left'
      },
      {
        element: '#artist-box-step',
        intro: "Here are your audio controls.",
        position: 'top'
      },
      {
        element: '#reset-step',
        intro: 'Click this to reset the whole page.'
      },
      {
        intro: 'And that\'s it! <br><br> Opus hopes that you find your new favorite artist here!'
      }
    ]
  });

  // Fire off requests during demo/tour
  intro.onchange(function(targetElement) {
    let inputEl = $('.search-input');
    switch (targetElement.id) {
      case 'search-step':
        break;
      case 'node-step':
        utilSearch(inputEl.val());
        inputEl.val('');
        break;
      default:
        inputEl.focus();


    }
  }).start();
});
