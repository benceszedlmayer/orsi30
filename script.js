document.addEventListener('DOMContentLoaded', () => {
  /* 
    Page Reveal
    */
  const main = document.querySelector('.orsi');
  main.classList.add('loaded');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* 
    Countdown timer
    */
  const countdown = new Countdown({
    cont: document.querySelector('.countdown__wrapper'),
    countdown: true, // true for classic countdown, false for countup
    date: {
      day: 11,
      month: 12,
      year: 2021,
      hour: 16,
      minute: 0,
      second: 0,
    },
    endCallback: function () {
      countdown.stop();
    },
    outputFormat: 'day|hour|minute',
  });

  countdown.start();

  /* 
  Swipebox
  */

  $('.swipebox').swipebox({
    loopAtEnd: true,
  });

  /* 
  Animations
  */
  const controller = new ScrollMagic.Controller();

  const orsiImage = document.getElementById('orsi');
  const bootsImage = document.getElementById('boots');

  // build scenes
  new ScrollMagic.Scene({
    triggerElement: '.main-image',
    duration: '100%',
    triggerHook: 0.3,
  })
    .setTween(
      TweenMax.from(orsiImage, 1, {
        y: '-15%',
        ease: Power0.easeNone,
      }),
    )
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#boots-wrapper',
    duration: '100%',
    triggerHook: 0.8,
  })
    .setTween(
      TweenMax.from(bootsImage, 1, {
        y: '-15%',
        ease: Power0.easeNone,
      }),
    )
    .addTo(controller);

  const locationImage = document.getElementById('location');
  new ScrollMagic.Scene({
    triggerElement: '#location-wrapper',
    duration: '100%',
    triggerHook: 0.8,
  })
    .setTween(
      TweenMax.from(locationImage, 1, {
        y: '-15%',
        ease: Power0.easeNone,
      }),
    )
    .addTo(controller);

  const revealElements = document.getElementsByClassName('line');
  for (var i = 0; i < revealElements.length; i++) {
    new ScrollMagic.Scene({
      triggerElement: revealElements[i],
      offset: 50,
      triggerHook: 0.9,
    })
      .setClassToggle(revealElements[i], 'visible')
      .addTo(controller);
  }

  /* Firebase */
  firebase.initializeApp({
    apiKey: 'AIzaSyC2RgbVswj1eJyt5xEq7Wa3-ceB_CWWpOI',
    authDomain: 'orsi-30.firebaseapp.com',
    projectId: 'orsi-30',
    storageBucket: 'orsi-30.appspot.com',
  });

  var storage = firebase.storage();
  var storageRef = storage.ref('images');
  const gallery = document.getElementById('gallery');

  storageRef
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        imageRef
          .getDownloadURL()
          .then(function (url) {
            // TODO: Display the image on the UI
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.className = 'swipebox';
            const image = document.createElement('img');
            image.className = 'photo';
            image.src = url;
            anchor.appendChild(image);
            gallery.appendChild(anchor);

            new ScrollMagic.Scene({
              triggerElement: image,
              offset: 80,
              triggerHook: 0.9,
            })
              .setClassToggle(image, 'visible')
              .addTo(controller);
          })
          .catch(function (error) {
            // Handle any errors
          });
      });
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
});
