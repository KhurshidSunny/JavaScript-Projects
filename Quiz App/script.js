// Selectors

const btnContinue = document.querySelector(".continue-btn");
const btnNext = document.querySelector(".next-btn");

const rulesContainer = document.querySelector(".rules-section");
const quizContainer = document.querySelector(".quiz-section");

const allOptions = document.querySelectorAll(".options p");
const questionElement = document.querySelector(".question");
const totalQElement = document.querySelectorAll(".total-question");
const correctAnsElement = document.querySelector(".correct-answers");
const curQuestionElement = document.querySelector(".current-question");

let curQuestion = 0;

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
    correctAnswer: "A",
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
    correctAnswer: "A",
  },

  {
    question: "3. Which keyword is used to declare variables in JavaScript?",
    options: {
      optionA: "A) var",
      optionB: "B) let",
      optionC: "C) const",
      optionD: "D) all of the aboven",
    },
    correctAnswer: "D",
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
    correctAnswer: "B",
  },
];

const numOfQuestions = allQuestions.length;

// Continue handler
btnContinue.addEventListener("click", function () {
  rulesContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
});

const optionsContainer = document.querySelector(".options");
optionsContainer.addEventListener("click", function (e) {
  const event = e.target;
  const onlyOption = optionsContainer.closest(".option");
  const optionElement = event.closest(".option");
  if (!optionElement) return;
  const { optionNo } = optionElement.dataset;
});

// initial values
const initializer = function (nextQuestion) {
  const {
    question,
    options: { optionA, optionB, optionC, optionD },
    correctAnswer,
  } = allQuestions[nextQuestion];

  questionElement.textContent = question;
  allOptions[0].textContent = optionA;
  allOptions[1].textContent = optionB;
  allOptions[2].textContent = optionC;
  allOptions[3].textContent = optionD;
  curQuestionElement.text = 35;
  curQuestionElement.textContent = 2;
  totalQElement.forEach((q) => (q.textContent = numOfQuestions));
};

const renderQuestion = function (nextQuestion) {
  initializer(nextQuestion);
  curQuestion++;
};

// Next button handler
btnNext.addEventListener("click", function () {
  renderQuestion(curQuestion);
});
