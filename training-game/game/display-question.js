/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: display-question.js                *
********************************************/

import { questions } from './question-navigation.js';
import { translations } from '../main-scripts/naive-translation.js';      

export function updateQuestionUI() {
  // Get the current question
  const curr_question_idx = JSON.parse(localStorage.getItem("question_order"))[JSON.parse(localStorage.getItem("curr_order_idx"))];
  const currQuestion = questions[curr_question_idx];

  // Get the user's `selected` language (default to 'zh-tw')
  const lang = localStorage.getItem("language") || "zh-tw";

  // Update the question image
  const imageElement = document.querySelector(".GameImage img");
  imageElement.src = currQuestion.image;

  // Update the question text
  const questionElement = document.querySelector("[question-key='questionText']");
  questionElement.textContent = currQuestion.question[lang];

  // Update the answers
  const answersContainer = document.querySelector(".Answers");
  if (answersContainer) {
    answersContainer.innerHTML = ""; // Clear existing answers

    // Re-add the feedback element
    const feedbackElement = document.createElement("div");
    feedbackElement.id = "feedback";
    feedbackElement.className = "FeedbackMessage";
    feedbackElement.style.display = "none"; // Initially hidden
    answersContainer.appendChild(feedbackElement);

    // Add answer options
    Object.entries(currQuestion.answers).forEach(([key, answer]) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = "AnswerOption";
      answerDiv.setAttribute("onclick", `checkAnswer('${key}')`);
      answerDiv.textContent = `${key}. ${answer[lang]}`;
      answersContainer.appendChild(answerDiv);
    });

    // Re-add the continue button (Because of chronological order)
    const continueButton = document.createElement("button");
    continueButton.id = "continue-button";
    continueButton.className = "ContinueButton";
    continueButton.style.display = "none"; // Initially hidden
    continueButton.textContent = translations[lang].nextQuestion;
    continueButton.setAttribute("onclick", "nextQuestion()");
    answersContainer.appendChild(continueButton);
  }

  // Hide feedback and continue button initially
  const feedbackElement = document.getElementById("feedback");
  const continueButton = document.getElementById("continue-button");
  if (feedbackElement) feedbackElement.style.display = "none";
  if (continueButton) continueButton.style.display = "none";

  // Window
  window.checkAnswer = checkAnswer;
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  updateQuestionUI();
});