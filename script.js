"use strict";

const secretNumBox = document.querySelector(".secret-num-box");
const btnOptions = document.querySelectorAll(".btn-num-options");
const message = document.querySelector(".message");
const numInput = document.querySelector(".num-input");
const btnCheck = document.querySelector(".btn-check");
const currentScore = document.querySelector(".currentScore");

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
  }
}

function subtractScore() {
  score--;
  currentScore.textContent = score;
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
    //Enable Check Button
    btnCheck.disabled = false;
    // Give hint for testing
    document.querySelector(".btn-hint").textContent = secretNum;
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
  }
};

//For displaying number
// secretNumBox.style.width = "220px";
