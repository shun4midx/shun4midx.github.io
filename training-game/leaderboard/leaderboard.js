/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: leaderboard.js                     *
********************************************/

import { getAllUsers } from '../main-scripts/read-write-sheet.js';

let lastRefreshTime = 0; // timestamp of last refresh
const REFRESH_COOLDOWN = 3000; // 3 seconds

function fetchLeaderboard() {
  const leaderboardBody = document.getElementById("leaderboardBody");
  leaderboardBody.innerHTML = "";

  const lang = localStorage.getItem("language") || "zh-tw";

  const curr_user = localStorage.getItem("username");

  getAllUsers((response) => {
    if (response.status === "success" && Array.isArray(response.users)) {
      const users = response.users;
      users.sort((a, b) => b.score - a.score); // Sort by score descending

      users.forEach((user, index) => {
        const row = document.createElement("tr");

        if (user.username.trim().toLowerCase() === curr_user.trim().toLowerCase()) {
          row.classList.add("CurrentUserRow");
        }

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.score}</td>
          <td>${user.last_updated ? new Date(user.last_updated).toLocaleString() : '-'}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    } else {
      console.error("getAllUsers did not return a valid user array.");
    }
  });
}

function refreshLeaderboard() {
  const now = Date.now();
  if (now - lastRefreshTime < REFRESH_COOLDOWN) {
    return; // Ignore if within cooldown
  }

  lastRefreshTime = now;

  // Clear and re-fetch
  const leaderboardBody = document.getElementById("leaderboardBody");
  leaderboardBody.innerHTML = "";
  fetchLeaderboard();
}


document.addEventListener("DOMContentLoaded", () => {
  fetchLeaderboard();
});

window.refreshLeaderboard = refreshLeaderboard;