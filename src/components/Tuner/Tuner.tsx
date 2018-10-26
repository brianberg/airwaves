import * as React from "react";

export class Tuner extends React.Component<any, any> {
  public render() {
    return (
      <div className="tuner">
        <button
            className="tune-button"
            onClick={() => this.props.onTuneDown()}>
          -
        </button>
        <h2 className="frequency">{this.props.frequency.toFixed(1)}</h2>
        <button
            className="tune-button"
            onClick={() => this.props.onTuneUp()}>
          +
        </button>
      </div>
    )
  }
}