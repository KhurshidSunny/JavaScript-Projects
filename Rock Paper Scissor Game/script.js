const playerIconContainer = document.querySelector(".player-icons");
const computerIconsEl = document.querySelectorAll(".com-icon");

const gameOptions = ["rock", "paper", "scissor"];

const computerSelection = function () {
  const randInt = Math.floor(Math.random() * 3);
  const comOption = gameOptions[randInt];
  computerIconsEl.forEach((opt) => {
    if (comOption === opt.dataset.comOption) {
      opt.classList.add("selected");
    }
  });
  return comOption;
};

playerIconContainer.addEventListener("click", function (e) {
  const event = e.target;
  if (event.classList.contains("icon")) {
    const { option: playerOption } = event.dataset;
    playerIconContainer.querySelectorAll(".icon").forEach((opt, i) => {
      opt.classList.remove("selected");
      computerIconsEl[i].classList.remove("selected");
    });

    if (playerOption === "rock") event.classList.add("selected");
    if (playerOption === "paper") event.classList.add("selected");
    if (playerOption === "scissor") event.classList.add("selected");

    const computerOption = computerSelection();
    if (playerOption === "rock" && computerOption === "scissor") {
      event.classList.add("selected");
    } else if (playerOption === "scissor" && computerOption === "paper") {
      console.log("player win");
    } else if (playerOption === "paper" && computerOption === "rock") {
      console.log("player win");
    } else console.log("computer win");
  }
});
