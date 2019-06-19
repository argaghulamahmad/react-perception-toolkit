export const importPerceptionToolkit = async () => {
    await import('./lib/src/polyfill/barcode-detector')
        .then(module => {
            window.BarcodeDetector = module.BarcodeDetectorPolyfill
        });
    await import('./lib/perception-toolkit/bootstrap')
        .then(module => {
            console.log('perceptionToolkit installed!', {module});
        })
};
