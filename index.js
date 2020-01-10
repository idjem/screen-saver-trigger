"use strict";

const sleep       = require('nyks/async/sleep');

const uptime = () => process.uptime() * 1000;


class screenSaver extends require('events').EventEmitter {

  constructor(timeout, getIdleTime, shouldStart = true) {
    super();
    this.timeout   = timeout;
    this.lastCall  = shouldStart ? -timeout : uptime();
    this.dateStart = shouldStart ? uptime() : -timeout;
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
    var lastIdleTime = Math.min((await this.getIdleTime()), uptime() - this.lastCall);
    if(lastIdleTime >= uptime() - this.dateStart) // >= => if we simule touch and resetIdle Time at the same seconde => resetIdleTime win.
      return this.timeout + 10;
    return lastIdleTime;
  }

  simuleTouch() {
    this.lastCall = uptime();
  }

  resetIdleTime() {
    this.dateStart = uptime();
  }
  

}

module.exports = screenSaver;

