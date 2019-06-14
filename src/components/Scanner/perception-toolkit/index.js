export const importPerceptionToolkit = async () => {
    await import('./lib/src/polyfill/barcode-detector')
        .then(module => {
            window.BarcodeDetector = class CustomBarcodeDetectorPolyfill extends module.BarcodeDetectorPolyfill {
                constructor() {
                    /*Hardcoded the script for the worker to run for now.
                    TODO: add webpack worker loader to handle dynamically named worker script*/
                    super('barcode-detector_worker.js');
                }
            }
        });
    await import('./lib/perception-toolkit/bootstrap')
        .then(module => {
            console.log('perceptionToolkit installed!', {module});
        })
};
