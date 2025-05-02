/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: validate-answer.js                 *
********************************************/

// Validates the correct answer (huge simplification as of right now, this is just to demonstrate the sample)
const correctAnswer = 'C';

function checkAnswer(selected) {
  const feedback = document.getElementById('feedback');
  const rootStyles = getComputedStyle(document.documentElement);

  // Get the language from localStorage (or default to 'zh-tw' if not set)
  const lang = localStorage.getItem("language") || "zh-tw";

  // Show it visibly and allow it to take up space
  feedback.style.display = "inline-block";

  if (selected === correctAnswer) {
    feedback.textContent = getTranslation("correctAnswer", lang); //"✅ 正確！";
    feedback.className = "FeedbackMessage";
    
    // feedback.style.backgroundColor = rootStyles.getPropertyValue("--correct-bg").trim();
    // feedback.style.color = rootStyles.getPropertyValue("--correct-color").trim();
    // feedback.style.border = rootStyles.getPropertyValue("--correct-border").trim();
    // console.log("Applied Background:", feedback.style.backgroundColor);
    // console.log("Applied Text Color:", feedback.style.color);
    // console.log("Applied Border:", feedback.style.border);
    
    feedback.style.backgroundColor = "#d4edda";
    feedback.style.color = "#155724";
    feedback.style.border = "2px solid #c3e6cb";
  } else {
    wrongAnswerTranslation = getTranslation("wrongAnswer", lang);//`❌ 答錯了，正確答案是 ${correctAnswer} 喔～`;
    feedback.textContent = wrongAnswerTranslation.replace("${correctAnswer}", correctAnswer);
    feedback.className = "FeedbackMessage";
    
    // feedback.style.backgroundColor = rootStyles.getPropertyValue("--wrong-bg").trim();
    // feedback.style.color = rootStyles.getPropertyValue("--wrong-color").trim();
    // feedback.style.border = rootStyles.getPropertyValue("--wrong-border").trim();
    // console.log("Applied Background:", feedback.style.backgroundColor);
    // console.log("Applied Text Color:", feedback.style.color);
    // console.log("Applied Border:", feedback.style.border);
    
    feedback.style.backgroundColor = "#f8d7da";
    feedback.style.color = "#721c24";
    feedback.style.border = "2px solid #f5c6cb";
  }
}