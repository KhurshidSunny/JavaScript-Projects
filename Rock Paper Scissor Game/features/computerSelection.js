const computerIconsEl = document.querySelectorAll(".com-icon");

const gameOptions = ["rock", "paper", "scissor"];

export const computerSelection = function () {
  const randInt = Math.floor(Math.random() * 3);
  const comOpt = gameOptions[randInt];

  computerIconsEl.forEach((opt) => {
    if (comOpt === opt.dataset.comOption) {
      opt.classList.add("selected");
    }
  });
  return comOpt;
};
