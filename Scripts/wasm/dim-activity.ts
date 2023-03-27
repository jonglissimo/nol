import * as dev from "./arduino";

const numLeds = 32;

export function init(): void {
  dev.setIMUEnabled(true);
}

export function update(): void {
    let a = dev.getActivity();

    if (a > 0.10) {
      let dim = mapRange(a, 0.10, 1.0, 0.0, 1.0);
      dev.dimLeds(f32(dim));
    } else {
      dev.clearLeds();
    }
}

export function stop(): void {
  // dev.clearLeds();
  // dev.setIMUEnabled(false);
}


function mapRange(value:f64, low1:f64, high1:f64, low2:f64, high2:f64) :f64 {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}