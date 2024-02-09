const passInputEl = document.querySelector(".pass-input");
const settingContainer = document.querySelector(".setting-box");
const generatPassBtn = document.querySelector(".btn-generate-pass");
const lowercaseCheck = document.querySelector("#lowercase");

const copyBtn = document.querySelector(".copy-icon");

const inputRangeEl = document.querySelector(".pass-len-range");
const passLengthText = document.querySelector(".length");

const passStrongBar = document.querySelector(".pass-strong");

let passLength = 8;
passLengthText.textContent = passLength;
passStrongBar.style.width = `${passLength * 5}%`;

copyBtn.addEventListener("click", function () {
  // select the text inside the input
  passInputEl.select();
  const ans = passInputEl.setSelectionRange(0, 99999);

  // copy the selected text to the clipboard
  document.execCommand("copy");
});

const randInt = function (min, max) {
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
};
let password = [];
const generateRandChar = function (min, max) {
  password = [];
  let lengthArr = [0, 0, 0, 0];
  let len = password.length;

  while (len < 15) {
    let rand = randInt(min, max);
    let char = String.fromCharCode(rand);

    // lowercase
    if (rand >= 97 && rand <= 122 && lengthArr[0] < 7) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[0]++;
    }
    // numbers
    else if (rand >= 48 && rand <= 57 && lengthArr[1] < 2) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[1]++;
    }

    // symbols
    else if (
      (rand === 32 ||
        rand === 33 ||
        rand === 36 ||
        rand === 43 ||
        rand === 45 ||
        rand === 94) &&
      lengthArr[2] <= 2
    ) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[2]++;
    }

    // uppercase
    else if (rand >= 65 && rand <= 90 && lengthArr[3] < 3) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[3]++;
    }
    len = password.length;
  }
  return password.join("");
};

const displayPassword = function () {
  const ans = generateRandChar(32, 122);
  passInputEl.value = ans;
};

const filterChar = (pass, regexPattern) =>
  pass.filter((char) => regexPattern.test(char)).join("");

const passWithoutSpaces = (pass) =>
  pass.filter((char) => char !== " ").join("");

// duplicates with filter method
// const findDuplicates = (pass) =>
//   pass.filter((char, index, passSelf) => {
//     return passSelf.indexOf(char) === index;
//   });

const passWithoutDuplicates = (pass) => {
  const ans = new Set(pass);
  return [...ans];
};

const increaseOrDecreasePassLength = function (pass) {
  const ans = pass.slice(0, passLength);
  return [...ans].join("");
};

settingContainer.addEventListener("change", function (e) {
  const event = e.target;
  let ans = "";
  if (event.classList.contains("set")) {
    const { settingType } = event.dataset;
    let eventChecked = event.checked;
    const passwordCopy = password.slice();

    if (eventChecked) {
      if (settingType === "lowercase") ans = filterChar(passwordCopy, /[a-z]/);
      else if (settingType === "uppercase")
        ans = filterChar(passwordCopy, /[A-Z]/);
      else if (settingType === "number")
        ans = filterChar(passwordCopy, /[0-9]/);
      else if (settingType === "symbol")
        ans = filterChar(passwordCopy, /[-!$^+]/g);
      else if (settingType === "space") ans = passWithoutSpaces(passwordCopy);
      else if (settingType === "duplicate")
        ans = passWithoutDuplicates(passwordCopy);
    }

    if (ans) passInputEl.value = ans;
    else passInputEl.value = passwordCopy.join("");
  }
});

inputRangeEl.addEventListener("input", function (event) {
  passLengthText.textContent = passLength;
  passStrongBar.style.width = `${passLength * 7}%`;
  const newPass = increaseOrDecreasePassLength(password);
  passInputEl.value = newPass;
  passLength = event.target.value;
  passLengthText.textContent = passLength;
});

generatPassBtn.addEventListener("click", displayPassword);
