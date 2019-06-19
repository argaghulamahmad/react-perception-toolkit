export const IntersectionObserverSupport = {
    name: 'IntersectionObserver',
    supported: async () => {
        return 'IntersectionObserver' in self &&
            'IntersectionObserverEntry' in self;
    }
};
//# sourceMappingURL=intersection-observer.js.map
