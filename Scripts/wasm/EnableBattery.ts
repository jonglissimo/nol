import * as dev from "./arduino";

export function init(): void {
    dev.setIMUEnabled(0);
    dev.setBatterySendEnabled(1);
    dev.resetFX();
    dev.setFXIsoSpeed(1.0);
}

export function update(): void {

}


export function stop(): void {
}