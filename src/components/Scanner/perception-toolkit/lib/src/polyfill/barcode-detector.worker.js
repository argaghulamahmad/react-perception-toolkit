function getDetectorModule() {
    return self.Module;
}

class WasmBarcodeDetector {
    process(data) {
        const Module = getDetectorModule();
        const format = '';
        const fileData = data.data;
        const buffer = Module._malloc(fileData.length);
        Module.HEAPU8.set(fileData, buffer);
        const result = Module.readBarcodeFromPng(data.data, data.width, data.height);
        Module._free(buffer);
        if (result.text) {
            return [{rawValue: result.text}];
        }
        return [];
    }
}

const detector = new WasmBarcodeDetector();
self.onmessage = (e) => {
    // Initializing.
    if (typeof e.data === 'string') {
        const pathPrefix = e.data;
        self.Module = {
            locateFile(url) {
                if (url.endsWith('.wasm')) {
                    return `${pathPrefix}third_party/zxing/${url}`;
                }
                return url;
            },
            onRuntimeInitialized() {
                self.postMessage('ready');
            }
        }; // Cast as WasmModule because the import will augment.
        if ('importScripts' in self) {
            // Import the emscripten'd file that loads the wasm.
            importScripts(`${pathPrefix}third_party/zxing/zxing_reader.js`);
        }
        return;
    }
    const data = detector.process(e.data);
    self.postMessage(data);
};
//# sourceMappingURL=barcode-detector_worker.js.map
