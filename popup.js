'use strict';

let stopButton = document.getElementById('stop-button');

chrome.storage.local.get(['errorsList'], function({errorsList}) {
  chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0].id;
    let errors = errorsList[currentTab];
    if (errors && errors.length) {
      createTable(errors);
    }
  });
});

chrome.storage.local.get(['isExtensionEnabled'], function({isExtensionEnabled}) {
  stopButton.checked = isExtensionEnabled;
  setStyling(isExtensionEnabled);
  if (isExtensionEnabled) {
    showTable();
  } else {
    hideTable();
  }
});

stopButton.onclick = function(element) {
  const msg = {isExtensionEnabled: element.target.checked };
  setStyling(msg.isExtensionEnabled);
  chrome.runtime.sendMessage(msg);
  if (msg.isExtensionEnabled) {
    showTable();
  }
  else {
    hideTable();
  }
};

function setStyling (isExtensionEnabled) {
  const switch1 = document.getElementsByClassName('switch')[0];
  if (isExtensionEnabled) {
    switch1.style.backgroundColor = "#80c75f";
  }
  else {
    switch1.style.backgroundColor = "#ccc";
  }
}

const createTable = (errors) => {
  errors = errors.forEach(({url, error}) => {
    let table = document.getElementsByTagName("table")[0];
    let row = table.insertRow();
    let urlCell = row.insertCell();
    urlCell.textContent = url;
    let errorCell = row.insertCell();
    errorCell.textContent = error;
  });
};

const showTable = () => {
  let table = document.getElementsByTagName("table")[0];
  table.style.visibility = 'visible';
}

const hideTable = () => {
  let table = document.getElementsByTagName("table")[0];
  table.style.visibility = 'hidden';
}
