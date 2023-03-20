import * as dev from "./arduino";

var val: f32 = 0;

export function init(): void {

    dev.setIMUEnabled(true);
    dev.setBatterySendEnabled(false);
    dev.resetFX();
}

export function update(spinOffset: f32, spinRange: f32): void {
    var tSpeed: f32 = 0;
    dev.clearLeds();
    var t: f32 = dev.getTime();
    var targetVal: f32 = 0;

    var spin = dev.getSpin();
    var relSpin = imap(spin, spinOffset, spinOffset + spinRange);

    if (relSpin > 0 && relSpin < 1) {
        tSpeed = 1;

        // if (t %.01 < .002) col = 0x0066aa;
        // else col = 0x005511;
        targetVal = 1;

    } else {
        // dev.clearLeds();
        targetVal = 0;
    }

    val = val + (targetVal - val) * .05;

    var osc: f32 = f32(Math.sin(t * 3) * .5 + .5);

    dev.pointHSV(0, .1 + val * .2, 160, 255 - u32(val * 100), u32(val * 255));

    dev.setFXSpeed(osc * 20);

    // var t: f32 = dev.getTime() / animTime;
    // if (t > 1) return;

    // var val: f32 = map(t, initVal, targetVal);
    // dev.setFXSpeed(val);
}


export function stop(): void {
}


function map(v: f32, min: f32, max: f32): f32 {

    if (v < 0) v = 0;
    else if (v > 1) v = 1;
    return min + v * (max - min);
}



function imap(v: f32, min: f32, max: f32): f32 {

    var result: f32 = (v - min) / (max - min);
    if (result < 0) result = 0;
    else if (result > 1) result = 1;
    return result;
}