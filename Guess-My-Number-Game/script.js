'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const message = document.querySelector('.message');
const guessNumber = document.querySelector('.guess');
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

function resetGame() {
  checkButton.disabled = false;
  checkButton.style.cursor = 'pointer';
  number.textContent = '?';
  message.textContent = 'start guessing...';
  guessNumber.value = '';
  currentScore = 20;
  score.innerHTML = 0;
  highscore.innerHTML = currentHighScore;
  document.body.style = '#222';
}

function eventHandler() {
  const randomNumberCheck = generateRandomNumber();
  guessNumber.value = randomNumberCheck;
  const randomNumberCorrect = generateRandomNumber();
  randomNumberCheck === randomNumberCorrect
    ? (number.innerHTML = randomNumberCorrect)
    : '?';

  if (randomNumberCheck !== randomNumberCorrect) {
    currentScore--;
  } else {
    currentHighScore > currentScore
      ? (currentHighScore = currentHighScore)
      : (currentHighScore = currentScore);
  }

  const differnce = randomNumberCheck - randomNumberCorrect;
  if (differnce > 4) {
    message.textContent = 'Too High';
  } else if (differnce === 0) {
    message.textContent = 'Correct Number';
    document.body.style.backgroundColor = '#60b347';
    checkButton.disabled = true;
    checkButton.style.cursor = 'none';
  } else if (differnce < 4 && differnce !== 0) {
    message.textContent = 'Too Low';
  }

  score.innerHTML = currentScore;
  highscore.innerHTML = currentHighScore;
}

checkButton.addEventListener('click', eventHandler);
againButton.addEventListener('click', resetGame);
