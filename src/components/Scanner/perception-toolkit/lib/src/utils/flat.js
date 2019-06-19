/**
 * The flat() method creates a new array with all sub-array elements concatenated into it.
 * Unlike Array.prototoype.flat, does not support recursively flattening up to the specified depth.
 */
function flatPolyfill(arr, depth) {
    // As Per: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
    // flat() is equivalent to:
    const flatOnce = (arr) => arr.reduce((acc, val) => acc.concat(val), []);
    let ret = flatOnce(arr);
    // This will iteratively flatten, depth number of times.
    if (depth) {
        for (let i = 1; i < depth; i++) {
            ret = flatOnce(ret);
        }
    }
    return ret;
}

export function flat(arr, depth) {
    if ('flat' in Array.prototype) {
        // ts-ignore used to pass karma tests.  TS complains flat() is not defined, even though we are feature detecting.
        // @ts-ignore
        return arr.flat(depth);
    } else {
        return flatPolyfill(arr);
    }
}

//# sourceMappingURL=flat.js.map
