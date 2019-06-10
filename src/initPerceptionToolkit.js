function init() {
    window.PerceptionToolkit = window.PerceptionToolkit || {};
    window.PerceptionToolkit.config = {
        // Debug level.
        debugLevel: 'verbose',
    }
}

export default async function () {
    init();
    await import('perception-toolkit/lib/perception-toolkit/bootstrap')
        .then(module => {
        console.log('perceptionToolkit installed!', {module});
    })
};
