import {DeviceSupport} from '../src/support/device-support.js';
import {GetUserMediaSupport} from '../src/support/get-user-media.js';
import {WasmSupport} from '../src/support/wasm.js';
import {fire} from '../src/utils/fire.js';
import {cameraAccessDenied, captureClosed, captureStopped, markerChanges, markerDetect} from './events.js';
import {detectBarcodes} from '../src/detectors/barcode.js';
import {closeEvent, frameEvent, StreamCapture} from '../src/elements/stream-capture/stream-capture.js';
import {supportsEnvironmentCamera} from '../src/utils/environment-camera.js';
import {DEBUG_LEVEL, enableLogLevel, log} from '../src/utils/logger.js';

const {config} = window.PerceptionToolkit;
const deviceNotSupported = 'pt.devicenotsupported';
const detectedMarkers = new Map();
const polyfillPrefix = window.PerceptionToolkit.config.root || '';
const attemptDetection = detectBarcodes(new ImageData(1, 1), {polyfillPrefix});
const capture = new StreamCapture();
let isProcessingCapture = false;
let hintTimeout;

const {layoutRefs} = window.PerceptionToolkit.StreamCapture;
console.log('layoutRefs', layoutRefs);

const {container, reticle, reticleBox, maskOuter, maskInner, canvas} = layoutRefs;

enableLogLevel(DEBUG_LEVEL.ERROR);

window.addEventListener(frameEvent, onCaptureFrame);
window.addEventListener('offline', onConnectivityChanged);
window.addEventListener('online', onConnectivityChanged);

window.PerceptionToolkit.config = window.PerceptionToolkit.config || {};

window.PerceptionToolkit.CapturedContent = {
    detail: null
};

window.PerceptionToolkit.Events = {
    CameraAccessDenied: cameraAccessDenied,
    CaptureClosed: captureClosed,
    CaptureStopped: captureStopped,
    DeviceNotSupported: deviceNotSupported,
    MarkerChanges: markerChanges,
};

window.PerceptionToolkit.Functions = {
    initializeExperience,
    closeExperience() {
        console.log('closeExperience')
    },
    callbackFunction: config.callback
};

if (window.PerceptionToolkit.config.onload) {
    window.PerceptionToolkit.config.onload.call(null);
}

/**
 * Perform a device support test.
 */
