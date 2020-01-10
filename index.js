"use strict";

const sleep       = require('nyks/async/sleep');

class screenSaver extends require('events').EventEmitter {

  constructor(timeout, getIdleTime, shouldStart = true) {
    super();
    this.timeout   = timeout;
    this.lastCall  = shouldStart ? -timeout : process.uptime() * 1000;
    this.dateStart = shouldStart ? process.uptime() * 1000 : -timeout;
    this.shouldStart = shouldStart;
    this.getIdleTime = getIdleTime;
  }

  async start(){

    if(this.shouldStart)
      this.emit('open');

    do {
      while((await this._properIdleTime()) >  this.timeout)
        await sleep(200);
  
      this.emit('close');
    
      //await Promise.all([await sleep(this.timeout), reject]); //add promise reject here when resetIdleTime
      while((await this._properIdleTime()) <= this.timeout)
        await sleep(200);
  
      this.emit('open');
      
      await sleep(200); // when stop video trigger X;
      this.resetIdleTime();

    } while(true);
  }

  async _properIdleTime() {
    var lastIdleTime = Math.min((await this.getIdleTime()), process.uptime() * 1000 - this.lastCall);
    if(lastIdleTime >= (process.uptime() * 1000) - this.dateStart) // >= => if we simule touch and resetIdle Time at the same seconde => resetIdleTime win.
      return this.timeout + 10;
    return lastIdleTime;
  }

  simuleTouch() {
    this.lastCall = process.uptime() * 1000;
  }

  resetIdleTime() {
    this.dateStart = process.uptime() * 1000;
  }
  

}

module.exports = screenSaver;

