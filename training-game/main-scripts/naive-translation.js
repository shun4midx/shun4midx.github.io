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
    startDescription: "按下按鈕就能開始玩遊戲！"
  },
  "en": {
    start: "START!",
    startDescription: "Press to start the game!"
  },
  "vn": {
    start: "BẮT ĐẦU!",
    startDescription: "Nhấn nút để bắt đầu trò chơi!"
  },
  "id": {
    start: "MULAI!",
    startDescription: "Tekan tombol untuk memulai permainan!"
  }
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  applyLanguage(lang);

  // Remove all language classes from ButtonLink
  const buttonLink = document.querySelector(".ButtonLink");
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

function applyLanguage(lang) {
  const dict = translations[lang] || translations["zh-tw"];
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "zh-tw";
  setLanguage(lang);
});