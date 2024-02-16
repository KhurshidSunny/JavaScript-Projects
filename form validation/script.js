const nameInputEl = document.querySelector("#full-name");
const phoneInputEl = document.querySelector("#phone-number");
const emailInputEl = document.querySelector("#email-address");
const websiteInputEl = document.querySelector("#website-url");
const passwordInputEl = document.querySelector("#password");
const confirmPasswordInputEl = document.querySelector("#confirm-password");
const registerBtn = document.querySelector(".register-btn");
const allInputs = document.querySelectorAll(".input");
const form = document.querySelector("#form");

// let fullName = "";
// let phoneNo = "";
// let email = "";
// let websiteUrl = "";
// let password = "";
// let confirmPassword = "";

const validated = function (element) {
  element.classList.remove("border-red");
  element.classList.add("border-green");
};

const inValidate = function (element) {
  element.classList.remove("border-green");
  element.classList.add("border-red");
};

const validateName = function (name, element) {
  if (name.length >= 6) validated(element);
  else inValidate(element);
};
const validatePhone = function (phNumber, element) {
  const digitRegex = /^[0-9]+$/;
  if (digitRegex.test(phNumber) && phNumber.length === 11) validated(element);
  else inValidate(element);
};

const validateEmail = function (email, element) {
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  if (email.length >= 5 && regex.test(email)) validated(element);
  else inValidate(element);
};

const validateWebsiteUrl = function (url, element) {
  if (url.startsWith("https//:") && url.length >= 12) validated(element);
  else inValidate(element);
};

let passwordGlob = "";

const validatePassword = function (password, element) {
  passwordGlob = password;
  const regexSymbol = /[\!\@\#\$\%\^\&\*\+]/;
  const regexNumber = /[0-9]/;
  if (
    password.length >= 4 &&
    regexSymbol.test(password) &&
    regexNumber.test(password)
  ) {
    validated(element);
  } else inValidate(element);
};

const validateConfirmPassword = function (pass, element) {
  if (pass === passwordGlob) validated(element);
  else inValidate(element);
};

form.addEventListener("input", function (e) {
  const event = e.target;
  if (event.classList.contains("input")) {
    const { input } = event.dataset;

    // validdating name
    if (input === "name") validateName(event.value, event);

    // validating phone number
    if (input === "phone") validatePhone(event.value, event);

    // validating email address
    if (input === "email") validateEmail(event.value, event);

    // validating website url
    if (input === "website") validateWebsiteUrl(event.value, event);

    // validating password
    if (input === "password") validatePassword(event.value, event);

    // validating cofirm password
    if (input === "confirm-password")
      validateConfirmPassword(event.value, event);
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
