const passInputEl = document.querySelector(".pass-input");
const settingContainer = document.querySelector(".setting-box");
const generatPassBtn = document.querySelector(".btn-generate-pass");
const lowercaseCheck = document.querySelector("#lowercase");

let password = "";

lowercaseCheck.addEventListener("change", function () {
  generateRandpass();
  //   console.log(this);
  if (this.checked) {
    this.disabled = true;
  }
});

const randPass = function (min, max) {
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  let char = String.fromCharCode(rand);
  return char;
};

const generateRandpass = function () {
  for (let i = 0; i <= 6; i++) {
    const ans = randPass(97, 122);
    password += ans;
    passInputEl.value = password;
  }
};

generatPassBtn.addEventListener("click", generateRandpass);

settingContainer.addEventListener("change", function (e) {
  const event = e.target;
  if (event.classList.contains("set")) {
  }
});
