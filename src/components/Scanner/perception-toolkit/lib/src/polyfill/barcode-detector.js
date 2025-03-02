import {isImageData} from '../utils/is-image-data.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./barcode-detector.worker.js'

export class BarcodeDetectorPolyfill {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.hasLoaded = false;
        let prefix = '/';
        this.worker = new Worker();
        console.log('barcode-detector.worker.js', this.worker);
        this.worker.postMessage(prefix);
        this.isReadyInternal = new Promise((resolve, reject) => {
            this.worker.onmessage = (e) => {
                if (e.data === 'ready') {
                    this.hasLoaded = true;
                    resolve(this.hasLoaded);
                } else {
                    reject(new Error('Unexpected worker response'));
                }
            };
        });

        window.addEventListener('unload', () => {
            this.worker.terminate();
        });
    }

    get isReady() {
        return this.isReadyInternal;
    }

    async detect(pixels) {
        if (!this.hasLoaded) {
            return null;
        }
        return new Promise(async (resolve) => {
            let imageData;
            if (isImageData(pixels)) {
                imageData = pixels;
            } else {
                this.canvas.width = pixels.naturalWidth;
                this.canvas.height = pixels.naturalHeight;
                this.ctx.drawImage(pixels, 0, 0);
                imageData =
                    this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            }
            this.worker.onmessage = (evt) => {
                resolve(evt.data);
            };
            this.worker.postMessage(imageData);
        });
    }
}

// Prevent overwriting the built-in.

if (!('BarcodeDetector' in self)) {
    const script = document.currentScript;
    window.BarcodeDetector = BarcodeDetectorPolyfill;
    BarcodeDetectorPolyfill.loadedFrom = new URL(script.src, window.location.toString());
}
//# sourceMappingURL=barcode-detector.js.map
