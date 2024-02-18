export const playerSelectionOption = function (playerOption, event) {
  if (playerOption === "rock") event.classList.add("selected");
  if (playerOption === "paper") event.classList.add("selected");
  if (playerOption === "scissor") event.classList.add("selected");
};
