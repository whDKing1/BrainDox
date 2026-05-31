"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function useNow(interval, { type = 'number' }) {
    const isNumber = type === 'number';
    const nowRef = (0, vue_1.ref)(isNumber ? Date.now() : new Date());
    if (interval === false) {
        let id;
        (0, vue_1.onBeforeMount)(() => {
            id = setInterval(() => {
                nowRef.value = isNumber ? Date.now() : new Date();
            });
        });
        (0, vue_1.onBeforeUnmount)(() => {
            clearInterval(id);
        });
    }
    return nowRef;
}
exports.default = useNow;
