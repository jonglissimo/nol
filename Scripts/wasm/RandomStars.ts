import * as dev from "./arduino";
import * as star from "./StarThrow";

var index: u32 = -1;

var rate: f32 = 20;
var balance: f32 = .5;

var rateMS: u32 = u32(1000.0 / rate);
const balanceMS: u32 = u32(f32(rateMS) * balance);

var val: f32 = 0;
var valSpeed: f32 = .2;

var throwVal: f32 = 0;
var throwValSpeed: f32 = .01;

export function init(): void {
    dev.setIMUEnabled(true);
    dev.calibrateIMU();
    dev.resetFX();
}

export function update(): void {

    dev.clearLeds();

    //if (dev.getThrowState() < 1) return;
    //if(dev.getSpin() < .5 || dev.getSpin() > 1.6) return;

    var bVal: f32 = 0;

    var ms: u32 = dev.millis();

    var isThrowing =  (dev.getThrowState() > 1)?1:0;

    if (isThrowing && ms % rateMS < balanceMS) {

        //on
        if (index == -1) index = dev.randomInt(0, 32);
        bVal = 1;
    } else {
        //off
        bVal = 0;
        index = -1;
    }

    val = val + (bVal - val) * valSpeed;

    var tVal:f32 = isThrowing ?1:0;
    throwVal = throwVal + (tVal - throwVal) * throwValSpeed;

    dev.fillLedsHSV(150, 230, u32((1.0 - throwVal) * 100.0));

    if (index == -1) return;
    dev.setLedHSV(index, 150, 200, u32(val * 255));

}

export function stop(): void {
}