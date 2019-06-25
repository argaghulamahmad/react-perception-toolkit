/*
* FPS counter, retrieved from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
* */
const times = [];
let fpsCounter;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fpsCounter = times.length;
        refreshLoop();
    });
}

refreshLoop();

function logFps() {
    console.log("current fps: " + fpsCounter);
}

setInterval(logFps, 1000);
