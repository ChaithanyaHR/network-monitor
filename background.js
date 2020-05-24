'use strict';

const filters = {urls: ["<all_urls>"]};
const extraInfo = [];

const onError = ({tabId, url, error}) => {
  chrome.storage.local.get(['errorsList'], function({errorsList}) {
    if (!errorsList[tabId]) {
      errorsList[tabId] = [];
    }
    errorsList[tabId].push({url, error});
    chrome.storage.local.set({errorsList});
    console.log(errorsList);
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
  chrome.storage.local.set({errorsList: {}});
  addListeners();
});

chrome.runtime.onMessage.addListener(function({isExtensionEnabled}) {
  chrome.storage.local.set({isExtensionEnabled});
  if (isExtensionEnabled) {
    addListeners();
  }
  else {
    chrome.storage.local.set({errorsList: {}});
    removeListeners();
  }
});
