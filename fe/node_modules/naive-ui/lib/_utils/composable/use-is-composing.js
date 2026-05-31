"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsComposing = useIsComposing;
const vue_1 = require("vue");
const is_browser_1 = require("../env/is-browser");
const isComposingRef = (0, vue_1.ref)(false);
function compositionStartHandler() {
    isComposingRef.value = true;
}
function compositionEndHandler() {
    isComposingRef.value = false;
}
let mountedCount = 0;
function useIsComposing() {
    if (is_browser_1.isBrowser) {
        (0, vue_1.onBeforeMount)(() => {
            if (!mountedCount) {
                window.addEventListener('compositionstart', compositionStartHandler);
                window.addEventListener('compositionend', compositionEndHandler);
            }
            mountedCount++;
        });
        (0, vue_1.onBeforeUnmount)(() => {
            if (mountedCount <= 1) {
                window.removeEventListener('compositionstart', compositionStartHandler);
                window.removeEventListener('compositionend', compositionEndHandler);
                mountedCount = 0;
            }
            else {
                mountedCount--;
            }
        });
    }
    return isComposingRef;
}
