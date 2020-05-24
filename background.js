'use strict';

const filters = {urls: ["<all_urls>"]};
const extraInfo = [];

const onError = (response) => {
  chrome.storage.local.get(['errorsList'], function(result) {
    result.errorsList.push({url: response.url, error: response.error});
    chrome.storage.local.set({errorsList: result.errorsList});
    console.log(result.errorsList);
  });
};

const addListeners = () => {
  chrome.webRequest.onErrorOccurred.addListener(
    onError,
    filters,
    extraInfo,
  );
};

const removeListeners = () => {
  chrome.webRequest.onErrorOccurred.removeListener(onError);
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({isExtensionEnabled: true});
  chrome.storage.local.set({errorsList: []});
  addListeners();
});

chrome.runtime.onMessage.addListener(function(msg) {
  chrome.storage.local.set({isExtensionEnabled: msg.isExtensionEnabled});
  if (msg.isExtensionEnabled) {
    addListeners();
  }
  else {
    chrome.storage.local.set({errorsList: []});
    removeListeners();
  }
});
