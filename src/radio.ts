export default class Radio {
  private static instance: Radio;

  private frequency: number;
  
  public static getInstance() {
    if (!Radio.instance) {
      Radio.instance = new Radio();
    }
    return Radio.instance;
  }

  private constructor() {
    this.frequency = 105.5;
  }

  public getFrequency() {
    return this.frequency;
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
    // TODO: tune and play audio
  }
}
