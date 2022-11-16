"use strict";

const secretNumBox = document.querySelector(".secret-num-box");
const btnOptions = document.querySelectorAll(".btn-num-options");
const message = document.querySelector(".message");
const numInput = document.querySelector(".num-input");
const btnCheck = document.querySelector(".btn-check");

let secretNum;
let range;
let highScore50 = 0;
let highScore100 = 0;
let highScore1000 = 0;

function getRandomNum(num) {
  return Math.trunc(Math.random() * num + 1);
}

function btnOption(num) {
  return getRandomNum(num);
}

btnOptions.forEach((button) => {
  button.onclick = function () {
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
  if (!numInput.value || numInput.value < 1) {
    message.textContent = "Please enter a valid number!";
  }
  console.log(numInput.value);
};

//For displaying number
// secretNumBox.style.width = "220px";

// console.log(secretNum);
