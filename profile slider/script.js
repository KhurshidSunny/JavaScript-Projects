const allCards = document.querySelectorAll(".profile");
const btnNext = document.querySelector("#next-button");
const btnPrev = document.querySelector("#prev-button");
const sliderContainer = document.querySelector(".slider-container");

let curProfile = 0;

const gotoSlide = function (slide) {
  allCards.forEach(function (s, i) {
    s.style.transform = `translateX(${150 * (i - slide)}%)`;
  });
};
gotoSlide(0);
const nextSlide = function () {
  if (curProfile == allCards.length - 1) {
    curProfile = 0;
  } else {
    curProfile++;
  }
  gotoSlide(curProfile);
};

const prevSlide = function () {
  if (curProfile == 0) {
    curProfile = allCards.length - 1;
  } else {
    curProfile--;
  }
  gotoSlide(curProfile);
};
btnNext.addEventListener("click", nextSlide);

btnPrev.addEventListener("click", prevSlide);
