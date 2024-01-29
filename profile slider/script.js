const allCards = document.querySelectorAll(".profile");
const btnNext = document.querySelector("#next-button");
const btnPrev = document.querySelector("#prev-button");
const sliderContainer = document.querySelector(".slider-container");
const dotContainer = document.querySelector(".dot-container");

let curProfile = 0;

// functions

const createDot = function () {
  allCards.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document.querySelectorAll(".dot").forEach(function (s) {
    s.classList.remove("dot-activated");

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("dot-activated");
  });
};

const gotoSlide = function (slide) {
  allCards.forEach(function (s, i) {
    s.style.transform = `translateX(${150 * (i - slide)}%)`;
  });
};

const init = function () {
  gotoSlide(0);
  createDot();
  activateDot(0);
};
init();

const nextSlide = function () {
  if (curProfile == allCards.length - 1) {
    curProfile = 0;
  } else {
    curProfile++;
  }
  gotoSlide(curProfile);

  // activate the slide
  activateDot(curProfile);
};

const prevSlide = function () {
  if (curProfile == 0) {
    curProfile = allCards.length - 1;
  } else {
    curProfile--;
  }
  gotoSlide(curProfile);

  // activate the slide
  activateDot(curProfile);
};
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// adding events to dot (using event delegation)

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});

// changing slide with arrow buttons

window.addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight") nextSlide();
  e.key == "ArrowLeft" && prevSlide();
});
