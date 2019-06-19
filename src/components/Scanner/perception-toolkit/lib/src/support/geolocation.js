export const GeolocationSupport = {
    name: 'geolocation',
    supported: async () => {
        return 'geolocation' in self.navigator;
    }
};
//# sourceMappingURL=geolocation.js.map
