const toggleButton = document.querySelector(".toggle-button");
const toggleBtnContainer = document.querySelector(".toggle-container");
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--primary-color");

let flag = true;
const toggle = function () {
  if (flag) {
    toggleButton.classList.add("turn-on");
    toggleBtnContainer.style.backgroundColor = `${primaryColor}`;
    flag = false;
  } else {
    toggleButton.classList.remove("turn-on");
    toggleBtnContainer.style.backgroundColor = `rgb(203, 199, 199)`;
    flag = true;
  }
};
toggleButton.addEventListener("click", toggle.bind(flag));
