/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: naive-translation.js               *
********************************************/

import { questions } from '../game/question-navigation.js'; // Question updating
import { lastSelectedAnswer } from '../game/validate-answer.js';

// Need some naïve translations in case it fails, but we rely on translation.js later more which reads from Spreadsheet API
export const translations = {
  "zh-tw": {
    start: "開始！",
    startDescription: "按下按鈕就能開始玩遊戲！",
    correctAnswer: "✅ 正確！",
    wrongAnswer: "❌ 答錯了，正確答案是 ${correctAnswer} 喔～",
    nextQuestion: "下一題"
  },
  "en": {
    start: "START!",
    startDescription: "Press to start the game!",
    correctAnswer: "✅ Correct!",
    wrongAnswer: "❌ That's wrong, the correct answer is ${correctAnswer}!",
    nextQuestion: "Next Question"
  },
  "vn": {
    start: "BẮT ĐẦU!",
    startDescription: "Nhấn nút để bắt đầu trò chơi!",
    correctAnswer: "✅ Đúng rồi!",
    wrongAnswer: "❌ Sai rồi, câu trả lời đúng là ${correctAnswer}!",
    nextQuestion: "Câu Hỏi Tiếp Theo"
  },
  "id": {
    start: "MULAI!",
    startDescription: "Tekan tombol untuk memulai permainan!",
    correctAnswer: "✅ Benar!",
    wrongAnswer: "❌ Itu salah, jawaban yang benar adalah ${correctAnswer}!",
    nextQuestion: "Pertanyaan Berikutnya"
  }
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  applyLanguage(lang);

  // Remove all language classes from ButtonLink
  const buttonLink = document.querySelector(".ButtonLink");

  if (buttonLink) {
    buttonLink.classList.remove("button-zh-tw", "button-en", "button-vn", "button-id"); // Clear old classes

    // Add the language-specific class
    if (lang === "zh-tw") {
      buttonLink.classList.add("button-zh-tw");
    } else if (lang === "en") {
      buttonLink.classList.add("button-en");
    } else if (lang === "vn") {
      buttonLink.classList.add("button-vn");
    } else if (lang === "id") {
      buttonLink.classList.add("button-id");
    }
  }

  // Update question lang
  updateQuestionLang(lang);

  // Rerun checkAnswer if there was a previous selection
  if (lastSelectedAnswer) {
    checkAnswer(lastSelectedAnswer);
  }
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations["zh-tw"];
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

function updateQuestionLang(lang) {
  const curr_question_idx = JSON.parse(localStorage.getItem("question_order"))[JSON.parse(localStorage.getItem("curr_order_idx"))];
  const currQuestion = questions[curr_question_idx];

  // Update the question text
  const questionElement = document.querySelector("[question-key='questionText']");
  if (questionElement) {
    questionElement.innerHTML = currQuestion.question[lang];
  }

  // Update the answer options
  const answersContainer = document.querySelector(".Answers");
  if (answersContainer) {
    const answerOptions = answersContainer.querySelectorAll(".AnswerOption");
    Object.entries(currQuestion.answers).forEach(([key, answer], index) => {
      const answerOption = answerOptions[index];
      if (answerOption) {
        answerOption.textContent = `${key}. ${answer[lang]}`;
      }
    });
  }

  // Update the "Next Question" button
  const continueButton = document.getElementById("continue-button");
  if (continueButton) {
    continueButton.textContent = getTranslation("nextQuestion", lang);
  }
}

// Get the translation for a key in the selected language
export function getTranslation(key, language = "zh-tw") {
  // return translations[language] ? translations[language][key] : translations["zh-tw"][key]; // Default to Chinese if language is not found
  const langDict = translations[language] || translations["zh-tw"];
  return langDict[key] || `Missing translation for key: ${key}`;
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "zh-tw";
  setLanguage(lang);
});

// Window
window.setLanguage = setLanguage;