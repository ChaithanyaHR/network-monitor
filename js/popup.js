'use strict';

let stopButton = document.getElementById('stop-button');

function setStyling (inputChecked) {
  const switch1 = document.getElementsByClassName('switch')[0];
  if (inputChecked) {
    switch1.style.backgroundColor = "#80c75f";
  }
  else {
    switch1.style.backgroundColor = "#ccc";
  }
}

stopButton.onclick = function(element) {
  chrome.runtime.sendMessage("Hi BackGround");
  setStyling(element.target.checked);
  chrome.storage.local.set({ 'isExtensionEnabled': element.target.checked });
};
