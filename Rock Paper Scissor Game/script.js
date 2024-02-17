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

// FUNCTIONS AND HANDLERS

// Removing all the options which are selected
const removeSelectedOptins = function () {
  playerIconContainer.querySelectorAll(".icon").forEach((opt, i) => {
    opt.classList.remove("selected");
    computerIconsEl[i].classList.remove("selected");
  });
};

// reseting the game
const resetGame = function () {
  playerScoreEl.textContent = "";
  comScoreEl.textContent = "";
  playerOptEl.textContent = "";
  comOptEl.textContent = "";
  winText.textContent = "";
  removeSelectedOptins();
};
resetGame();

// option that the player will select, will be highleted
const playerSelectOption = function (playerOption, event) {
  if (playerOption === "rock") event.classList.add("selected");
  if (playerOption === "paper") event.classList.add("selected");
  if (playerOption === "scissor") event.classList.add("selected");
};

// Win and losing game rules
const winAndLose = function (playerOption, computerOption) {
  if (playerOption === computerOption) {
    winText.textContent = "It's Tie";
  } else if (playerOption === "rock" && computerOption === "scissor") {
    // event.classList.add("selected");
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
};

// Displaying score, options etc
const displayScoreAndOption = function (playerOption, computerOption) {
  playerScoreEl.textContent = playerScore;
  comScoreEl.textContent = comScore;
  playerOptEl.textContent = playerOption;
  comOptEl.textContent = computerOption;
};

// Computer selection otpion
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

// EVENT LISTNERS
playerIconContainer.addEventListener("click", function (e) {
  const event = e.target;
  if (event.classList.contains("icon")) {
    const { option: playerOption } = event.dataset;
    const computerOption = computerSelection();
    removeSelectedOptins();
    playerSelectOption(playerOption, event);
    winAndLose(playerOption, computerOption);
    displayScoreAndOption(playerOption, computerOption);
  }
});

repeatBtn.addEventListener("click", resetGame);
