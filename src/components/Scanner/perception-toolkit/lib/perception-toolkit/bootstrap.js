import {DeviceSupport} from '../src/support/device-support.js';
import {GetUserMediaSupport} from '../src/support/get-user-media.js';
import {WasmSupport} from '../src/support/wasm.js';
import {fire} from '../src/utils/fire.js';
import {cameraAccessDenied, captureClosed, captureStopped, markerChanges} from './events.js';

/*
* TODO create a new interface replace the existing window interface so that we can use it in the Scanner component
* TODO send captured content to a react component
* */

const deviceNotSupported = 'pt.devicenotsupported';
window.PerceptionToolkit.config = window.PerceptionToolkit.config || {};

/*
Expose events
*/
window.PerceptionToolkit.Events = {
    CameraAccessDenied: cameraAccessDenied,
    CaptureClosed: captureClosed,
    CaptureStopped: captureStopped,
    DeviceNotSupported: deviceNotSupported,
    MarkerChanges: markerChanges,
};

/*
Expose functions.
*/
window.PerceptionToolkit.Functions = {
    initializeExperience,
    closeExperience() {
        console.log('closeExperience')
    }
};

if (window.PerceptionToolkit.config.onload) {
    window.PerceptionToolkit.config.onload.call(null);
}

/**
 * Perform a device support test, then load the loader & on boarding.
 */
const load = new Promise(async (resolve) => {
    console.log('loadObject', this);

    // Detect the necessary support.
    const deviceSupport = new DeviceSupport();
    deviceSupport.addDetector(GetUserMediaSupport);
    deviceSupport.addDetector(WasmSupport);
    const support = await deviceSupport.detect();

    // If everything necessary is supported, inject the loader and show it if
    // desired.
    if (support[GetUserMediaSupport.name] && support[WasmSupport.name]) {
        resolve(true);
    } else {
        resolve(false);
    }
});

/**
 * Initialize the experience.
 */
async function initializeExperience() {
    console.log('initializeExperience', this);

    const supported = await load;
    if (!supported) {
        const deviceNotSupportedEvt = fire(deviceNotSupported, window);
        if (!deviceNotSupportedEvt.defaultPrevented) {
            alert('Sorry, this browser does not support the required features')
        }
        return;
    }

    const {config} = window.PerceptionToolkit;
    const {detectionMode = 'passive'} = config;

    const {initialize, close} = await import('./main.js');

    // Now the experience has begun, update the closeExperience fn.
    window.PerceptionToolkit.Functions.closeExperience = close;
    initialize({detectionMode});
}

/*
    Bootstrap function
*/
(async function () {
    console.log('iifBootstrap', this);

    const supported = await load;
    const {config} = window.PerceptionToolkit;
    const {buttonVisibilityClass = 'visible'} = config;
    const getStarted = config.button ? config.button :
        config.buttonSelector ? document.body.querySelector(config.buttonSelector) :
            null;

    if (!getStarted) {
        return;
    }

    getStarted.classList.toggle(buttonVisibilityClass, supported);

    // When getStarted is clicked, load the experience.
    getStarted.addEventListener('click', (e) => {
        // If the button was visible and the user clicked it, show the no support
        // card here.
        if (!supported) {
            alert('Sorry, this browser does not support the required features');
            return;
        }

        getStarted.classList.remove(buttonVisibilityClass);
        initializeExperience();
    });

    window.addEventListener(captureStopped, () => {
        console.log('captureStopped', this)
    });
})();
//# sourceMappingURL=bootstrap.js.map
