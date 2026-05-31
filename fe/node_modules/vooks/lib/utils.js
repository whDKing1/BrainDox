"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = exports.hasInstance = void 0;
const vue_1 = require("vue");
function hasInstance() {
    return (0, vue_1.getCurrentInstance)() !== null;
}
exports.hasInstance = hasInstance;
exports.isBrowser = typeof window !== 'undefined';
