const starContainer = document.querySelector(".stars");
const ratingTextEl = document.querySelector(".rating-text");
const stars = document.querySelectorAll(".icon");
const btnPost = document.querySelector(".btn-post");
const ratingPopup = document.querySelector(".rating-popup");
const appContainer = document.querySelector(".app-container");

const btnEdit = document.querySelector(".btn-edit");

const starsText = [
  "Poor  😞 ",
  "Below Average 😐",
  "Average 🙂",
  "Good 😊",
  "Excellent 😃",
];

let activeMouseover = false;
const giveRating = function (no, color, event) {
  // showing each rating description
  starsText.forEach((st, i) => {
    if (no === i) {
      if (color === "yellow") {
        ratingTextEl.textContent = st;
      }
      // showing the rating description
      else if (color === "white" && activeMouseover) {
        ratingTextEl.textContent = "Rate us 😍";
      }
    }
  });

  for (let i = 0; i <= no; i++) {
    // for clicking on the star
    if (color === "yellow" && event === "click") {
      stars[i].style.color = color;
      ratingTextEl.textContent = starsText[i];
      activeMouseover = false;
    }

    // hovering mouse on star
    else if (color === "yellow" && event === "mouseover") {
      stars[i].style.color = color;
      activeMouseover = true;
    }

    // for mouse out from star
    else if (color === "white" && event === "mouseout" && activeMouseover) {
      stars[i].style.color = color;
    }
  }
};

// mouseover handler
const mouseoverHandler = function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);
  if (event.classList.contains("icon")) {
    giveRating(star, "yellow", "mouseover");
  }
};

// mouseoutHanlder
const mouseoutHandler = function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);

  if (event.classList.contains("icon")) {
    giveRating(star, "white", "mouseout");
  }
};

// click handler
const clickHandler = function (e) {
  const event = e.target;
  const star = Number(event.dataset.star);

  if (event.classList.contains("icon")) {
    giveRating(star, "yellow", "click");
  }
};

// hovering the mouse on star
starContainer.addEventListener("mouseover", mouseoverHandler);
// leaving the mouse from the star
starContainer.addEventListener("mouseout", mouseoutHandler);
// click  on each star
starContainer.addEventListener("click", clickHandler);

// post the rating
btnPost.addEventListener("click", function () {
  appContainer.classList.add("hidden");
  ratingPopup.classList.remove("hidden");
});

// edit button
btnEdit.addEventListener("click", function () {
  ratingPopup.classList.add("hidden");
  appContainer.classList.remove("hidden");
});
