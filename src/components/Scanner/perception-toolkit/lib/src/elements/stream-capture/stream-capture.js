import {clamp} from '../../utils/clamp.js';
import {fire} from '../../utils/fire.js';

export const captureStopped = 'pt.capturestopped';
/**
 * The name for captured frame events.
 */
export const frameEvent = 'pt.captureframe';
/**
 * The name for start capture events.
 */
export const startEvent = 'pt.capturestarted';
/**
 * The name for stop capture events.
 */
export const stopEvent = 'pt.capturestopped';
/**
 * The name for stop capture events.
 */
export const closeEvent = 'pt.captureclose';

export class StreamCapture {

    constructor() {
        /**
         * The sample scale, intended to go between `0` and `1` (though clamped only
         * to `0` in case you wish to sample at a larger scale).
         */
        this.captureScale = 0.5;
        /**
         * How often to capture the stream in ms, where `0` represents never.
         * Note that you can cause performance issues if `captureRate` is higher than
         * the speed at which the captured pixels can be processed.
         */
        this.captureRate = 0;
        /**
         * Whether to capture a PNG `HTMLImageElement` instead of `ImageData`
         * (the default).
         */
        this.capturePng = false;
        /**
         * Whether to flip the stream's image.
         */
        this.flipped = false;
        /**
         * Whether to pause the frame.
         */
        this.paused = false;

        const {layoutRefs} = window.PerceptionToolkit.StreamCapture;
        console.log('layoutRefs', layoutRefs);

        const {container, reticle, reticleBox, maskOuter, maskInner} = layoutRefs;
        this.containerRef = container;
        this.reticleRef = reticle;
        this.reticleBoxRef = reticleBox;
        this.maskOuterRef = maskOuter;
        this.maskInnerRef = maskInner;

        this.root = this.containerRef;
        this.lastCapture = -1;
        this.root.addEventListener('click', (evt) => {
            const clicked = evt.path ? evt.path[0] : evt.composedPath()[0];
            if (clicked.id !== 'close') {
                return;
            }
            fire(closeEvent, this.root);
        });

        console.log('StreamCapture', this);
    }

    /**
     * Starts the capture of the stream.
     */
    start(stream) {
        console.log('stream');

        if (this.stream) {
            throw new Error('Stream already provided. Stop the capture first.');
        }
        this.stream = stream;
        this.initElementsIfNecessary();
        const scale = clamp(this.captureScale, 0);
        const video = this.video;
        const update = (now) => {
            if (!this.video || !this.ctx) {
                return;
            }
            if (!this.paused) {
                this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth * scale, this.video.videoHeight * scale);
            }
            if (this.captureRate !== 0 && now - this.lastCapture > this.captureRate) {
                this.lastCapture = now;
                this.captureFrame();
            }
            requestAnimationFrame((now) => update(now));
        };
        video.muted = true;
        video.srcObject = this.stream;
        video.play();
        video.addEventListener('playing', async () => {
            if (!this.video || !this.canvas || !this.ctx) {
                return;
            }
            // There appears to be some form of condition where video playback can
            // commence without the video dimensions being populated in Chrome. As
            // such we attempt to wait some frames first.
            let frameCount = 5;
            let redoCheck = true;
            while (redoCheck) {
                frameCount--;
                await new Promise((resolve) => requestAnimationFrame(resolve));
                redoCheck = frameCount > 0 &&
                    (this.video.videoWidth === 0 || this.video.videoHeight === 0);
            }
            // Should we arrive here without video dimensions we throw.

            if (this.video.videoWidth === 0 || this.video.videoHeight === 0) {
                throw new Error('Video has width or height of 0');
            }

            this.canvas.width = this.video.videoWidth * this.captureScale;
            this.canvas.height = this.video.videoHeight * this.captureScale;
            this.setReticleOrientation(this.canvas.height > this.canvas.width);
            // Flip the canvas if -- say -- the camera is pointing at the user.
            if (this.flipped) {
                this.ctx.translate(this.canvas.width * 0.5, 0);
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.canvas.width * 0.5, 0);
            }
            requestAnimationFrame((now) => {
                update(now);
                fire(startEvent, this.root);
            });
        }, {once: true});
    }

    /**
     * Manually captures a frame. Intended to be used when `captureRate` is `0`.
     */
    async captureFrame() {
        console.log('captureFrame', this);

        if (!this.ctx || !this.canvas) {
            throw new Error('Unable to capture frame');
        }
        return new Promise((resolve) => {
            const canvas = this.canvas;
            const ctx = this.ctx;
            let imgData;
            if (this.capturePng) {
                imgData = new Image();
                imgData.src = canvas.toDataURL('image/png');
                imgData.onload = () => {
                    if (this.captureRate !== 0) {
                        fire(frameEvent, this.root, {imgData});
                    }
                    resolve(imgData);
                };
            } else {
                imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                if (this.captureRate !== 0) {
                    fire(frameEvent, this.root, {imgData});
                }
                resolve(imgData);
            }
        });
    }

    /**
     * Stops the stream.
     */
    stop() {
        console.log('stop', this);
        if (!this.stream || !this.ctx || !this.canvas) {
            return;
        }
        const tracks = this.stream.getTracks();
        for (const track of tracks) {
            track.stop();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.remove();
        this.video = undefined;
        this.stream = undefined;
        this.canvas = undefined;
        this.ctx = undefined;
        fire(stopEvent, this.root);
    }

    setReticleOrientation(vertical) {
        console.log('setReticleOrientation');

        const reticle = this.reticleRef;

        if (!reticle) {
            return;
        }
        if (vertical) {
            reticle.setAttribute('viewBox', '0 0 100 133');
            const maskOuter = this.maskOuterRef;
            const maskInner = this.maskInnerRef;
            const reticleBox = this.reticleBoxRef;

            if (!maskOuter || !maskInner || !reticleBox) {
                return;
            }
            maskOuter.setAttribute('width', '100');
            maskOuter.setAttribute('height', '133');
            maskInner.setAttribute('x', '8');
            maskInner.setAttribute('y', '24');
            reticleBox.setAttribute('width', '100');
            reticleBox.setAttribute('height', '133');
        }
        reticle.style.opacity = '1';
    }

    initElementsIfNecessary() {
        console.log('initElementsIfNecessary', this.root);

        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.containerRef.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            if (!this.ctx) {
                throw new Error('Unable to create canvas context');
            }
        }

        if (!this.video) {
            this.video = document.createElement('video');
        }
    }
}
