'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navLinks = document.querySelector('.nav__links');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*

//// Creating the Cookie Message///////////////
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `we use cookies for improved functionality and analysitcs <button class="btn btn--close-cookie">got to</button>`;
// header.before(message);
// header.after(message)

// header.prepend(message);
header.append(message);

// for copy
// header.append(message.cloneNode(true));
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.parentElement.removeChild(message);
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

*/

///// BUTTON SMOOTH SCROLLING

btnScroll.addEventListener('click', function (e) {
  console.log(e);
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log('current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  console.log('window height/width', window.innerHeight, window.innerWidth);

  /// scroll (old school way)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //// Scroll (modern way)
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////// Nav Scrolling smooth using Event Deligation /////////////
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/// Tabbed componenet

// adding eventListners to the tabs using event deligation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard class
  if (!clicked) return;

  // Active Tab clasess
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation: IntersectionObserver API
const navHeight = nav.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);

headerObserver.observe(header);

// Section animation
const allSections = document.querySelectorAll('.section');

const displaySection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // unobserve the target elements
  observer.unobserve(entry.target);
};

const secOptions = {
  root: null,
  threshold: 0.15,
};
const sectionsObserver = new IntersectionObserver(displaySection, secOptions);
allSections.forEach(function (sec) {
  sectionsObserver.observe(sec);
  // sec.classList.add('section--hidden');
});

// Lazy image loading

const imgTargets = document.querySelectorAll('img[data-src]');

const displayImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace sr with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
};

const imgObserver = new IntersectionObserver(displayImage, imgOptions);

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRigth = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let curSlide = 0;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDots(0);
  };

  init();

  const nextSlide = function () {
    if (curSlide === slides.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slides.length - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  btnRigth.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

slider();

//////////Experimenting code ///////////////////////

///////////////////////////
////////////////////////////-
/////////////////////////
// const obsCallback = function (entries, observer) {
//   entries.forEach(el => console.log(el));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// // target element
// observer.observe(section1);

// console.log(message.style.backgroundColor);
// console.log(message.style.height);

// console.log(
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'
// );
// console.log(getComputedStyle(message).padding);

// document.documentElement.style.setProperty('--color-primary', 'yellowgreen');

// getting attributes

// const navLogo = document.querySelector('.nav__logo');
// console.log(navLogo);

// console.log(navLogo.src);
// console.log(navLogo.alt);
// console.log(navLogo.className);

// navLogo.setAttribute('company', 'Bankist');
// console.log(navLogo.getAttribute('company'));
// console.log(navLogo.company);

// console.log(navLogo.getAttribute('src'));

///// getting the dataset values
// console.log(Number(navLogo.dataset.versionNumber));

/*

/////////////////////Event propation (capturing and bubbling)////////////////

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// Event propation (capturing and bubbling)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('Link', e.target);
  console.log(e.currentTarget);
  console.log(this === e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('Nav_link', e.target);
  console.log(e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('Nav', e.target);
  console.log(e.currentTarget);
  this.style.backgroundColor = randomColor();
});

//// Listneing to events in capturing phase

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('Nav', e.target);
//     console.log(e.currentTarget);
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );
*/

/////////// DOM Traversing
// const h1 = document.querySelector('h1');

// // Downways
// console.log(h1.childNodes);
// console.log(h1.children); // just returns the innerHTML

// h1.querySelector('.highlight').style.backgroundColor = 'red';

// Direct children

// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

//////////// Going upward

// direct parent
// console.log(h1.parentElement);
// console.log(h1.parentNode);

/// Finding the closest parent
// const clParent = h1.closest('.header');
// clParent.style.background = 'var(--gradient-secondary)';

// traversing sideways

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// To find all the sibling we do a trick
// const allSibling = h1.parentElement.children;
// [...allSibling].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
