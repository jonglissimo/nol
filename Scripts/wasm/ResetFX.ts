import * as dev from "./arduino";

export function init(): void {

    dev.resetFX();
    dev.setFXIsoSpeed(1.0);
}

export function update(): void {

}


export function stop(): void {
}