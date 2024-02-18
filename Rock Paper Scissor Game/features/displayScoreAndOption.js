import { playerScore, comScore } from "./winAndLose.js";

const playerScoreEl = document.querySelector(".player-score");
const playerOptEl = document.querySelector(".player-option");
const comScoreEl = document.querySelector(".com-score");
const comOptEl = document.querySelector(".com-option");

export const displayScoreAndOption = function (playerOption, computerOption) {
  playerScoreEl.textContent = playerScore;
  comScoreEl.textContent = comScore;
  playerOptEl.textContent = playerOption;
  comOptEl.textContent = computerOption;
};
