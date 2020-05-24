// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let isExtensionEnabled = true;

chrome.runtime.onInstalled.addListener(function() {
  isExtensionEnabled = true;
});

chrome.runtime.onMessage.addListener(function(msg) {
  isExtensionEnabled = msg.isExtensionEnabled;
  console.log(isExtensionEnabled);
});
