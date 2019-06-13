/*import { ActionButton, Card } from '../src/elements/index.js';*/
import {DeviceSupport} from '../src/support/device-support.js';
import {GetUserMediaSupport} from '../src/support/get-user-media.js';
import {WasmSupport} from '../src/support/wasm.js';
import {fire} from '../src/utils/fire.js';
import {cameraAccessDenied, captureClosed, captureStopped, markerChanges} from './events.js';

const deviceNotSupported = 'pt.devicenotsupported';
window.PerceptionToolkit.config = window.PerceptionToolkit.config || {};
// Expose events.
window.PerceptionToolkit.Events = {
    CameraAccessDenied: cameraAccessDenied,
    CaptureClosed: captureClosed,
    CaptureStopped: captureStopped,
    DeviceNotSupported: deviceNotSupported,
    MarkerChanges: markerChanges,
};

// Expose elements.
/*window.PerceptionToolkit.Elements = {
    ActionButton,
    Card
};*/

// Expose functions.
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
    const {config} = window.PerceptionToolkit;
    const {showLoaderDuringBoot = true} = config;
    // Detect the necessary support.
    const deviceSupport = new DeviceSupport();
    deviceSupport.addDetector(GetUserMediaSupport);
    deviceSupport.addDetector(WasmSupport);
    const support = await deviceSupport.detect();
    // If everything necessary is supported, inject the loader and show it if
    // desired.
    if (support[GetUserMediaSupport.name] && support[WasmSupport.name]) {
        const {showLoader} = await import('./loader.js');
        // Only show the loader if requested.
        if (showLoaderDuringBoot) {
            showLoader();
        }
        // Conditionally load the onboarding.
        if (config.onboarding && config.onboardingImages) {
            await import('./onboarding.js');
        }
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
        /*const {hideLoader} = await import('./loader.js');
        hideLoader();*/
        const deviceNotSupportedEvt = fire(deviceNotSupported, window);
        if (!deviceNotSupportedEvt.defaultPrevented) {
            /*
            TODO create method add this info to the scanner component
            addCardToPage({
                cls: 'no-support',
                msg: 'Sorry, this browser does not support the required features',
            });*/
        }
        return;
    }
    const {showLoader, hideLoader} = await import('./loader.js');
    const {config} = window.PerceptionToolkit;
    const {sitemapUrl, detectionMode = 'passive'} = config;
    if (config && config.onboardingImages && config.onboarding) {
        hideLoader();
        const {startOnboardingProcess} = await import('./onboarding.js');
        await startOnboardingProcess(config.onboardingImages);
    }
    showLoader();
    const {initialize, close} = await import('./main.js');
    // Now the experience is inited, update the closeExperience fn.
    window.PerceptionToolkit.Functions.closeExperience = close;
    initialize({detectionMode, sitemapUrl});
}

/*
TODO modify this function so this method has functionality to send info to the scanner component
function addCardToPage({ msg = '', cls = '' }) {
    if (!customElements.get(Card.defaultTagName)) {
        customElements.define(Card.defaultTagName, Card);
    }
    const { config } = window.PerceptionToolkit;
    const { cardContainer = document.body } = config;
    // If there is already a card, leave.
    if (cardContainer.querySelector(Card.defaultTagName)) {
        return;
    }
    const card = new Card();
    card.classList.add(cls);
    card.src = msg;
    cardContainer.appendChild(card);
    return;
}*/

// Bootstrap.
(async function () {
    console.log('bootstrap', this);
    const supported = await load;
    const {hideLoader, showLoader} = await import('./loader.js');
    const {config} = window.PerceptionToolkit;
    const {buttonVisibilityClass = 'visible'} = config;
    const getStarted = config.button ? config.button :
        config.buttonSelector ? document.body.querySelector(config.buttonSelector) :
            null;
    hideLoader();
    if (!getStarted) {
        return;
    }
    getStarted.classList.toggle(buttonVisibilityClass, supported);
    // When getStarted is clicked, load the experience.
    getStarted.addEventListener('click', (e) => {
        // If the button was visible and the user clicked it, show the no support
        // card here.
        if (!supported) {
            /*
            TODO create method add this info to the scanner component
            addCardToPage({
                cls: 'no-support',
                msg: 'Sorry, this browser does not support the required features',
            });*/
            return;
        }
        showLoader();
        getStarted.classList.remove(buttonVisibilityClass);
        initializeExperience();
    });
    // When captureclose is fired, show the button again.
    window.addEventListener(captureStopped, () => {
        getStarted.classList.add(buttonVisibilityClass);
    });
})();
//# sourceMappingURL=bootstrap.js.map
