/**
 * Vibrates the user's device if supported.
 */
export function vibrate(pattern = 200) {
    if (!('vibrate' in navigator)) {
        return;
    }
    navigator.vibrate(pattern);
}

//# sourceMappingURL=vibrate.js.map
