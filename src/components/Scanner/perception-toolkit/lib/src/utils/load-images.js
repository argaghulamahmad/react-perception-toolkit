export async function loadImages(paths) {
    const images = paths.map((path) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onerror = reject;
            img.onload = () => resolve(img);
        });
    });
    return await Promise.all(images);
}

//# sourceMappingURL=load-images.js.map