const deviceSupportTest = new Promise(async (resolve) => {
    console.log('deviceSupportTest', this);

    // Detect the necessary support.
    const deviceSupport = new DeviceSupport();
    deviceSupport.addDetector(GetUserMediaSupport);
    deviceSupport.addDetector(WasmSupport);
    const support = await deviceSupport.detect();

    console.log('support', support);

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

    //Check result of device support test.
    const supported = await deviceSupportTest;
    console.log('supported', supported);

    if (!supported) {
        const deviceNotSupportedEvt = fire(deviceNotSupported, window);
        if (!deviceNotSupportedEvt.defaultPrevented) {
            alert('Sorry, this browser does not support the required features')
        }
        return;
    }

    const {detectionMode = 'passive'} = config;

    // Now the experience has begun, update the closeExperience fn.
    window.PerceptionToolkit.Functions.closeExperience = close;

    // Start detection
    beginDetection(detectionMode).then('beginDetection');
}

/**
 * Begin Detection
 */
async function beginDetection({detectionMode = 'passive'}) {
    console.log('beginDetection', this);

    try {
        // Wait for the faked detection to resolve.
        await attemptDetection;

        // Create the stream.
        await createStreamCapture(detectionMode);
    } catch (e) {
        log(e.message, DEBUG_LEVEL.ERROR, 'Begin detection');
    }
}

/*
* Check whether the variable is a function.
* */
const isFunction = func => func && {}.toString.call(func) === '[object Function]';

/*
Handle Marker discovery
*/
async function onMarkerFound(evt) {
    console.log('onMarkerFound', evt, this);

    // Display barcodeContent to the user.
    let barcodeContent = evt.detail;
    console.log('barcodeContent', barcodeContent);

    // Run the callback function.
    let {callbackFunction} = window.PerceptionToolkit.Functions;
    if (isFunction(callbackFunction)) {
        callbackFunction(barcodeContent);
    }

    // Save barcode content so that the react component can access it.
    window.PerceptionToolkit.CapturedContent.detail = barcodeContent;
}

/**
 * Creates the stream an initializes capture.
 */
async function createStreamCapture(detectionMode) {
    console.log('createStreamCapture', this);

    if (detectionMode === 'passive') {
        capture.captureRate = 600;
    } else {
        console.log('Tap to capture');
        capture.root.addEventListener('click', async () => {
            capture.paused = true;
            console.log('Processing...');
            const imgData = await capture.captureFrame();
            fire(frameEvent, capture, {imgData, detectionMode});
        });
    }

    capture.root.captureScale = 0.8;
    capture.root.addEventListener(closeEvent, close);
    capture.root.addEventListener(markerDetect, onMarkerFound);

    const streamOpts = {
        video: {
            facingMode: 'environment'
        }
    };

    // Attempt to get access to the user's camera.
    try {
        let stream = await navigator.mediaDevices.getUserMedia(streamOpts);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasEnvCamera = await supportsEnvironmentCamera(devices);
        capture.flipped = !hasEnvCamera;
        // Ensure the stream is stopped and started when the user changes tabs.
        let isRequestingNewStream = false;
        window.addEventListener('visibilitychange', async () => {
            if (isRequestingNewStream || capture.parentNode === null) {
                return;
            }
            if (document.hidden) {
                capture.stop();
            } else {
                // Block multiple requests for a new stream.
                isRequestingNewStream = true;
                stream = await navigator.mediaDevices.getUserMedia(streamOpts);
                isRequestingNewStream = false;
                // Bail if the document is hidden again.
                if (document.hidden) {
                    return;
                }
                // Ensure the capture is definitely stopped before starting a new one.
                capture.stop();
                capture.start(stream);
            }
        });
        capture.start(stream);
        hintTimeout = setTimeout(() => {
            console.log('Make sure the marker is inside the box.');
        }, config.hintTimeout || 5000);
    } catch (e) {
        // User has denied or there are no cameras.
        fire(cameraAccessDenied, window);
    }
}

export function close() {
    console.log('close', this);

    capture.stop();
    clearTimeout(hintTimeout);
}

/**
 * Processes the image data captured by the StreamCapture class, and hands off
 * the image data to the detector for processing.
 *
 * @param evt The Custom Event containing the captured frame data.
 */
async function onCaptureFrame(evt) {
    console.log('onCaptureFrame', this);

    // Prevent overloading the capture process.
    if (isProcessingCapture) {
        return;
    }
    isProcessingCapture = true;
    const capture = evt.target;
    const {detail} = evt;
    const {detectionMode, imgData} = detail;

    console.log('imgData', imgData);

    const markers = await detectBarcodes(imgData, {polyfillPrefix});

    for (const marker of markers) {
        const markerAlreadyDetected = detectedMarkers.has(marker.rawValue);
        // Update the last time for this marker.
        detectedMarkers.set(marker.rawValue, self.performance.now());
        if (markerAlreadyDetected) {
            continue;
        }
        // Only fire the event if the marker is freshly detected.
        fire(markerDetect, capture, marker.rawValue);
    }
    if (markers.length > 0) {
        // Hide the hint if it's shown. Cancel it if it's pending.
        clearTimeout(hintTimeout);
        console.log('Marker length > 0');
    } else if (detectionMode && detectionMode === 'active') {
        console.log('No markers found');
    }
    capture.paused = false;

    // Provide a cool-off before allowing another detection. This aids the case
    // where a recently-scanned markers are mistakenly re-scanned.
    setTimeout(async () => {
        const now = self.performance.now();
        const removals = [];
        for (const [value, timeLastSeen] of detectedMarkers.entries()) {
            if (now - timeLastSeen < 1000) {
                continue;
            }
            detectedMarkers.delete(value);
        }
        // Wait for all dealer removals to conclude.
        await Promise.all(removals);
        isProcessingCapture = false;
    }, 1000);
}

/**
 * Handles connectivity change for the user.
 */
function onConnectivityChanged() {
    console.log('onConnectivityChanged', this);

    const connected = navigator.onLine;
    if (!container) {
        return;
    }
    if (!connected) {
        console.log('Currently offline. Please reconnect to the network.');
    } else {
        console.log('Already online.')
    }
}
