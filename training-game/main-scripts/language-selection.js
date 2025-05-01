/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: language-selection.js              *
********************************************/

const globeBtn = document.querySelector('.MenuToggle');
const languageContainer = document.querySelector('.LanguageContainer');

// JavaScript to toggle the globe menu icon
function toggleMenu() {
  var menuText = document.getElementById('globe-text');
  
  // Toggle the text inside the span between "🌐" and "❌"
  if (menuText.innerHTML === '🌐') {
    languageContainer.classList.add('show'); // Toggle language container
    menuText.innerHTML = '❌';  // Change to X
  } else {
    languageContainer.classList.remove('show'); // Toggle language container
    menuText.innerHTML = '🌐';  // Change back to globe icon
  }
}  

// Click animation
globeBtn.addEventListener('click', () => {
  globeBtn.classList.add('clicked');
  setTimeout(() => {
    globeBtn.classList.remove('clicked');
  }, 100);
});