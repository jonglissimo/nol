import * as dev from "./arduino";

export function init(): void {
//   dev.setIMUEnabled(true);
  dev.setFXSpeed(-5);
  dev.setFXIsoSpeed(1);
}

// export function update(): void {
// }

// export function stop(): void {
// }
