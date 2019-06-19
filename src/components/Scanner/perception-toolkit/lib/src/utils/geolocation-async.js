/**
 * A convenience function that remaps the Geolocation API to a Promise.
 *
 * ```javascript
 * const location = await geolocation();
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
export async function geolocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((e) => resolve(e.coords), reject);
    });
}

//# sourceMappingURL=geolocation-async.js.map
