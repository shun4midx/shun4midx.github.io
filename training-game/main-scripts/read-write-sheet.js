/********************************************
* Copyright (c) 2025 Shun/翔海 (@shun4midx) *
* Project: School Project of Training Game *
* File Type: JS file for website           *
* File: read-write-sheet.js                *
********************************************/

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfY77E4FILITYDbMi2vYaHupQWREDwuUlbpaaKwgVt77K_soZd5R9J9nT9_65Ku0cf/exec';

export function createUser(username, score = 0, callback) {
  jsonpRequest({ action: 'create', username, score }, callback);
}

export function checkName(username, callback) {
  jsonpRequest({ action: 'checkName', username }, callback);
}

export function updateUsername(old_username, new_username, callback) {
  jsonpRequest({ action: 'updateUsername', old_username, new_username }, callback);
}

export function updateSheetScore(username, score, callback) {
  jsonpRequest({ action: 'updateScore', username, score }, callback);
}

export function getSheetScore(username, callback) {
  jsonpRequest({ action: 'getScore', username }, callback);
}

export function getAllUsers(callback) {
  jsonpRequest({ action: 'getAll' }, callback);
}

function jsonpRequest(params, callback) {
  // Generate a unique callback function name
  const callbackFuncName = 'jsonp_cb_' + Math.random().toString(36).substr(2, 9);

  // Define the callback function globally
  window[callbackFuncName] = function(data) {
    try {
      callback(data);
    } finally {
      // Clean up: remove the script and callback function
      delete window[callbackFuncName];
      script.remove();
    }
  };

  const urlParams = new URLSearchParams(params);
  urlParams.set('callback', callbackFuncName);

  const script = document.createElement('script');
  script.src = SCRIPT_URL + '?' + urlParams.toString();
  document.body.appendChild(script);
}