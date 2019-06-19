import {clamp} from './clamp.js';

function easeOut(value) {
    return 1 - Math.pow(1 - value, 3);
}

const animations = new WeakMap();

/**
 * Fades an element using `requestAnimationFrame`. Takes a parameter detailing
 * the animation, which is an object containing `to` (`0 <= to <= 1`), `from`
 * (`0 <= to <= 1`), duration (milliseconds), and `ease` (a function that takes
 * a value between `0` and `1` and returns a new value, also between `0` and
 * `1`) properties.
 *
 * ```javascript
 * fade(someElement, { from: 1, to: 1, duration: 200, ease: (v) => v })
 * ```
 *
 * @param target The element to fade.
 */
export function fade(target, {from = 1, to = 0, duration = 250, ease = easeOut} = {}) {
    return new Promise((resolve) => {
        const existingAnimation = animations.get(target);
        if (existingAnimation) {
            cancelAnimationFrame(existingAnimation.id);
            animations.delete(target);
            existingAnimation.resolve();
        }
        target.style.opacity = from.toString();
        const start = self.performance.now();
        const update = () => {
            const now = self.performance.now();
            const time = clamp((now - start) / duration, 0, 1);
            const value = from + ((to - from) * ease(time));
            target.style.opacity = value.toString();
            if (time < 1) {
                animations.set(target, {id: requestAnimationFrame(update), resolve});
            } else {
                target.style.opacity = to.toString();
                animations.delete(target);
                resolve();
            }
        };
        animations.set(target, {id: requestAnimationFrame(update), resolve});
    });
}

//# sourceMappingURL=fade.js.map
