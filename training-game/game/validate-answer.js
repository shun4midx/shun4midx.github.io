/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: validate-answer.js                 *
********************************************/

import { questions, genQuestionOrder } from './question-navigation.js';
import { getTranslation } from '../main-scripts/naive-translation.js';
import { updateQuestionUI } from './display-question.js';

export let lastSelectedAnswer; // Declare the variable

// Validates the correct answer (huge simplification as of right now, this is just to demonstrate the sample)
function checkAnswer(selected) {
  lastSelectedAnswer = selected;
  const feedback = document.getElementById('feedback');
  const continueButton = document.getElementById('continue-button');

  const curr_question_idx = JSON.parse(localStorage.getItem("question_order"))[JSON.parse(localStorage.getItem("curr_order_idx"))];

  const currQuestion = questions[curr_question_idx];
  const correctAnswer = currQuestion.answer;

  // Get the language from Storage (or default to 'zh-tw' if not set)
  const lang = localStorage.getItem("language") || "zh-tw";

  // Deselect all first
  document.querySelectorAll('.AnswerOption').forEach(option => {
    option.classList.remove('selected');
    option.style.pointerEvents = 'none'; // disables further clicking
  });

  // Add selected class to the clicked one
  const selectedOption = document.querySelector(`.AnswerOption[onclick*="${selected}"]`);
  if (selectedOption) {
    selectedOption.classList.add('selected');
  }

  // Show it visibly and allow it to take up space
  feedback.style.display = "inline-block";
  continueButton.style.display = "inline-block";

  if (selected === correctAnswer) {
    feedback.textContent = getTranslation("correctAnswer", lang); //"✅ 正確！";
    feedback.className = "FeedbackMessage";
    feedback.style.backgroundColor = "#d4edda";
    feedback.style.color = "#155724";
    feedback.style.border = "2px solid #c3e6cb";
    updateScore(JSON.parse(localStorage.getItem("curr_level")) * 100);
    // localStorage.setItem("correctAnswers", JSON.stringify(curr_cor + 1));
    let curr_cor = parseInt(localStorage.getItem("correctAnswers")) || 0; // Convert to a number
    curr_cor += 1; // Increment
    localStorage.setItem("correctAnswers", JSON.stringify(curr_cor)); // Store as a number
  } else {
    let wrongAnswerTranslation = getTranslation("wrongAnswer", lang);//`❌ 答錯了，正確答案是 ${correctAnswer} 喔～`;
    wrongAnswerTranslation = wrongAnswerTranslation.replace("${correctAnswer}", correctAnswer);
    feedback.textContent = wrongAnswerTranslation;
    feedback.className = "FeedbackMessage";
    feedback.style.backgroundColor = "#f8d7da";
    feedback.style.color = "#721c24";
    feedback.style.border = "2px solid #f5c6cb";
  }
}

// Placeholder, may move to different file
function nextQuestion() {
  // Choose the next question
  let curr_order_idx = JSON.parse(localStorage.getItem("curr_order_idx"));
  let question_order = JSON.parse(localStorage.getItem("question_order"));
  let curr_level = JSON.parse(localStorage.getItem("curr_level"));
  let curr_cor = JSON.parse(localStorage.getItem("correctAnswers")) || 0;

  if (curr_order_idx < question_order.length - 1 && ((curr_level == 1 && curr_cor < 6) || (curr_level == 2 && curr_cor < 4) || (curr_level == 3 && curr_cor < 5) || (curr_level == 4 && curr_cor < 5))) { // No need to level up
    localStorage.setItem("curr_order_idx", JSON.stringify(curr_order_idx + 1));
    updateQuestionUI();
  } else { // Level up
    const nextLevelQuestions = questions.filter(q => q.level === curr_level + 1);
    localStorage.setItem("correctAnswers", JSON.stringify(0));
    if (nextLevelQuestions.length > 0) {
      localStorage.setItem("curr_level", JSON.stringify(curr_level + 1));
      genQuestionOrder();
      updateQuestionUI();
    } else {
      // Start again from the beginning?
      if (localStorage.getItem("language") == "zh-tw") {
        alert("你已經完成了遊戲，我們會重新開始玩過！");
      } else if (localStorage.getItem("language") == "en") {
        alert("You completed the game, we will start again!");
      } else if (localStorage.getItem("language") == "vn") {
        alert("Bạn đã hoàn thành trò chơi, chúng tôi sẽ bắt đầu lại!");
      } else if (localStorage.getItem("language") == "id") {
        alert("Anda menyelesaikan permainan, kami akan mulai lagi!");
      }

      localStorage.setItem("curr_order_idx", JSON.stringify(0));
      localStorage.setItem("curr_level", JSON.stringify(1));
      genQuestionOrder();
      updateQuestionUI();
    }
  }

  // Manually reset UI
  const options = document.querySelectorAll(".AnswerOption");

  options.forEach(option => {
    // Temporarily disable transition
    option.style.transition = "none";
    option.classList.remove("selected");
    option.style.pointerEvents = "auto"; // Re-enable clicking

    // Force reflow to apply transition reset
    void option.offsetWidth;

    // Restore the original transition
    option.style.transition = "background-color 0.3s ease-in-out";
  });

  // Hide feedback and continue button
  document.getElementById("feedback").style.display = "none";
  document.getElementById("continue-button").style.display = "none";

  // Reset the last selected answer
  lastSelectedAnswer = null;
}

function updateScoreDisplay() {
  const score = JSON.parse(localStorage.getItem('score')); // Get the current score
  document.getElementById('scoreText').textContent = score; // Update the score display
}

function updateScore(points) {
  let score = JSON.parse(localStorage.getItem('score')); // Get the current score
  score += points; // Add points to the score
  localStorage.setItem('score', JSON.stringify(score)); // Save the updated score
  updateScoreDisplay(); // Update the score display
}

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('score')) {
    localStorage.setItem('score', JSON.stringify(0)); // Initialize score to 0
  }

  if (!localStorage.getItem('correctAnswers')) {
    localStorage.setItem('correctAnswers', JSON.stringify(0)); // Initialize as an empty object
  }
  updateScoreDisplay(); // Update the score display on page load
});

// Window
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;