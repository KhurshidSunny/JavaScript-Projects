const passInputEl = document.querySelector(".pass-input");
const settingContainer = document.querySelector(".setting-box");
const generatPassBtn = document.querySelector(".btn-generate-pass");
const lowercaseCheck = document.querySelector("#lowercase");

// const generateLower = function (min, max) {
//   const rand = Math.floor(Math.random() * (max - min + 1) + min);
//   let char = String.fromCharCode(rand);
//   lower += char;
// };

const randInt = function (min, max) {
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
};

const lengthArr = [0, 0, 0, 0];
let password = [];
const generateRandChar = function (min, max) {
  password = [];
  let len = password.length;

  while (len < 15) {
    let rand = randInt(min, max);
    let char = String.fromCharCode(rand);

    console.log("loop run");
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
      lengthArr[2] < 2
    ) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[2]++;
    }

    // uppercase
    else if (rand >= 65 && rand <= 90 && lengthArr[3] <= 3) {
      // char = String.fromCharCode(rand);
      password.push(char);
      lengthArr[3]++;
    }
    len = password.length;
  }

  return password;
};

// const ans = generateRandChar(33, 122);
// const str = ans.join("");
// console.log(str);

const displayPassword = function () {
  const ans = generateRandChar(33, 122);
  const str = ans.join("");

  passInputEl.value = str;
};

// lowercaseCheck.addEventListener("change", function () {
//   displayPassword();
// console.log(this);
// if (this.checked) {
//   this.disabled = true;
// }
// });
/*

Asscii for symbols
!=33
$=36
-=45
+=43
^=94



numbers (0-9) = (48-57)
*/

generatPassBtn.addEventListener("click", displayPassword);

settingContainer.addEventListener("change", function (e) {
  const event = e.target;
  if (event.classList.contains("set")) {
    const { settingType } = event.dataset;
    if (settingType === lowercase) {
      const lower = password.filter((char) => {});
    }
  }
});
