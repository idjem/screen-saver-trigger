'use strict';

const x11     = require('x11');
const expect  = require('expect.js');

const sleep = require('nyks/function/sleep');
const defer = require('nyks/promise/defer');

const ScreenSaver = require('../');


var move = (posX, posY) => {
  var defered = defer()
  x11.createClient((err, display) => {
    if(err)
      return defered.reject(err);
    var X     = display.client;
    var root  = display.screen[0].root;
    X.WarpPointer(0, root, 0, 0, 0, 0, posX, posY);
    defered.resolve()
  })
  return defered;
  
}


describe('basic screen saver', function() {
    this.timeout(10000); 

  it('should pass screensaver => move mouse => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000);
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
    const screenSaver = new ScreenSaver(1000);
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
    screenSaver.simuleTouch();
    await sleep(200);
    expect(open).to.be(false);
    await sleep(1000);
    expect(open).to.be(true);
  });

  it('move mouse => reset screen Saver => screen saver again ', async () => {
    const screenSaver = new ScreenSaver(1000);
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
    screenSaver.resetIdleTime();
    await sleep(200);
    expect(open).to.be(true);
  });

  it('should start to false ', async () => {
    const shouldStart = false;

    const screenSaver = new ScreenSaver(1000, shouldStart);
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

    const screenSaver = new ScreenSaver(1000, shouldStart);
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

