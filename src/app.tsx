import * as React from "react";

import Radio from "./radio";

import { Tuner } from "./components/Tuner";
import { Presets } from "./components/Presets";

export class App extends React.Component<any, any> {

  private radio: Radio = Radio.getInstance();

  constructor(props: any) {
    super(props);
    this.state = {
      frequency: this.radio.getFrequency(),
    };
  }

  public render() {
    return (
      <div className="main">
        <Tuner
          frequency={this.state.frequency}
          onTuneUp={() => this.tuneUp()}
          onTuneDown={() => this.tuneDown()}
        />
      </div>
    );
  }

  private tuneTo(frequency: number) {
    this.radio.tune(frequency);
    this.updateFrequency();
  }

  private tuneUp() {
    this.radio.tuneUp();
    this.updateFrequency();
  }

  private tuneDown() {
    this.radio.tuneDown();
    this.updateFrequency();
  }

  private updateFrequency() {
    this.setState({
      frequency: this.radio.getFrequency(),
    });
  }
}
