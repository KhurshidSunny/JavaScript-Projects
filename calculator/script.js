const btnContainer = document.querySelector(".btn-container");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".arithmatic");
btnReset = document.querySelector(".reset");
btnEqual = document.querySelector(".equal");

let result = 0;

// adding events to all the button by usingn the event deligation
let num1 = "";
let num2 = "";
let operator = "";
let currentVal = "";
let flag = true;
btnContainer.addEventListener("click", function (e) {
  const event = e.target;
  if (event.classList.contains("reset")) return;
  if (event.classList.contains("equal")) return;
  if (event.classList.contains("btn")) {
    const data = event.textContent;

    currentVal += data;

    display.value = currentVal;
    if ((data >= 0 && data <= 9 && flag === true) || data === ".") {
      num1 += data;
      //   display.value = num1;
    } else if (data === "+" || data === "-" || data === "/" || data === "*") {
      operator = data;
      flag = false;
    } else {
      num2 += data;
      //   display.value = num2;
    }
  }
  // console.log(data);

  //   console.log("num1", num1);
  //   console.log("operator", operator);
  //   console.log("num2", num2);
});
btnEqual.addEventListener("click", function () {
  result = doOperation(num1, operator, num2);
  display.value = result;
  num1 = result;
  num2 = "";
  flag = false;
});

btnReset.addEventListener("click", function () {
  display.value = 0;
  num1 = "";
  num2 = "";
  result = 0;
  currentVal = "";
  operator = "";
  flag = true;
});

const add = function (a, b) {
  //   result = numbers.reduce((acc, cur) => acc + cur, 0);
  return result;
  return a + b;
};

const subtract = function (a, b) {
  //   const diff = numbers.reduce((acc, cur) => acc + cur, 0);
  //   result = result - diff;
  return a - b;
};

const multiply = function (a, b) {
  console.log();
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const doOperation = function (num1, op, num2) {
  let res;
  newNum1 = Number(num1);
  newNum2 = Number(num2);
  switch (op) {
    case "+":
      res = add(newNum1, newNum2);
      break;
    case "-":
      res = subtract(newNum1, newNum2);
      break;
    case "*":
      res = multiply(newNum1, newNum2);
      break;
    case "/":
      res = divide(newNum1, newNum2);
      break;
    default:
      res = "not a number";
  }
  return res;
};
