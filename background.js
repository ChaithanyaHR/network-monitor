// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let isExtensionEnabled = true;

alert("This is the background script");

chrome.runtime.onInstalled.addListener(function() {
  alert("Extension installed");
  isExtensionEnabled = true;
});

chrome.storage.local.get('isExtensionEnabled', (response) => {

});

chrome.runtime.onMessage.addListener(function(msg) {
  alert("message recieved by background" + msg);
});
