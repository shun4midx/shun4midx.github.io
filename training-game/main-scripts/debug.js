/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: debug.js                           *
********************************************/

import { genQuestionOrder } from '../game/question-navigation.js';
import { updateQuestionUI } from '../game/display-question.js';

function updateScoreDisplay() {
  const score = JSON.parse(localStorage.getItem("score")) || 0; // Get the score from localStorage
  const scoreTextElement = document.getElementById("scoreText"); // Find the score element
  if (scoreTextElement) {
    scoreTextElement.textContent = score; // Update the score display
  }
}

function resetGame() {
  // Reset
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("curr_order_idx", JSON.stringify(0));
  localStorage.setItem("curr_level", JSON.stringify(1));
  localStorage.setItem("correctAnswers", JSON.stringify(0));
  
  // UI reset
  genQuestionOrder();
  updateQuestionUI();
  updateScoreDisplay();
}

function resetGameLevelUp() {
  // Reset
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("curr_order_idx", JSON.stringify(0));
  localStorage.setItem("curr_level", JSON.stringify(1));
  localStorage.setItem("correctAnswers", JSON.stringify(0));

  // Refer to game
  genQuestionOrder();
  window.location.href = `../game`;
}

window.resetGame = resetGame;
window.resetGameLevelUp = resetGameLevelUp;