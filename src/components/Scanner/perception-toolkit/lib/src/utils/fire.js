/**
 * A convenience function for firing custom events.
 *
 * ```javascript
 * fire('eventname', someElement, {foo: 'bar'});
 * ```
 */
export function fire(name, target, detail) {
    const evt = new CustomEvent(name, {bubbles: true, detail});
    target.dispatchEvent(evt);
    return evt;
}

//# sourceMappingURL=fire.js.map
