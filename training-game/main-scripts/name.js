/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: name.js                            *
********************************************/

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
    console.log('Toggling visibility'); // Debugging log
    console.log('Current display:', nameInputContainer.style.display); // Debugging log
    if (nameInputContainer.style.display === 'none' || nameInputContainer.style.display === '') {
      nameInputContainer.style.display = 'flex'; // Make it visible
      console.log('NameInputContainer is now visible'); // Debugging log
    } else {
      nameInputContainer.style.display = 'none'; // Hide it
      console.log('NameInputContainer is now hidden'); // Debugging log
    }
  }

  // Save the name to localStorage and update the display
  function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput) {
      localStorage.setItem('username', nameInput); // Save name to localStorage
      document.querySelector('.NameInputContainer').style.display = 'none'; // Hide input container
      // updateNameDisplay(); // Update the name display
    } else {
      alert("????");
    }
  }

  window.toggleNameInput = toggleNameInput;
  window.saveName = saveName;
});