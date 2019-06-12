/*
TODO delete this file because this code has relocated to scanner component
function init() {
    window.PerceptionToolkit = window.PerceptionToolkit || {};
}

export default async function () {
    init();
    await import('./perception-toolkit/lib/src/polyfill/barcode-detector')
        .then(module => {
            window.BarcodeDetector = class CustomBarcodeDetectorPolyfill extends module.BarcodeDetectorPolyfill {
                constructor() {
                    // hardcode the script for the worker to run for now
                    // TODO: add webpack worker loader to handle dynamically named worker script
                    super('/barcode-detector_worker.js');
                }
            }
        });
    await import('./perception-toolkit/lib/perception-toolkit/bootstrap')
        .then(module => {
        console.log('perceptionToolkit installed!', {module});
    })
};
*/
