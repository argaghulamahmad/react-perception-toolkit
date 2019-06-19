/**
 * Clamps a number between `min` and `max` values. Both `min` and `max` are
 * optional.
 *
 * ```javascript
 * clamp(100, 0, 40);  // 40.
 * ```
 */
export function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
    return Math.max(min, Math.min(max, value));
}

//# sourceMappingURL=clamp.js.map
