export const WasmSupport = {
    name: 'wasm',
    supported: async () => {
        return 'WebAssembly' in self;
    }
};
//# sourceMappingURL=wasm.js.map
