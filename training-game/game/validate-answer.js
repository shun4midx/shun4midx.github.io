/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: validate-answer.js                 *
********************************************/

// Validates the correct answer (huge simplification as of right now, this is just to demonstrate the sample)
function checkAnswer(selected) {
  lastSelectedAnswer = selected;
  const feedback = document.getElementById('feedback');
  const continueButton = document.getElementById('continue-button');
  const rootStyles = getComputedStyle(document.documentElement);
  const correctAnswer = 'C';

  // Get the language from localStorage (or default to 'zh-tw' if not set)
  const lang = localStorage.getItem("language") || "zh-tw";

  // Show it visibly and allow it to take up space
  feedback.style.display = "inline-block";
  continueButton.style.display = "inline-block";

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
    let wrongAnswerTranslation = getTranslation("wrongAnswer", lang);//`❌ 答錯了，正確答案是 ${correctAnswer} 喔～`;
    wrongAnswerTranslation = wrongAnswerTranslation.replace("${correctAnswer}", correctAnswer);
    feedback.textContent = wrongAnswerTranslation;

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

// Placeholder, may move to different file
function nextQuestion() {
  alert("Next question coming soon!");
  // Could reset the UI here or load the next question dynamically
}