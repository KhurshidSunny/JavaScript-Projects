const nameInputEl = document.querySelector("#full-name");
const phoneInputEl = document.querySelector("#phone-number");
const emailInputEl = document.querySelector("#email-address");
const websiteInputEl = document.querySelector("#website-url");
const passwordInputEl = document.querySelector("#password");
const confirmPasswordInputEl = document.querySelector("#confirm-password");
const registerBtn = document.querySelector(".register-btn");
const allInputs = document.querySelectorAll(".input");
const formContainer = document.querySelector(".app-container");
const form = document.querySelector("#form");
const submitWindow = document.querySelector(".success-msg-container");

let fullName = "";
let phoneNo = "";
let emailAdd = "";
let websiteUrl = "";
let password = "";
let confirmPassword = "";

const validated = function (element) {
  element.classList.remove("border-red");
  element.classList.add("border-green");
};

const inValidate = function (element) {
  element.classList.remove("border-green");
  element.classList.add("border-red");
};

const validateName = function (name, element) {
  fullName = name;
  if (name.length >= 6) {
    validated(element);
    return true;
  } else {
    inValidate(element);
    return false;
  }
};
const validatePhone = function (phNumber, element) {
  phoneNo = phNumber;
  const digitRegex = /^[0-9]+$/;
  if (digitRegex.test(phNumber) && phNumber.length === 11) {
    validated(element);
    return true;
  } else {
    inValidate(element);
    return false;
  }
};

const validateEmail = function (email, element) {
  emailAdd = email;
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  if (email.length >= 5 && regex.test(email)) {
    validated(element);
    return true;
  } else {
    inValidate(element);
    return false;
  }
};

const validateWebsiteUrl = function (url, element) {
  websiteUrl = url;
  if (url.startsWith("https//:") && url.length >= 12) {
    validated(element);
    return true;
  } else {
    inValidate(element);
    return false;
  }
};

const validatePassword = function (pass, element) {
  password = pass;
  const regexSymbol = /[\!\@\#\$\%\^\&\*\+]/;
  const regexNumber = /[0-9]/;
  if (pass.length >= 4 && regexSymbol.test(pass) && regexNumber.test(pass)) {
    {
      validated(element);
      return true;
    }
  } else {
    inValidate(element);
    return false;
  }
};

const validateConfirmPassword = function (pass, element) {
  confirmPassword = pass;
  if (pass === password && pass.length >= 4) {
    validated(element);
    return true;
  } else {
    inValidate(element);
    return false;
  }
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
  const nameValidate = validateName(fullName, allInputs[0]);
  const phoneValidate = validatePhone(phoneNo, allInputs[1]);
  const emailValidate = validateEmail(emailAdd, allInputs[2]);
  const urlValidate = validateWebsiteUrl(websiteUrl, allInputs[3]);
  const passValidate = validatePassword(password, allInputs[4]);
  const confirmPassValidate = validateConfirmPassword(
    confirmPassword,
    allInputs[5]
  );

  if (nameValidate);
  if (phoneValidate);
  if (emailValidate);
  if (urlValidate);
  if (passValidate);
  if (confirmPassValidate);

  const user = {
    fullName,
    phoneNo,
    emailAdd,
    websiteUrl,
  };

  if (
    nameValidate &&
    phoneValidate &&
    emailValidate &&
    urlValidate &&
    passValidate &&
    confirmPassValidate
  ) {
    formContainer.classList.add("hidden");
    submitWindow.classList.remove("hidden");
  }

  console.log(user);
});
