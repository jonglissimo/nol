import * as dev from "./arduino";

export function init(): void {
    dev.setIMUEnabled(1);
    dev.setBatterySendEnabled(0);
    dev.resetFX();
    dev.setFXIsoSpeed(1.0);
}

export function update(): void {

}


export function stop(): void {
}