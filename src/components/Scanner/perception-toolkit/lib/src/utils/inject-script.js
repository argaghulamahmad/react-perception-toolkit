/**
 * A convenience function for injecting scripts into the document head. The
 * `Promise` will either `resolve` (successful load) or `reject` (script error).
 *
 * ```javascript
 * await injectScript('/path/to/some/javascript.js');
 * ```
 */
export function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

//# sourceMappingURL=inject-script.js.map
