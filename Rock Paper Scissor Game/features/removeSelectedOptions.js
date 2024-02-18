const playerIconContainer = document.querySelector(".player-icons");
const computerIconsEl = document.querySelectorAll(".com-icon");

export const removeSelectedOptins = function () {
  playerIconContainer.querySelectorAll(".icon").forEach((opt, i) => {
    opt.classList.remove("selected");
    computerIconsEl[i].classList.remove("selected");
  });
};
