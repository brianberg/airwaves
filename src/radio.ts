import * as exists from "command-exists";
import * as execa from "execa";

export default class Radio {
  private static instance: Radio;

  private frequency: number;
  private sampleRate: number = 200000;
  private outputRate: number = 480000;

  private childProcess: execa.ExecaChildProcess;

  private tunerExists: boolean = false;
  private audioExists: boolean = false;

  public static getInstance() {
    if (!Radio.instance) {
      Radio.instance = new Radio();
    }
    return Radio.instance;
  }

  private constructor() {
    this.frequency = 105.5;
    this.tunerExists = exists.sync("rtl_fm");
    this.audioExists = exists.sync("aplay");
    if (!this.tunerExists) {
      console.info("rtl_fm not found");
    }
    if (!this.audioExists) {
      console.info("aplay not found");
    }
  }

  public getFrequency() {
    return this.frequency;
  }

  public getSampleRate() {
    return this.sampleRate;
  }

  public getOutputRate() {
    return this.outputRate;
  }

  public setSampleRate(sampleRate: number) {
    this.sampleRate = sampleRate;
  }

  public setOutputRate(outputRate: number) {
    this.outputRate = outputRate;
  }

  public stop() {
    if (this.childProcess) {
      this.childProcess.kill();
    }
  }

  public tune(frequency: number) {
    this.setFrequency(frequency);
    this._tune();
  }

  public tuneUp() {
    this.tune(this.frequency + 0.1);
  }

  public tuneDown() {
    this.tune(this.frequency - 0.1);
  }

  private setFrequency(frequency: number) {
    this.frequency = Math.round(frequency * 10) / 10;
  }

  private _tune() {
    if (this.tunerExists && this.audioExists) {
      this.stop();
      const radioCmd =
        "rtl_fm " +
        `-f ${this.frequency}M ` +
        `-s ${this.sampleRate} ` +
        `-r ${this.outputRate}`;
      const audioCmd = `aplay -r ${this.outputRate} -f S16_LE`;
      this.childProcess = execa(`${radioCmd} | ${audioCmd}`);
    }
  }
}
