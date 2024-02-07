const starContainer = document.querySelector(".stars");
const ratingTextEl = document.querySelector(".rating-text");

const stars = document.querySelectorAll(".icon");
const starsText = [
  "Poor  😞 ",
  "Below Average 😐",
  "Average 🙂",
  "Good 😊",
  "Excellent 😃",
];

// applying event handler on all stars using Event Deligation
let activeMouseover = false;
const checkRating = function (no, color, event = false) {
  starsText.forEach((st, i) => {
    if (no === i) {
      if (color === "yellow") ratingTextEl.textContent = st;
      else ratingTextEl.textContent = "Rate us 😍";
    }
  });
  for (let i = 0; i <= no; i++) {
    if (color === "yellow" && event === "click") {
      stars[i].style.color = color;
      activeMouseover = false;
    } else if (color === "yellow" && event === "mouseover") {
      stars[i].style.color = color;
      activeMouseover = true;
    } else if (color === "white" && event === "mouseout" && activeMouseover) {
      stars[i].style.color = color;
    }
  }
};

// hovering the mouse on star
starContainer.addEventListener("mouseover", function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);
  if (event.classList.contains("icon")) {
    checkRating(star, "yellow", "mouseover");
  }
});

// leaving the mouse from the star
starContainer.addEventListener("mouseout", function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);

  if (event.classList.contains("icon")) {
    checkRating(star, "white", "mouseout");
  }
});

// click event on each star
starContainer.addEventListener("click", function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);

  if (event.classList.contains("icon")) {
    checkRating(star, "yellow", "click");
  }
});
