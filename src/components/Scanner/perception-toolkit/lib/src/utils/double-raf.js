/**
 * Convert a double requestAnimationFrame to a Promise. This is primarily used
 * when you want to be confident that rendering changes will have taken hold.
 *
 * ```
 * await doubleRaf();  // Two frame wait.
 * ```
 */
export function doubleRaf() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
        });
    });
}

//# sourceMappingURL=double-raf.js.map
