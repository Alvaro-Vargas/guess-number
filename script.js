'use strict';

//State Variables
let secretNumber;
let score = 20;
let highscore = 0;

const newSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

newSecretNumber();

//Page Elements
const pageNumber = document.querySelector('.number');
const pageBody = document.querySelector('body');

//Game functions
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function newGame() {
  newSecretNumber();
  score = 20;

  pageNumber.textContent = '?';
  pageNumber.style.width = '15rem';

  pageBody.style.backgroundColor = '#222';

  displayMessage('Start guessing again!');

  document.querySelector('.score').textContent = score;

  document.querySelector('.guess').value = '';
}

function checkNumber(guess) {
  if (!guess) {
    displayMessage('⛔️ No Number!');
  } else if (guess === secretNumber) {
    displayMessage('🎖 Correct Number');

    pageNumber.textContent = secretNumber;
    pageNumber.style.width = '30rem';

    pageBody.style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '🥵 Too high!' : '🥶 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('😵 You Lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
}

// Event Listeners
document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  checkNumber(guess);
});

document.querySelector('.again').addEventListener('click', newGame);
