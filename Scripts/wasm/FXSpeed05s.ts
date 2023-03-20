import * as dev from "./arduino";

var animTime: f32 = 2.0;
var initVal: f32 = 0;
var targetVal: f32 = 0;

export function init(): void {

    dev.setIMUEnabled(true);

    initVal = dev.getFXSpeed();
    dev.setFXIsoSpeed(1.0);
}




export function update(): void {

    var t: f32 = dev.getTime() / animTime;
    if (t > 1) return;

    var val: f32 = map(t, initVal, targetVal);
    dev.setFXSpeed(val);
}


export function stop(): void {
}


function map(v: f32, min: f32, max: f32): f32 {

    // if (v < 0) v = 0;
    // else if (v > 1) v = 1;
    return min + v * (max - min);
}
