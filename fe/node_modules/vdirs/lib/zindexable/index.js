"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const z_index_manager_1 = require("./z-index-manager");
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
            z_index_manager_1.default.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
    },
    updated(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        const cachedEnabled = el[ctx].enabled;
        if (enabled && !cachedEnabled) {
            z_index_manager_1.default.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
        el[ctx].enabled = !!enabled;
    },
    unmounted(el, bindings) {
        if (!el[ctx].initialized)
            return;
        const { value = {} } = bindings;
        const { zIndex } = value;
        z_index_manager_1.default.unregister(el, zIndex);
    }
};
exports.default = zindexable;
