# Screensaver trigger (for nodejs)

[![Version](https://img.shields.io/npm/v/node-screen-saver.svg)](https://www.npmjs.com/package/node-screen-saver)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/idjem/screen-saver-trigger.svg?branch=master)](https://travis-ci.org/idjem/screen-saver-trigger)

# API

```

const ScreenSaver = require('node-screen-saver');
const getIdleTime = require('screensaver-trigger/idle_time_linux').getIdleTime;

const timeout = 60 * 1000; //1min
const startOnScreenSaver = true; //1min

const screenSaver = new ScreenSaver(timeout, getIdleTime, startOnScreenSaver);

screenSaver.on('open', () => {
  console.log('screen saver start');
})

screenSaver.on('close', () => {
  console.log('screen saver close');
})


setTimeout(() => {
  screenSaver.simuleTouch();
}, 1000);

setTimeout(() => {
  screenSaver.resetIdleTime();
}, 5000);



```
