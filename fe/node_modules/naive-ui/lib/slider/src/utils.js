"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTouchEvent = isTouchEvent;
exports.useRefs = useRefs;
const vue_1 = require("vue");
function isTouchEvent(e) {
    return window.TouchEvent && e instanceof window.TouchEvent;
}
function useRefs() {
    const refs = new Map();
    const setRefs = (index) => (el) => {
        refs.set(index, el);
    };
    (0, vue_1.onBeforeUpdate)(() => {
        refs.clear();
    });
    return [refs, setRefs];
}
