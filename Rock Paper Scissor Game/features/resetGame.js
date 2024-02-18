import { stopConfettiInner, removeConfettiInner } from "../confetti.js";

import { removeSelectedOptins } from "./removeSelectedOptions.js";

const playerScoreEl = document.querySelector(".player-score");
const playerOptEl = document.querySelector(".player-option");
const comScoreEl = document.querySelector(".com-score");
const comOptEl = document.querySelector(".com-option");
const winText = document.querySelector(".win-text");

export const resetGame = function () {
  stopConfettiInner();
  removeConfettiInner();
  playerScoreEl.textContent = "";
  comScoreEl.textContent = "";
  playerOptEl.textContent = "";
  comOptEl.textContent = "";
  winText.textContent = "";
  removeSelectedOptins();
};
