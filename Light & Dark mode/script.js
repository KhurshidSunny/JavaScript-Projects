const toggleButton = document.querySelector(".toggle-button");
const toggleBtnContainer = document.querySelector(".toggle-container");
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--primary-color");

const images = document.querySelectorAll(".image-container img");

let flag = true;
const toggle = function () {
  if (flag) {
    toggleButton.classList.add("turn-on");
    toggleBtnContainer.style.backgroundColor = `${primaryColor}`;

    document.documentElement.setAttribute("data-theme", "dark");

    images.forEach((img, i) => (img.src = `img/img-dark-${i}.svg`));

    flag = false;
  } else {
    toggleButton.classList.remove("turn-on");
    toggleBtnContainer.style.backgroundColor = `rgb(203, 199, 199)`;

    document.documentElement.setAttribute("data-theme", "light");

    images.forEach((img, i) => (img.src = `img/img-light-${i}.svg`));
    flag = true;
  }
};
toggleButton.addEventListener("click", toggle.bind(flag));
