'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const message = document.querySelector('.message');
let guessNumberInput = document.querySelector('.guess');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');

let currentScore = Number(score.textContent);
let currentHighScore = Number(highscore.textContent);

// Generate random numbers from 1 to 20
function generateRandomNumber() {
  const randomNumber = Math.trunc(Math.random() * 20) + 1;
  return randomNumber;
}

const secretNumber = generateRandomNumber();
function resetGame() {
  checkButton.disabled = false;
  checkButton.style.cursor = 'pointer';
  number.textContent = '?';
  message.textContent = 'start guessing...';
  guessNumberInput.value = '';
  currentScore = 20;
  score.innerHTML = currentScore;
  highscore.innerHTML = currentHighScore;
  document.body.style = '#222';
}

function eventHandler() {
  const guessNumber = Number(guessNumberInput.value);

  guessNumber === secretNumber ? (number.innerHTML = secretNumber) : '?';

  // When there is No input
  if (!guessNumber) {
    message.textContent = 'No Number';
  }
  // When the the player wins the game
  else if (guessNumber === secretNumber) {
    message.textContent = 'Correct Number';
    document.body.style.backgroundColor = '#60b347';
    checkButton.disabled = true;
    checkButton.style.cursor = 'none';
    number.style.width = '30rem';
    currentHighScore > currentScore
      ? (currentHighScore = currentHighScore)
      : (currentHighScore = currentScore);
  }
  // When the guess number is different from secrent nummber
  else if (guessNumber !== secretNumber) {
    guessNumber > secretNumber
      ? (message.textContent = 'Too High')
      : (message.textContent = 'Too low');
    if (currentScore < 1) {
      message.textContent = 'You Lost the game';
      currentScore = 20;
    } else {
      currentScore--;
    }
  }

  score.innerHTML = currentScore;
  highscore.innerHTML = currentHighScore;
}

checkButton.addEventListener('click', eventHandler);
againButton.addEventListener('click', resetGame);
