'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');

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

// console.log(message.style.backgroundColor);
// console.log(message.style.height);

// console.log(
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'
// );
// console.log(getComputedStyle(message).padding);

// document.documentElement.style.setProperty('--color-primary', 'yellowgreen');

// getting attributes

const navLogo = document.querySelector('.nav__logo');
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

///// SMOOTH SCROOLING

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
