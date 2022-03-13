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

const startingPostions = function () {
  // Current score for players
  currentScore = 0;
  // final or saved scores for player 1 and 2
  totalScores = [0, 0];
  // At the beggining Active player is the one at postion 0
  activePlayer = 0;
  // I will use this to stop game from continue after player reaches >= 100
  playing = true;
  score1.textContent = 0;
  score2.textContent = 0;
  currentPlayerScore1.textContent = 0;
  currentPlayerScore2.textContent = 0;
  // Remove player--winner class
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  // Starting player is always player 1
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
startingPostions();

// Switching the player funcionality
const switchPlayer = function () {
  // Selecting current player and setting his current score  to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Determing who is active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Setting current score to 0
  currentScore = 0;
  // Removing and adding player active class to current player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Hide dice Photo at the Start
dicePhoto.style.display = 'none';

// Adding event listener to dice roll button
rollDice.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    // Display photo of dice equal to random dice roll number
    dicePhoto.src = `dice-${randomDice}.png`;
    dicePhoto.style.display = 'block';

    // Implementing game logic
    // What happens if we roll 2, 3, 4, 5 ,6 (randomDice !== 1) not 1
    if (randomDice !== 1) {
      // Adding value of random dice to current score
      currentScore += randomDice;
      // Adding current score to current player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If we roll one  SwitchPlayer
      switchPlayer();
    }
  }
});

// Adding event listener to hold button
holdBtn.addEventListener('click', function () {
  if (playing) {
    // Add current score of active player to total score of active player
    totalScores[activePlayer] += currentScore;
    // And displaying that score
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // Check if player reached 100, and if he did, he won!
    if (totalScores[activePlayer] >= 100) {
      // Stop funcionality of all buttons
      playing = false;
      // Adding winning class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // Switch player if he didnt reach 100
      switchPlayer();
    }
  }
});
// Adding event listener to Restart button
restartBtn.addEventListener('click', startingPostions);
