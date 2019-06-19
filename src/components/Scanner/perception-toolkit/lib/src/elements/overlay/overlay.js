import {styles} from './overlay.template.js';

const overlay = document.createElement('div');
const root = overlay.attachShadow({mode: 'open'});
root.innerHTML = `<style>${styles}</style><span class="content"><slot></slot></span>`;

/**
 * Shows an overlay message. If there is already an overlay message a second
 * call will update the message rather than create a new overlay.
 */
export function showOverlay(message, target = document.body) {
    overlay.textContent = message;
    target.appendChild(overlay);
    return overlay;
}

/**
 * Hides the overlay if there is one.
 */
export function hideOverlay() {
    overlay.remove();
}

//# sourceMappingURL=overlay.js.map
