////// import

import {
  stopConfetti,
  stopConfettiInner,
  startConfetti,
  removeConfetti,
  removeConfettiInner,
} from "./confetti.js";
import { removeSelectedOptins } from "./features/removeSelectedOptions.js";
import { resetGame } from "./features/resetGame.js";
import { playerSelectionOption } from "./features/playerSelectionOption.js";
import { winAndLose } from "./features/winAndLose.js";
import { displayScoreAndOption } from "./features/displayScoreAndOption.js";
import { computerSelection } from "./features/computerSelection.js";

const playerIconContainer = document.querySelector(".player-icons");
const computerIconsEl = document.querySelectorAll(".com-icon");
const playerScoreEl = document.querySelector(".player-score");
const playerOptEl = document.querySelector(".player-option");
const comScoreEl = document.querySelector(".com-score");
const comOptEl = document.querySelector(".com-option");
const winText = document.querySelector(".win-text");
const repeatBtn = document.querySelector(".repeat-btn");

const gameOptions = ["rock", "paper", "scissor"];

// FUNCTIONS AND HANDLERS

// Removing all the options which are selected
removeSelectedOptins();

// reseting the game
resetGame();

// Displaying score, options etc
displayScoreAndOption();

// EVENT LISTNERS
playerIconContainer.addEventListener("click", function (e) {
  const event = e.target;
  if (event.classList.contains("icon")) {
    const { option: playerOption } = event.dataset;
    const computerOption = computerSelection();
    removeSelectedOptins();
    playerSelectionOption(playerOption, event);
    winAndLose(playerOption, computerOption);
    displayScoreAndOption(playerOption, computerOption);
  }
});

repeatBtn.addEventListener("click", resetGame);
