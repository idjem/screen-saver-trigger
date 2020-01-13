'use strict';

const expect  = require('expect.js');

const sleep = require('nyks/function/sleep');

const ScreenSaver = require('../');

var tick = 100;
const getIdleTime = async () => tick ;
setInterval(() => tick = tick + 50, 50)
const move = async () => tick = 0;


describe('basic screen saver', function() {
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

    await sleep(300);
    expect(open).to.be(true);
    await move();
    await sleep(200);
    expect(open).to.be(false);
    await sleep(1400);
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
    await sleep(1100);
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
    move();
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

  it('test stop screen saver ', async () => {
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
    screenSaver.stop();
    move();
    await sleep(200);
    expect(open).to.be(true);

  });




});

