"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function useFalseUntilTruthy(originalRef) {
    const currentRef = (0, vue_1.ref)(!!originalRef.value);
    if (currentRef.value)
        return (0, vue_1.readonly)(currentRef);
    const stop = (0, vue_1.watch)(originalRef, (value) => {
        if (value) {
            currentRef.value = true;
            stop();
        }
    });
    return (0, vue_1.readonly)(currentRef);
}
exports.default = useFalseUntilTruthy;
