//  SELECTORS
const toggleButton = document.querySelector(".toggle-button");
const toggleBtnContainer = document.querySelector(".toggle-container");
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--primary-color");
const modeContainer = document.querySelector(".mode");
const images = document.querySelectorAll(".image-container img");
const navBar = document.querySelector(".nav-bar");
const textBox = document.querySelector(".text-box");

// FUNCTIONS
const darkMode = function () {
  toggleButton.classList.add("turn-on");
  toggleBtnContainer.style.backgroundColor = `${primaryColor}`;
  navBar.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = `rgb(0 0 0 / 50%)`;

  document.documentElement.setAttribute("data-theme", "dark");

  images.forEach((img, i) => (img.src = `img/img-dark-${i}.svg`));
  modeContainer.children[0].textContent = "Dark Mode";
  modeContainer.children[1].classList.add("fa-moon");
};

const lightMode = function () {
  toggleButton.classList.remove("turn-on");
  toggleBtnContainer.style.backgroundColor = `rgb(203, 199, 199)`;

  document.documentElement.setAttribute("data-theme", "light");

  images.forEach((img, i) => (img.src = `img/img-light-${i}.svg`));
  modeContainer.children[0].textContent = "Light Mode";
  modeContainer.children[1].classList.remove("fa-moon");
};

let flag = true;
const toggle = function () {
  if (flag) {
    darkMode();
    flag = false;
  } else {
    flag = true;
    lightMode();
  }
};
toggleButton.addEventListener("click", toggle.bind(flag));
