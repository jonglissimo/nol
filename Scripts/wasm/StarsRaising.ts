import * as dev from "./arduino";
import * as star from "./StarThrow";

export function init(): void
{
    star.init();
}

export function update(): void {

    star.update(0,.6);
}

export function stop(): void
{
    star.stop();
}