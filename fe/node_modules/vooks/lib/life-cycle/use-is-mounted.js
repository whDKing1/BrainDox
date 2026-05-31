"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function isMounted() {
    const isMounted = (0, vue_1.ref)(false);
    (0, vue_1.onMounted)(() => { isMounted.value = true; });
    return (0, vue_1.readonly)(isMounted);
}
exports.default = isMounted;
