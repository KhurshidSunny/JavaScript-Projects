const playerIconContainer = document.querySelector(".player-icons");
const computerIconsEl = document.querySelectorAll(".com-icon");
const playerScoreEl = document.querySelector(".player-score");
const playerOptEl = document.querySelector(".player-option");
const comScoreEl = document.querySelector(".com-score");
const comOptEl = document.querySelector(".com-option");
const winText = document.querySelector(".win-text");
const repeatBtn = document.querySelector(".repeat-btn");

const gameOptions = ["rock", "paper", "scissor"];
let comScore = 0;
let playerScore = 0;

const resetGame = function () {
  playerScoreEl.textContent = "";
  comScoreEl.textContent = "";
  playerOptEl.textContent = "";
  comOptEl.textContent = "";
  winText.textContent = "";

  playerIconContainer.querySelectorAll(".icon").forEach((opt, i) => {
    opt.classList.remove("selected");
    computerIconsEl[i].classList.remove("selected");
  });
};

resetGame();
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
    if (playerOption === computerOption) {
      winText.textContent = "It's Tie";
    } else if (playerOption === "rock" && computerOption === "scissor") {
      event.classList.add("selected");
      playerScore++;
    } else if (playerOption === "scissor" && computerOption === "paper") {
      playerScore++;
      winText.textContent = "You win";
    } else if (playerOption === "paper" && computerOption === "rock") {
      playerScore++;
      winText.textContent = "You win";
    } else {
      comScore++;
      winText.textContent = "Computer win";
    }

    playerScoreEl.textContent = playerScore;
    comScoreEl.textContent = comScore;
    playerOptEl.textContent = playerOption;
    comOptEl.textContent = computerOption;
  }
});

repeatBtn.addEventListener("click", resetGame);
