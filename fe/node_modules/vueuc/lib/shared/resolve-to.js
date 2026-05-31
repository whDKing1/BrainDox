"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTo = resolveTo;
function resolveTo(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }
    return selector() || null;
}
