export const GetUserMediaSupport = {
    name: 'getUserMedia',
    supported: async () => {
        return 'mediaDevices' in self.navigator &&
            'getUserMedia' in self.navigator.mediaDevices;
    }
};
//# sourceMappingURL=get-user-media.js.map
