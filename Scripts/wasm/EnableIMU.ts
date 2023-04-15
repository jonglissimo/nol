import * as dev from "./arduino";

export function init(): void {
    dev.setIMUEnabled(1);
    dev.resetFX();
}

export function update(): void {

}


export function stop(): void {
}