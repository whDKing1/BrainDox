"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnResize = useOnResize;
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
function useOnResize(elRef, onResize) {
    // it needn't be reactive since it's for internal usage
    if (onResize) {
        (0, vue_1.onMounted)(() => {
            const { value: el } = elRef;
            if (el) {
                vueuc_1.resizeObserverManager.registerHandler(el, onResize);
            }
        });
        // avoid memory leak
        (0, vue_1.watch)(elRef, (_, oldEl) => {
            if (oldEl) {
                vueuc_1.resizeObserverManager.unregisterHandler(oldEl);
            }
        }, {
            deep: false
        });
        (0, vue_1.onBeforeUnmount)(() => {
            const { value: el } = elRef;
            if (el) {
                vueuc_1.resizeObserverManager.unregisterHandler(el);
            }
        });
    }
}
