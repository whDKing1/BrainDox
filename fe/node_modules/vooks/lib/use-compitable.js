"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function useCompitable(reactive, keys) {
    // @ts-expect-error
    return (0, vue_1.computed)(() => {
        for (const key of keys) {
            if (reactive[key] !== undefined)
                return reactive[key];
        }
        return reactive[keys[keys.length - 1]];
    });
}
exports.default = useCompitable;
