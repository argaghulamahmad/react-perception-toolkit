import {DeviceSupport} from '../src/support/device-support.js';
import {GetUserMediaSupport} from '../src/support/get-user-media.js';
import {WasmSupport} from '../src/support/wasm.js';
import {fire} from '../src/utils/fire.js';
import {cameraAccessDenied, captureClosed, captureStopped, markerChanges} from './events.js';

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
        // Replaced when main.ts has loaded.
    }
};

if (window.PerceptionToolkit.config.onload) {
    window.PerceptionToolkit.config.onload.call(null);
}

/**
 * Perform a device support test, then load the loader & onboarding.
 */
const load = new Promise(async (resolve) => {
    console.log('load object', this);

    const {config} = window.PerceptionToolkit;

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
    console.log('initialize experience', this);

    const supported = await load;
    if (!supported) {
        const deviceNotSupportedEvt = fire(deviceNotSupported, window);
        if (!deviceNotSupportedEvt.defaultPrevented) {
            console.log('Sorry, this browser does not support the required features')
            /*
            TODO implement this method
            addCardToPage({
                cls: 'no-support',
                msg: 'Sorry, this browser does not support the required features',
            });*/
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
TODO implement this method
function addCardToPage({ msg = '', cls = '' }) {
}*/

/*
    Bootstrap function
*/
(async function () {
    console.log('new modified bootstrap function', this);

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
            /*
            TODO create method add this info to the scanner component
            addCardToPage({
                cls: 'no-support',
                msg: 'Sorry, this browser does not support the required features',
            });*/
            return;
        }

        getStarted.classList.remove(buttonVisibilityClass);
        initializeExperience();
    });

    /*
    TODO implement add evt listener to react close button
    // When captureclose is fired, show the button again.
    window.addEventListener(captureStopped, () => {
        getStarted.classList.add(buttonVisibilityClass);
    });*/
})();
//# sourceMappingURL=bootstrap.js.map
