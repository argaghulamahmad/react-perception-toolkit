import {detectBarcodes} from '../src/detectors/barcode.js';

/*import { ActionButton } from '../src/elements/action-button/action-button.js';
import { Card } from '../src/elements/card/card.js';
import {OnboardingCard} from '../src/elements/onboarding-card/onboarding-card.js';*/

import {DotLoader} from '../src/elements/dot-loader/dot-loader.js';
import {hideOverlay, showOverlay} from '../src/elements/overlay/overlay.js';
import {closeEvent, frameEvent, StreamCapture} from '../src/elements/stream-capture/stream-capture.js';
import {supportsEnvironmentCamera} from '../src/utils/environment-camera.js';
import {fire} from '../src/utils/fire.js';
import {DEBUG_LEVEL, enableLogLevel, log} from '../src/utils/logger.js';
import {vibrate} from '../src/utils/vibrate.js';

/*
import { MeaningMaker } from './meaning-maker.js';
*/

import {cameraAccessDenied, markerChanges, markerDetect} from './events.js';

export {vibrate} from '../src/utils/vibrate.js';
/*export { Card } from '../src/elements/card/card.js';
export { ActionButton } from '../src/elements/action-button/action-button.js';*/

const detectedMarkers = new Map();

/*
const meaningMaker = new MeaningMaker();
*/

// Register custom elements.
customElements.define(StreamCapture.defaultTagName, StreamCapture);
/*customElements.define(Card.defaultTagName, Card);
customElements.define(ActionButton.defaultTagName, ActionButton);*/

// Register events.
window.addEventListener(frameEvent, onCaptureFrame);
window.addEventListener('offline', onConnectivityChanged);
window.addEventListener('online', onConnectivityChanged);

// Log errors by default.
enableLogLevel(DEBUG_LEVEL.ERROR);

// While the onboarding begins, attempt a fake detection. If the polyfill is
// necessary, or the detection fails, we should find out.
const polyfillPrefix = window.PerceptionToolkit.config.root || '';

// TODO: Attempt the correct detection based on the target types.
const attemptDetection = detectBarcodes(new ImageData(1, 1), {polyfillPrefix});

/**
 * Initialize
 */
export async function initialize(opts) {
    console.log('initialize opts', this);

    /*const onboarding = document.querySelector(OnboardingCard.defaultTagName);
    if (!onboarding) {
        beginDetection(opts);
        return;
    }
    // When onboarding is finished, start the stream and remove the loader.
    onboarding.addEventListener(OnboardingCard.onboardingFinishedEvent, () => {
        onboarding.remove();
        beginDetection(opts);
    });*/

    beginDetection(opts);
}

/**
 * Begin Detection
 */
async function beginDetection({detectionMode = 'passive', sitemapUrl}) {
    console.log('begin detection', this);
    try {
        // Wait for the faked detection to resolve.
        await attemptDetection;

        /*// Initialize MeaningMaker
        await meaningMaker.init();
        if (sitemapUrl) {
            await meaningMaker.loadArtifactsFromJsonldUrl(new URL(sitemapUrl, document.URL));
        }*/

        // Create the stream.
        await createStreamCapture(detectionMode);
    } catch (e) {
        log(e.message, DEBUG_LEVEL.ERROR, 'Begin detection');
    }
}

/**
 * Whenever we find nearby content, show it
 * TODO modify this
 */
/*async function updateContentDisplay(contentDiff) {
    console.log('updateContentDisplay', this);
    const {cardContainer} = window.PerceptionToolkit.config;
    // Prevent multiple cards from showing.
    if (!cardContainer || cardContainer.hasChildNodes()) {
        return;
    }
    for (const {content} of contentDiff.found) {
        // Create a card for every found marker.
        const card = new Card();
        card.src = content;
        cardContainer.appendChild(card);
    }
}*/

/*
 * Handle Marker discovery
 * TODO modify this
 */
/*async function onMarkerFound(evt) {
    console.log('onMarkerFound', this);
    const {detail} = evt;
    const marker = {type: 'qrcode', value: detail};

    // Update the UI
    const contentDiffs = await meaningMaker.markerFound(marker);
    const markerChangeEvt = fire(markerChanges, capture, contentDiffs);
    // If the developer prevents default on the marker changes event then don't
    // handle the UI updates; they're doing it themselves.
    if (markerChangeEvt.defaultPrevented) {
        return;
    }
    updateContentDisplay(contentDiffs);

    vibrate(200);
}*/

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
    /*
        capture.addEventListener(markerDetect, onMarkerFound);
    */
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
    /*const onboarding = document.querySelector(OnboardingCard.defaultTagName);
    if (!onboarding) {
        return;
    }
    onboarding.remove();*/
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
    // TODO: Expand with other types besides barcodes.
    const markers = await detectBarcodes(imgData, {polyfillPrefix});

    //get one of several markers then display it to user
    let mark = markers[0];
    if (mark.rawValue !== 'undefined') {
        console.log(mark)
        alert(mark.rawValue);
    }

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
            const marker = {type: 'qrcode', value};
            // removals.push(meaningMaker.markerLost(marker));
            detectedMarkers.delete(value);
        }
        // Wait for all dealer removals to conclude.
        await Promise.all(removals);
        isProcessingCapture = false;
    }, 1000);

    /*// Hide the loader if there is one.
    const loader = document.querySelector(DotLoader.defaultTagName);
    if (!loader) {
        return;
    }
    loader.remove();*/
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
