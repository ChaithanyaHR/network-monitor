'use strict';

const filters = {urls: ["<all_urls>"]};
const extraInfo = [];

const onComplete = (response) => {
  if (response.statusCode === 304) {
    alert(response.statusCode);
  }
};

const onError = (response) => {
  alert("Error", response.error);
};

const addListeners = () => {
  chrome.webRequest.onCompleted.addListener(
    onComplete,
    filters,
    extraInfo,
  ); 
  chrome.webRequest.onErrorOccurred.addListener(
    onError,
    filters,
    extraInfo,
  );
};

const removeListeners = () => {
  chrome.webRequest.onCompleted.removeListener(onComplete);
  chrome.webRequest.onErrorOccurred.removeListener(onError);
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({isExtensionEnabled: true}, function() {
    console.log('isExtensionEnabled is set to ' + true);
  });
  addListeners();
});

chrome.runtime.onMessage.addListener(function(msg) {
  isExtensionEnabled = msg.isExtensionEnabled;
  if (isExtensionEnabled) {
    chrome.storage.local.set({isExtensionEnabled: true}, function() {
      console.log('isExtensionEnabled is set to ' + true);
    });
    addListeners();
  }
  else {
    chrome.storage.local.set({isExtensionEnabled: false}, function() {
      console.log('isExtensionEnabled is set to ' + false);
    });
    removeListeners();
  }
});
