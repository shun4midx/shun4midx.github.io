/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: language-selection.js              *
********************************************/

// JavaScript to toggle the globe menu icon
function toggleMenu() {
  var menuText = document.getElementById('globe-text');
  
  // Toggle the text inside the span between "🌐" and "❌"
  if (menuText.innerHTML === '🌐') {
    menuText.innerHTML = '❌';  // Change to X
  } else {
    menuText.innerHTML = '🌐';  // Change back to globe icon
  }
}  