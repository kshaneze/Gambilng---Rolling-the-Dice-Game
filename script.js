'use strict';
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const currentPlayerScore1 = document.getElementById('current--0');
const currentPlayerScore2 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dicePhoto = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const restartBtn = document.querySelector('.btn--new');

let currentScore, totalScores, activePlayer, playing;

const restartEverything = function () {
  totalScores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;

  score1.textContent = 0;
  score2.textContent = 0;

  currentPlayerScore1.textContent = 0;
  currentPlayerScore2.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

restartEverything();

// Implementing functionality of switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
// Hide dice at the beggining
dicePhoto.style.display = 'none';

// Adding click event on roll dice button so i can implement evrerything that should happend when roll dice is clicked
rollDice.addEventListener('click', function () {
  if (playing) {
    // Generate random number between 1 and 6
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    // Display photo of dice equal to that number
    dicePhoto.src = `dice-${randomDice}.png`;
    // Show dice when button is clicked
    dicePhoto.style.display = 'block';

    // Check if that random generated number is 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Adding click event to hold button and implementing functionality
holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    totalScores[activePlayer] += currentScore;
    // Display that score
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // Check if player score is more or equal to 100;
    if (totalScores[activePlayer] >= 20) {
      playing = false;

      dicePhoto.style.display = 'none';

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

restartBtn.addEventListener('click', restartEverything);
