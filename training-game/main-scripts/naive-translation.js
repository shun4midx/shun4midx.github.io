/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: naive-translation.js               *
********************************************/

// Need some naïve translations in case it fails, but we rely on translation.js later more which reads from Spreadsheet API
const translations = {
  "zh-tw": {
    start: "開始！",
    startDescription: "按下按鈕就能開始玩遊戲！",
    sampleQuestion: "台灣的長輩在養老院常說「阿嬤肚子痛」，你應該怎麼做？",
    sampleA: "A. 請長輩多喝開水",
    sampleB: "B. 把事情記起來等下班再說",
    sampleC: "C. 通知護理人員或醫護相關人員",
    sampleD: "D. 告訴她：「你只是想家啦！」。",
    correctAnswer: "✅ 正確！",
    wrongAnswer: "❌ 答錯了，正確答案是 ${correctAnswer} 喔～"
  },
  "en": {
    start: "START!",
    startDescription: "Press to start the game!",
    sampleQuestion: "If an elderly person in Taiwan’s nursing home often says “Grandma has a stomachache.” What should you do?",
    sampleA: "A. Tell the elderly person to drink more water",
    sampleB: "B. Note it down until after you get off of work",
    sampleC: "C. Notify nursing or medical personnel",
    sampleD: `D. Tell her: "You just miss home!"`,
    correctAnswer: "✅ Correct!",
    wrongAnswer: "❌ That's wrong, the correct answer is ${correctAnswer}!"
  },
  "vn": {
    start: "BẮT ĐẦU!",
    startDescription: "Nhấn nút để bắt đầu trò chơi!",
    sampleQuestion: "Nếu một người cao tuổi trong viện dưỡng lão ở Đài Loan thường xuyên nói “Bà bị đau bụng.” Bạn nên làm gì?",
    sampleA: "A. Bảo người cao tuổi uống nhiều nước hơn",
    sampleB: "B. Ghi chú lại cho đến khi hết giờ làm việc",
    sampleC: "C. Thông báo cho nhân viên y tế hoặc y tá",
    sampleD: `D. Nói với bà ấy: "Bà chỉ nhớ nhà thôi!"`,
    correctAnswer: "✅ Đúng rồi!",
    wrongAnswer: "❌ Sai rồi, câu trả lời đúng là ${correctAnswer}!"
  },
  "id": {
    start: "MULAI!",
    startDescription: "Tekan tombol untuk memulai permainan!",
    sampleQuestion: "Jika seseorang lanjut usia di panti jompo Taiwan sering mengatakan “Nenek sakit perut.” Apa yang harus Anda lakukan?",
    sampleA: "A. Beri tahu orang lanjut usia untuk minum lebih banyak air",
    sampleB: "B. Catat hingga setelah Anda selesai bekerja",
    sampleC: "C. Beri tahu staf perawatan atau medis",
    sampleD: `D. Katakan padanya: "Kamu hanya merindukan rumah!"`,
    correctAnswer: "✅ Benar!",
    wrongAnswer: "❌ Itu salah, jawaban yang benar adalah ${correctAnswer}!"
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

// Get the translation for a key in the selected language
function getTranslation(key, language = "zh-tw") {
  return translations[language] ? translations[language][key] : translations["zh-tw"][key]; // Default to Chinese if language is not found
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "zh-tw";
  setLanguage(lang);
});