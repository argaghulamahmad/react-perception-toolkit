/**
 * Convert a timeout to a Promise.
 *
 * ```
 * await timeout(100);  // 100ms wait.
 * ```
 */
export function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

//# sourceMappingURL=timeout.js.map
