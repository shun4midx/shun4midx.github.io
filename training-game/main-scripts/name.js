/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: name.js                            *
********************************************/

import { getTranslation } from '../main-scripts/naive-translation.js';
import { checkName, createUser, updateUsername } from './read-write-sheet.js';

document.addEventListener("DOMContentLoaded", () => {
  const nameBtn = document.querySelector('.NameButton');

  nameBtn.addEventListener("click", () => {
    nameBtn.classList.add("clicked");
    setTimeout(() => {
      nameBtn.classList.remove("clicked");
    }, 150);
  });

  // Toggle the visibility of the name input container
  function toggleNameInput() {
    const nameInputContainer = document.querySelector('.NameInputContainer');
    if (nameInputContainer.style.display === 'none' || nameInputContainer.style.display === '') {
      nameInputContainer.style.display = 'flex'; // Make it visible
    } else {
      nameInputContainer.style.display = 'none'; // Hide it
    }
  }

  // Save the name to localStorage and update the display
  function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (!nameInput) {
      alert("????");
      return;
    }
  
    const storedName = localStorage.getItem('username');
    const lang = localStorage.getItem("language") || "zh-tw";

    checkName(nameInput, function (res) {
      if (res.status === 'taken') {
        alert(getTranslation("usernameUsed", lang));
      } else if (res.status === 'available') {
        if (storedName) {
          // Case: Changing username
          updateUsername(storedName, nameInput, function (resp) {
            if (resp.status === 'success') {
              localStorage.setItem('username', nameInput);
              document.querySelector('.NameInputContainer').style.display = 'none';
              alert(getTranslation("usernameChanged", lang));
            } else {
              alert(getTranslation("usernameUsed", lang));
            }
          });
        } else {
          // Case: First time user
          createUser(nameInput, 0, function (resp) {
            if (resp.status === 'success') {
              localStorage.setItem('username', nameInput);
              document.querySelector('.NameInputContainer').style.display = 'none';
              alert(getTranslation("usernameChanged", lang));
            } else {
              alert(getTranslation("usernameUsed", lang));
            }
          });
        }
      } else {
        console.error("Unexpected checkName response:", res);
      }
    });
  }  

  window.toggleNameInput = toggleNameInput;
  window.saveName = saveName;
});