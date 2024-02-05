const allOptions = document.querySelectorAll(".option");
const allCircles = document.querySelectorAll(".circle");
const resetOptions = function (nextQuestionGo) {
  allOptions.forEach((opt, i) => {
    opt.classList.remove("option-green", "option-red");
    allCircles[i].classList.remove("circle-green", "circle-red");
  });
  nextQuestionGo = false;
};
export { resetOptions, allOptions, allCircles };
