import zIndexManager from './z-index-manager';
const ctx = '@@ziContext';
// We don't expect manually bound zindex should be changed
const zindexable = {
    mounted(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        el[ctx] = {
            enabled: !!enabled,
            initialized: false
        };
        if (enabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
    },
    updated(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        const cachedEnabled = el[ctx].enabled;
        if (enabled && !cachedEnabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
        el[ctx].enabled = !!enabled;
    },
    unmounted(el, bindings) {
        if (!el[ctx].initialized)
            return;
        const { value = {} } = bindings;
        const { zIndex } = value;
        zIndexManager.unregister(el, zIndex);
    }
};
export default zindexable;
