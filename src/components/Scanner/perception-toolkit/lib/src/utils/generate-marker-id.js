/**
 * Convert a marker type (barcode, qrcode, etc) and its value into a unique id
 *
 */
export function generateMarkerId(type, value) {
    return type + '__' + value;
}

//# sourceMappingURL=generate-marker-id.js.map
