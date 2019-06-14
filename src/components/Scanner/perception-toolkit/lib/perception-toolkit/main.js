import {detectBarcodes} from '../src/detectors/barcode.js';
import {hideOverlay, showOverlay} from '../src/elements/overlay/overlay.js';
import {closeEvent, frameEvent, StreamCapture} from '../src/elements/stream-capture/stream-capture.js';
import {supportsEnvironmentCamera} from '../src/utils/environment-camera.js';
import {fire} from '../src/utils/fire.js';
import {DEBUG_LEVEL, enableLogLevel, log} from '../src/utils/logger.js';
import {vibrate} from '../src/utils/vibrate.js';
import {cameraAccessDenied, markerDetect} from './events.js';

export {vibrate} from '../src/utils/vibrate.js';

/*
* Detected Markers
*/
const detectedMarkers = new Map();

/*
Register custom elements.
*/
customElements.define(StreamCapture.defaultTagName, StreamCapture);

/*
Register events.
*/
window.addEventListener(frameEvent, onCaptureFrame);
window.addEventListener('offline', onConnectivityChanged);
window.addEventListener('online', onConnectivityChanged);

/*
Log errors by default.
*/
enableLogLevel(DEBUG_LEVEL.ERROR);

/*
While the on boarding begins, attempt a fake detection. If the polyfill is
necessary, or the detection fails, we should find out.
*/
const polyfillPrefix = window.PerceptionToolkit.config.root || '';

/*
TODO: Attempt the correct detection based on the target types.
*/
const attemptDetection = detectBarcodes(new ImageData(1, 1), {polyfillPrefix});

/**
 * Initialize
 */
export async function initialize(opts) {
    console.log('initializeMain', this);
    let detection = beginDetection(opts);
    console.log('detection', detection)
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
Handle Marker discovery
*/
async function onMarkerFound(evt) {
    console.log('onMarkerFound', evt, this);

    //display barcodeContent to the user
    let barcodeContent = evt.detail;
    console.log('barcodeContent', barcodeContent);
    alert(barcodeContent);

    //TODO try to save barcodeContent at window object
    //TODO implement handle marker discovery, as an example connect this function with a web service
    //TODO passing function from react component to this function to add above functionality

    vibrate(200);
}

let hintTimeout;
const capture = new StreamCapture();

/**
 * Creates the stream an initializes capture.
 */
async function createStreamCapture(detectionMode) {
    console.log('createStreamCapture', this);

    if (detectionMode === 'passive') {
        capture.captureRate = 600;
    } else {
        showOverlay('Tap to capture');
        capture.addEventListener('click', async () => {
            capture.paused = true;
            showOverlay('Processing...');
            const imgData = await capture.captureFrame();
            fire(frameEvent, capture, {imgData, detectionMode});
        });
    }

    capture.captureScale = 0.8;
    capture.addEventListener(closeEvent, close);
    capture.addEventListener(markerDetect, onMarkerFound);

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
        document.body.appendChild(capture);
        hintTimeout = setTimeout(() => {
            showOverlay('Make sure the marker is inside the box.');
        }, window.PerceptionToolkit.config.hintTimeout || 5000);
    } catch (e) {
        // User has denied or there are no cameras.
        fire(cameraAccessDenied, window);
    }
}

export function close() {
    console.log('close', this);

    capture.stop();
    capture.remove();
    hideOverlay();
    clearTimeout(hintTimeout);
}

let isProcessingCapture = false;

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

    // TODO: Expand with other types besides barcodes.
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
        hideOverlay();
    } else if (detectionMode && detectionMode === 'active') {
        showOverlay('No markers found');
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
    const capture = document.body.querySelector(StreamCapture.defaultTagName);
    if (!capture) {
        return;
    }
    if (!connected) {
        showOverlay('Currently offline. Please reconnect to the network.');
    } else {
        hideOverlay();
    }
}

//# sourceMappingURL=main.js.map
