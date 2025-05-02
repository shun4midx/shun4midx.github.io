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

  // Could reset the UI here or load the next question dynamically
  // For now, just simulate resetting the state
  alert("Next question coming soon!");
}