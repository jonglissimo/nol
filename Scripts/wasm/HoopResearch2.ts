import * as dev from "./arduino";

let offset: f32 = 0;
let pointSize: f32 = 0.02;
let relUpPitch: f32 = 0;
let hue: f32 = 120;
let numPoints: u32 = 1;

let smoothAngle: f32 = 0;

const numLeds: u32 = 64;

export function init(): void {
    dev.setIMUEnabled(true)
    dev.setBatterySendEnabled(false);
}

export function update(): void {

    for(var i:u32 = 0;i<155;i++)
    {
        var c:u32 = dev.getLed(i);
        var r = (c >> 16) & 0xff;
        if(r < 100) dev.setLed(i, 0x00);
    }
    //if(dev.millis()% 50 < 25) dev.clearLeds();//(0,255,0);
}

export function stop(): void {
    //dev.println('Wasm INIT')
    dev.fillLeds(0x000000);
    dev.setIMUEnabled(false)

}
