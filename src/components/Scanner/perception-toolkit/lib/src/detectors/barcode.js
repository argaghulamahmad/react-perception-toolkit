import {injectScript} from '../utils/inject-script.js';
import {DEBUG_LEVEL, log} from '../utils/logger.js';

let detector;

/**
 * Detects barcodes from image sources.
 */
export async function detectBarcodes(data, {context = window, forceNewDetector = false, polyfillRequired = false, polyfillPrefix = ''} = {}) {
    const loadPolyfill = polyfillRequired ||
        (context === window && !('BarcodeDetector' in context));
    if (loadPolyfill) {
        log('Using barcode detection polyfill', DEBUG_LEVEL.INFO, 'BarcodeDetector');
        await injectScript(`${polyfillPrefix}/lib/polyfills/barcode-detector.js`);
    }

    if (!detector || forceNewDetector) {
        detector = new context.BarcodeDetector();
    }

    if ('isReady' in detector) {
        await detector.isReady;
    }
    try {
        return await detector.detect(data);
    } catch (e) {
        // If the polyfill has loaded but there are still issues, exit.
        if (polyfillRequired) {
            return [];
        }
        log(`Detection failed: ${e.message}`, DEBUG_LEVEL.WARNING);
        return await detectBarcodes(data, {
            context,
            forceNewDetector,
            polyfillPrefix,
            polyfillRequired: true
        });
    }
}

//# sourceMappingURL=barcode.js.map
