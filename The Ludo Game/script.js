'use strict';

// selecing elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let scores, activePlayer, currentScore, isPlaying;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // Remove the dice
  diceEl.classList.add('hidden');

  // remove the winner if there is
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // make the player 1 active by default
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// New Game or reset the game funtion
btnNew.addEventListener('click', init);

// Roll dice function
function rollDice() {
  if (isPlaying) {
    // 1: Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for 1
    if (dice !== 1) {
      currentScore += dice;
      // 2. select element dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
}

function holdScore() {
  if (isPlaying) {
    // 1: Add current score to the total score of the active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2: check if the palyer reaches 100 and wins
    if (scores[activePlayer] >= 100) {
      // Finish the game
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // hide the dice
      diceEl.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
    }
  }
}

btnRoll.addEventListener('click', rollDice);

btnHold.addEventListener('click', holdScore);
