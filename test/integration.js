'use strict';

const os = require('os');

const expect = require('expect.js');
const robot  = require("robotjs");

const sleep = require('nyks/function/sleep');

const ScreenSaver = require('../');

const {getIdleTime} = os.platform() == 'linux' ? require('screensaver-trigger/idle_time_linux') : require('winapi')


var move = (posX, posY) => robot.moveMouse(posX, posY)


describe('win/linux screen saver test', function() {
    this.timeout(10000); 

  it('should pass screensaver => move mouse => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);
    var open;
    screenSaver.on('open',() => {
      open = true;
    })
    screenSaver.on('close',() => {
      open = false;
    })
    screenSaver.start();
    await sleep(200);
    expect(open).to.be(true);
    await move(10, 5);
    await sleep(200);
    expect(open).to.be(false);
    await sleep(1000);
    expect(open).to.be(true);
  });

  it('should pass screensaver => simuleTouch => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);
    var open;
    screenSaver.on('open',() => {
      open = true;
    })
    screenSaver.on('close',() => {
      open = false;
    })
    screenSaver.start();
    await sleep(200);
    expect(open).to.be(true);
    screenSaver.forceActiveMode();
    await sleep(200);
    expect(open).to.be(false);
    await sleep(1000);
    expect(open).to.be(true);
  });

  it('move mouse => reset screen Saver => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000, getIdleTime);
    
    var open;
    screenSaver.on('open',() => {
      open = true;
    })
    screenSaver.on('close',() => {
      open = false;
    })
    screenSaver.start();
    await sleep(200);
    expect(open).to.be(true);
    move(2, 3);
    await sleep(200);
    expect(open).to.be(false);
    screenSaver.forceIdleMode();
    await sleep(200);
    expect(open).to.be(true);
  });

  it('should start to false ', async () => {
    const shouldStart = false;

    const screenSaver = new ScreenSaver(1000, getIdleTime, shouldStart);
    var open;
    screenSaver.on('open',() => {
      open = true;
    })
    screenSaver.on('close',() => {
      open = false;
    })
    screenSaver.start();
    await sleep(300);
    expect(open).to.be(false);
  });

  it('shouldstart to true ', async () => {
    const shouldStart = true;

    const screenSaver = new ScreenSaver(1000, getIdleTime, shouldStart);
    var open;
    screenSaver.on('open',() => {
      open = true;
    })
    screenSaver.on('close',() => {
      open = false;
    })
    screenSaver.start();
    await sleep(300);
    expect(open).to.be(true);
  });



});

