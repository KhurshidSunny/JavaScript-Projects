// Selectors

const btnContinue = document.querySelector(".continue-btn");
const btnNext = document.querySelector(".next-btn");

const rulesContainer = document.querySelector(".rules-section");
const quizContainer = document.querySelector(".quiz-section");

const allOptions = document.querySelectorAll(".option");
const questionElement = document.querySelector(".question");
const totalQElement = document.querySelectorAll(".total-question");
const correctAnsElement = document.querySelector(".correct-answers");
const curQuestionElement = document.querySelector(".current-question");
const allCircles = document.querySelectorAll(".circle");

const rewardContainer = document.querySelector(".reward-section");

let curQuestion = 1;
let correctAnswersDone = 0;

const allQuestions = [
  {
    question:
      "1. What is the purpose of the addEventListener method in JavaScript?",
    options: {
      optionA: "A) To create a new event",
      optionB: "B) To attach an event handler function to an HTML element",
      optionC: "C) To remove an event listener",
      optionD: "D) To modify the event propagation",
    },
    correctAnswer: "A) To create a new event",
  },

  {
    question:
      "2. What does the typeof operator in JavaScript return for an array?",
    options: {
      optionA: "A) object",
      optionB: "B) array",
      optionC: "C) undefined",
      optionD: "D) function",
    },
    correctAnswer: "A) object",
  },

  {
    question: "3. Which keyword is used to declare variables in JavaScript?",
    options: {
      optionA: "A) var",
      optionB: "B) let",
      optionC: "C) const",
      optionD: "D) all of the above",
    },
    correctAnswer: "D) all of the above",
  },

  {
    question:
      '4. What does the function greet(name = "Guest") in the following JavaScript code signify?',
    options: {
      optionA: 'A) It initializes a variable named "name"',
      optionB: "B) It defines a function with a default parameter",
      optionC: 'C) It declares a constant named "name"',
      optionD: "D) It is an error in JavaScript syntax",
    },
    correctAnswer: "B) It defines a function with a default parameter",
  },
];

const numOfQuestions = allQuestions.length;

// Continue handler
btnContinue.addEventListener("click", function () {
  rulesContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
});

// reseting all the options
const resetOptions = function () {
  allOptions.forEach((opt, i) => {
    opt.classList.remove("option-green", "option-red");
    allCircles[i].classList.remove("circle-green", "circle-red");
  });
};

const optionsContainer = document.querySelector(".options");

const optionSelection = function (e) {
  const event = e.target;

  const optionElement = event.closest(".option");
  if (!optionElement) return;
  const { optionNo } = optionElement.dataset;
  const selectedOption = allOptions[optionNo].querySelector("p").textContent;
  const correctAns = allQuestions[curQuestion - 1].correctAnswer;

  if (correctAns === selectedOption) {
    correctAnswersDone++;
    console.log(correctAnswersDone);
    optionElement.classList.add("option-green");
    allCircles[optionNo].classList.add("circle-green");
  } else {
    allOptions.forEach((opt, i) => {
      if (opt.querySelector("p").textContent === correctAns) {
        opt.classList.add("option-green");
        allCircles[i].classList.add("circle-green");
      }
      opt.classList.add("option-red");
      allCircles[i].classList.add("circle-red");
    });
  }
};
optionsContainer.addEventListener("click", optionSelection);

// initial values
const initializer = function (nextQuestion = 0) {
  const { question, options, correctAnswer } = allQuestions[nextQuestion];
  const optionsArray = Object.values(options);

  allOptions.forEach((opt, i) => {
    opt.querySelector("p").textContent = optionsArray[i];
  });

  questionElement.textContent = question;

  curQuestionElement.textContent = nextQuestion + 1;
  totalQElement.forEach((q) => (q.textContent = numOfQuestions));
};
initializer();

const renderQuestion = function (nextQuestion) {
  if (curQuestion == numOfQuestions) {
    quizContainer.classList.add("hidden");
    rewardContainer.classList.remove("hidden");
    correctAnsElement.textContent = correctAnswersDone;
  }
  curQuestion++;
  if (curQuestion - 1 === numOfQuestions) return;
  initializer(nextQuestion);
  resetOptions();
};

// Next button handler
btnNext.addEventListener("click", function () {
  renderQuestion(curQuestion);
});
