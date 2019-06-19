/**
 * Detects whether the user's device supports an environment-facing camera.
 *
 * **Note: calling this function will provide the user with a camera access
 * permission prompt, assuming one has not already been issued (such as for
 * `getUserMedia`). As such this API is best deferred until camera access has
 * been granted by the user.**
 *
 * ```javascript
 * const devices = await navigator.mediaDevices.enumerateDevices();
 * const supportsEnvironmentCamera =
 *    await EnvironmentCamera.supportsEnvironmentCamera(devices);
 * ```
 */
export async function supportsEnvironmentCamera(devices) {
    const cameras = devices.filter(t => t.kind === 'videoinput');
    return cameras.some((camera) => {
        if (!('getCapabilities' in camera)) {
            return false;
        }
        const capabilities = camera.getCapabilities();
        if (!capabilities.facingMode) {
            return false;
        }
        return capabilities.facingMode.find((f) => 'environment');
    });
}

//# sourceMappingURL=environment-camera.js.map
