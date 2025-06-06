/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: level-up-typewriter.js             *
********************************************/

document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
});

const next_level = JSON.parse(localStorage.getItem("curr_level")) || 1;
let chiText = "你升級到第${next_level}關了！";
let enText = "You made it to level ${next_level}!";
let vnText = "Bạn đã đạt tới cấp độ ${next_level}!";
let idText = "Selamat datang di level ${next_level}!";

chiText = chiText.replace("${next_level}", next_level);
enText = enText.replace("${next_level}", next_level);
vnText = vnText.replace("${next_level}", next_level);
idText = idText.replace("${next_level}", next_level);

const textParts = [chiText, enText, vnText, idText]; // Dynamic parts
const staticText = "‎"; // Static part that remains the same
const element = document.getElementById("homescreen-text");

let partIdx = 0; // Current index in `textParts`
let charIdx = 0; // Current character being typed/deleted
let isDeleting = false; // Whether we are deleting
const typingSpeed = 50; // Speed for typing characters
const chiTypingSpeed = 75; // Speed for Chinese typing
const deletingSpeed = 50; // Speed for deleting characters
const chiDeletingSpeed = 75; // Speed for deleting Chinese characters
const pauseDuration = 2000; // Pause before deleting or typing the next word
const extraPauseAtEnd = 2000; // Extra pause after the last word

function typeWriter() {
  const fullText = textParts[partIdx]; // Current dynamic text

  if (!isDeleting) {
    // Typing the text
    charIdx++;
  } else {
    // Deleting the text
    charIdx--;
  }

  // Update the element with the static part + dynamic part
  element.textContent = staticText + fullText.slice(0, charIdx);

  // Determine the delay for typing or deleting
  let delay = isDeleting ? (partIdx == 0 ? chiDeletingSpeed : deletingSpeed) : (partIdx == 0 ? chiTypingSpeed : typingSpeed);

  // If the dynamic text is fully typed
  if (!isDeleting && charIdx === fullText.length) {
    if (partIdx === textParts.length - 1 && !isDeleting) { // Last word and last character
      delay = extraPauseAtEnd;
    } else {
      delay = pauseDuration; // Wait normal weight time before starting to delete
    }
    isDeleting = true;
  }

  // If the dynamic text is fully deleted
  if (isDeleting && charIdx === 0) {
    // Update
    isDeleting = false; // Switch to typing the next text
    partIdx = (partIdx + 1) % textParts.length; // Move to the next text part (loop back to the start)
  }

  setTimeout(typeWriter, delay);
}