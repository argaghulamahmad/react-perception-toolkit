import {fire} from '../utils/fire.js';

export class DeviceSupport {
    constructor() {
        this.useEvents = false;
        this.detectors = new Map();
    }

    addDetector(detector) {
        const {name, supported} = detector;
        if (this.detectors.has(name)) {
            throw new Error(`${name} already added`);
        }
        this.detectors.set(name, supported);
    }

    removeDetector(name) {
        this.detectors.delete(name);
    }

    async detect() {
        const support = {};
        for (const [name, detector] of this.detectors) {
            support[name] = await detector();
        }
        if (this.useEvents) {
            fire(DeviceSupport.supportsEvent, self, support);
        }
        return support;
    }
}

DeviceSupport.supportsEvent = 'supports';
//# sourceMappingURL=device-support.js.map
