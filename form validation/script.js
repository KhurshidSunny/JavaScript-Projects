const nameInputEl = document.querySelector("#full-name");
const phoneInputEl = document.querySelector("#phone-number");
const emailInputEl = document.querySelector("#email-address");
const websiteInputEl = document.querySelector("#website-url");
const passwordInputEl = document.querySelector("#password");
const confirmPasswordInputEl = document.querySelector("#confirm-password");
const registerBtn = document.querySelector(".register-btn");
const allInputs = document.querySelectorAll(".input");
const form = document.querySelector("#form");

let fullName = "";
let phoneNo = "";
let email = "";
let websiteUrl = "";
let password = "";
let confirmPassword = "";

const Validated = function () {
  nameInputEl.classList.remove("border-red");
  nameInputEl.classList.add("border-green");
};

const inValidate = function () {
  nameInputEl.classList.remove("border-green");
  nameInputEl.classList.add("border-red");
};

const validateName = function (name) {
  if (name.length >= 6) Validated();
  else inValidate();
};

form.addEventListener("input", function (e) {
  const event = e.target;
  if (event.classList.contains("input")) {
    const { input } = event.dataset;

    // let inputValue = event.value;
    if (input === "name") validateName(event.value);

    // if (input === "phone" && inputValue.length === 11) Validated();
    // else inValidate();
  }
});

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !fullName &&
    !phoneNo &&
    !email &&
    !websiteUrl &&
    !password &&
    !confirmPassword
  ) {
    // allInputs.forEach((inp) => inp.classList.add("border-red"));
  }
});
