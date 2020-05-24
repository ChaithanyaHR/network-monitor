'use strict';

let stopButton = document.getElementById('stop-button');

function setStyling (isExtensionEnabled) {
  const switch1 = document.getElementsByClassName('switch')[0];
  if (isExtensionEnabled) {
    switch1.style.backgroundColor = "#80c75f";
  }
  else {
    switch1.style.backgroundColor = "#ccc";
  }
}

chrome.storage.local.get(['isExtensionEnabled'], function(result) {
  stopButton.checked = result.isExtensionEnabled;
  setStyling(result.isExtensionEnabled);
});

stopButton.onclick = function(element) {
  const msg = {isExtensionEnabled: element.target.checked };
  setStyling(msg.isExtensionEnabled);
  chrome.runtime.sendMessage(msg);
};
