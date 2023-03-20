import * as dev from "./arduino";

let offset: f32 = 0;
let pointSize: f32 = 0.1;
let relUpPitch: f32 = 0;
let hue: f32 = 120;
let numPoints: u32 = 1;

let smoothAngle: f32 = 0;

export function init(): void {
  dev.setIMUEnabled(true)
  dev.setBatterySendEnabled(false);
}

export function update(): void {

  const time = u32(dev.millis());
  dev.clearLeds();
  // dev.fillLeds(0x000005);

  offset = f32(time) * 1.0 / 1000;

  offset = offset * 0;
  //  const relRoll:f32 = (dev.getRoll()+180)/360;
  //const relYaw: f32 = (dev.getYaw() + 180) / 360;
  //  const relPitch:f32 = (dev.getPitch()+90)/180;

  let angle: f32 = dev.getProjectedAngle() * 3;

  let diff = abs(angle - smoothAngle);
  if(diff > .5) smoothAngle = angle;
  // while (angle > smoothAngle + .5) angle -= 1;
  // while (angle < smoothAngle - .5) angle += 1;
  else smoothAngle = smoothAngle + (angle - smoothAngle) * .2;

  //  dev.pointHSV(angle,.02,50,255,255);

  let pSize = pointSize;//*relUpPitch;
  let h = u32(hue * 255);

  for (let i: u32 = 0; i < numPoints; i++) {
    let or: f32 = f32((smoothAngle + offset + i * 1.0 / numPoints) % 1);
    dev.pointHSV(or, pSize, h, 255, 255);
    dev.pointHSV(or - 1, pSize, h, 255, 255);
    dev.pointHSV(or + 1, pSize, h, 255, 255);
  }

  //dev.setLed(i, 0x00ffff);

  // dev.updateLeds();
}

function map(v1: f32, min: f32, max: f32): f32 {
  let val: f32 = (v1 - min) / (max - min);
  if (val < 0) val = 0;
  else if (val > 1) val = 1;
  return val;
}

function lerpColors(c1: u32, c2: u32, w: f32): u32 {
  return ((c1 & 0xff) * (1 - w)) + ((c2 & 0xff) * w)
    | ((c1 >> 8 & 0xff) * (1 - w)) + ((c2 >> 8 & 0xff) * w) << 8
    | ((c1 >> 16 & 0xff) * (1 - w)) + ((c2 >> 16 & 0xff) * w) << 16;
}

export function stop(): void {
  //dev.println('Wasm INIT')
  dev.fillLeds(0x000000);
  dev.setIMUEnabled(false)

}
