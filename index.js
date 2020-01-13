"use strict";

const sleep       = require('nyks/async/sleep');
const defer       = require('nyks/promise/defer');

const uptime = () => process.uptime() * 1000;


class screenSaver extends require('events').EventEmitter {

  constructor(timeout, getIdleTime, shouldStart = true) {
    super();
    this.timeout   = timeout;
    this.lastCall  = shouldStart ? -timeout : uptime();
    this.dateStart = shouldStart ? uptime() : -timeout;
    this.shouldStart = shouldStart;
    this.getIdleTime = getIdleTime;
    this._cancel = defer();
    this._started = false;
  }

  async start(){

    if(this.shouldStart)
      this.emit('open');

    this._started = true;
    do {
      try {
        while((await this._properIdleTime()) >  this.timeout)
          await Promise.race([sleep(200), this._cancel]);

        try {
          this.emit('close');
        } catch(err) {}

        //await Promise.all([await sleep(this.timeout), reject]); //add promise reject here when resetIdleTime
        while((await this._properIdleTime()) <= this.timeout)
          await Promise.race([sleep(200), this._cancel]);

        try {
          this.emit('open');
        } catch(err) {}

        await sleep(200); // when stop video trigger X;
        this.forceIdleMode();

      } catch(err) {
        this._cancel = defer();
        this._started = false;
        break;
      }

    } while(true);
  }

  async _properIdleTime() {
    var lastIdleTime = Math.min((await this.getIdleTime()), uptime() - this.lastCall);
    if(lastIdleTime >= uptime() - this.dateStart) // >= => if we simule touch and resetIdle Time at the same seconde => resetIdleTime win.
      return this.timeout + 10;
    return lastIdleTime;
  }

  forceActiveMode() {
    this.lastCall = uptime();
    if(!this._started)
      this.start();
  }

  forceIdleMode() {
    this.dateStart = uptime();
    if(!this._started)
      this.start();
  }

  stop() {
    this._cancel.reject();
  }
  

}

module.exports = screenSaver;

