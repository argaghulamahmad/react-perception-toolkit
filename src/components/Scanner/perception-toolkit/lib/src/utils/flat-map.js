/**
 * The flatMap() method first maps each element using a mapping function, then flattens the result into a new array.
 * It is identical to a map followed by a flat of depth 1.
 */
export function flatMapPolyfill(arr, callback) {
    // As per: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
    // flatMap is equivalent to map + flat, or reduce + concat.
    // flat() is not available on all platforms, so using reduce + concat
    return arr.reduce((acc, x, i, arr) => {
        const val = callback(x, i, arr);
        if (Array.isArray(val)) {
            return acc.concat(val);
        } else {
            acc.push(val);
            return acc;
        }
    }, []);
}

export function flatMap(arr, callback, thisArg) {
    if ('flatMap' in Array.prototype) {
        // ts-ignore used to pass karma tests.  TS complains flatMap() is not defined, even though we are feature detecting.
        // @ts-ignore
        return arr.flatMap(callback);
    } else {
        return flatMapPolyfill(arr, callback);
    }
}

//# sourceMappingURL=flat-map.js.map
