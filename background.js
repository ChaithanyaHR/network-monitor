'use strict';

const filters = {urls: ["<all_urls>"]};
const extraInfo = [];

chrome.browserAction.setBadgeBackgroundColor({color: 'black'});

const onError = ({tabId, url, error}) => {
  chrome.storage.local.get(['errorsList'], function({errorsList}) {
    if (!errorsList[tabId]) {
      errorsList[tabId] = [];
    }
    errorsList[tabId].push({url, error});
    chrome.storage.local.set({errorsList});
    chrome.browserAction.setBadgeText({text: errorsList[tabId].length.toString(), tabId});
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
    removeListeners();
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if ( changeInfo.status === 'loading' ) {
    chrome.storage.local.get(['errorsList'], function({errorsList}) {
      errorsList[tabId] = [];
      chrome.storage.local.set({errorsList});
    });
  }
});
