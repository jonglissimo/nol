import * as dev from "./arduino";

const numLeds = 32;
const startHue = 0.37;
const endHue = 0.75;
const peekDelay = 0.5;

let hue = 0.0;
let prevThrowState = 0;
let lastThrowStart = 1.0;
let lastHueUpdate = 0.0;

export function init(): void {
  dev.setIMUEnabled(true);
}

export function update(): void {
    dev.clearLeds();
    const throwState:u32 = dev.getThrowState();
    // const throwState:u32 = 1;

    const t = dev.getTime();
    hue = 0.0;

    if (throwState > 0) {
      
      if (prevThrowState <= 0) {
        lastThrowStart = t;
        lastHueUpdate = t;
      }

      if (t < lastThrowStart + peekDelay) {
        hue = mapRange((t-lastThrowStart), 0, peekDelay, startHue, endHue);  
      } else {
        hue = mapRange((t-lastThrowStart-peekDelay), 0, peekDelay, endHue, startHue);  
      }

      // dev.pointHSV(f32(hue),0.02,0,255,255); // debug with point
    }
    
    if (hue < startHue) {
      hue = startHue;
    } else if (hue > endHue) {
      hue = endHue;
    }

    for(let i=0;i<numLeds;i++) {
      let c = dev.getLed(i);
      // let r = (c >> 16) & 0xFF;
      let g = (c >>  8) & 0xFF;
      // let b = (c >>  0) & 0xFF;
  
        dev.setLedHSV(i, u32((hue*255)%255), 255, g);
    }
    
    prevThrowState = throwState;

    
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