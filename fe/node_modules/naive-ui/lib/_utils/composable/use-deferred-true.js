"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeferredTrue = useDeferredTrue;
const vue_1 = require("vue");
function useDeferredTrue(valueRef, delay, shouldDelayRef) {
    if (!delay)
        return valueRef;
    const delayedRef = (0, vue_1.ref)(valueRef.value);
    let timerId = null;
    (0, vue_1.watch)(valueRef, (value) => {
        if (timerId !== null)
            window.clearTimeout(timerId);
        if (value === true) {
            if (shouldDelayRef && !shouldDelayRef.value) {
                delayedRef.value = true;
            }
            else {
                timerId = window.setTimeout(() => {
                    delayedRef.value = true;
                }, delay);
            }
        }
        else {
            delayedRef.value = false;
        }
    });
    return delayedRef;
}
