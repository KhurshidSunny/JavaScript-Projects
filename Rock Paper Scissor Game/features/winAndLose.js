import { stopConfetti, removeConfetti, startConfetti } from "../confetti.js";

const winText = document.querySelector(".win-text");

let comScore = 0;
let playerScore = 0;
export const winAndLose = function (playerOption, computerOption) {
  stopConfetti();
  removeConfetti();
  if (playerOption === computerOption) {
    winText.textContent = "It's Tie";
  } else if (playerOption === "rock" && computerOption === "scissor") {
    playerScore++;
    startConfetti();
  } else if (playerOption === "scissor" && computerOption === "paper") {
    playerScore++;
    startConfetti();
    winText.textContent = "You win";
  } else if (playerOption === "paper" && computerOption === "rock") {
    playerScore++;
    startConfetti();
    winText.textContent = "You win";
  } else {
    comScore++;
    winText.textContent = "Computer win";
    stopConfetti();
    removeConfetti();
  }
};

export { playerScore, comScore };
