"use strict";

const secretNumBox = document.querySelector(".secret-num-box");
const btnOptions = document.querySelectorAll(".btn-num-options");
const message = document.querySelector(".message");
const numInput = document.querySelector(".num-input");
const btnCheck = document.querySelector(".btn-check");
const btnReset = document.querySelector(".btn-reset");
const currentScore = document.querySelector(".currentScore");
const highScoreDisplay50 = document.querySelector(".highscore50");
const highScoreDisplay100 = document.querySelector(".highscore100");
const highScoreDisplay1000 = document.querySelector(".highscore1000");
//const btnHint = document.querySelector(".btn-hint");

let secretNum;
let rangeNum;
let score = 20;
let highScore50 = 0;
let highScore100 = 0;
let highScore1000 = 0;

function getRandomNum(num) {
  return Math.trunc(Math.random() * num + 1);
}

function btnOption(num) {
  return getRandomNum(num);
}

function getGuess() {
  return Number(numInput.value);
}

function checkLose() {
  subtractScore();
  if (score === 0) {
    btnCheck.disabled = true;
    message.textContent = "You have lost! Whomp! Whomp!";
    document.querySelector("body").style.backgroundColor = "rgb(105, 47, 47)";
    secretNumDisplay();
  }
}

function subtractScore() {
  score--;
  currentScore.textContent = score;
}

function winDisplay() {
  if (rangeNum === 50) {
    if (score > highScore50) highScore50 = score;
    highScoreDisplay50.textContent = highScore50;
  }
  if (rangeNum === 100) {
    if (score > highScore100) highScore100 = score;
    highScoreDisplay100.textContent = highScore100;
  }
  if (rangeNum === 1000) {
    if (score > highScore1000) highScore1000 = score;
    highScoreDisplay1000.textContent = highScore1000;
  }
  btnCheck.disabled = true;
  document.querySelector("body").style.backgroundColor = "green";
  secretNumDisplay();
}

function secretNumDisplay() {
  if (secretNum > 99 && secretNum < 1000) secretNumBox.style.width = "220px";
  if (secretNum === 1000) secretNumBox.style.width = "260px";
  secretNumBox.textContent = secretNum;
}

btnOptions.forEach((button) => {
  button.onclick = function () {
    rangeNum = Number(button.dataset.num);
    secretNum = btnOption(Number(button.dataset.num));
    message.textContent = `Choose a number between 1 and ${button.dataset.num}`;
    btnOptions.forEach((buttonClicked) => {
      buttonClicked.disabled = true;
      if (Number(button.dataset.num) === Number(buttonClicked.dataset.num)) {
        buttonClicked.classList = "btn-num-options-chosen";
      }
    });
    btnCheck.disabled = false;
    // Give hint for testing
    //btnHint.textContent = secretNum;
  };
});

btnCheck.disabled = true;

btnCheck.onclick = function () {
  const guess = getGuess();
  if (!guess || guess < 1 || guess > rangeNum) {
    message.textContent = "Please enter a valid number!";
  } else if (guess !== secretNum) {
    message.textContent =
      guess > secretNum
        ? `📈 ${guess} is Too High 📈`
        : `📉 ${guess} is Too Low 📉`;
    checkLose();
  } else if (guess === secretNum) {
    message.textContent = "You Won!";
    winDisplay();
  }
};

btnReset.onclick = function () {
  score = 20;
  currentScore.textContent = score;
  secretNumBox.style.width = "135px";
  secretNumBox.textContent = "?";
  //btnHint.textContent = "(Hint)";
  document.querySelector("body").style.backgroundColor = "rgb(53, 43, 43)";
  btnOptions.forEach((button) => {
    button.disabled = false;
    button.classList = "btn-num-options";
  });
  message.textContent = "Start guessing by choosing a number range...";
};
