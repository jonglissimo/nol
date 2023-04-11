import * as dev from "./arduino";

const numLeds = 32;

export function init(): void {
  dev.setIMUEnabled(true);

  let yaw = dev.getYaw();
  let pitch = dev.getPitch();
  
  if (pitch > -30 && pitch < 30) {
    if (yaw > -90 && yaw < 90) {
      dev.playVariant(1);
    } else {
      dev.playVariant(2);
    }
  }
}

export function update(): void {
}

export function stop(): void {
}

