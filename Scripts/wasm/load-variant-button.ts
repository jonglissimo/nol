import * as dev from "./arduino";

let lastChanged = 0.0;
let cur = 0;

export function init(): void {
}

export function update(): void {
  let curTime = dev.getTime();

  if (curTime > lastChanged+1) {
    let btnState = dev.getButtonState(0);

    if (btnState == 1) {
      cur = cur + 1;
      cur = cur % 3;
      dev.playVariant(cur);
      lastChanged = curTime;
    }
  }
}

export function stop(): void {
}
