"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTouchEvent = isTouchEvent;
function isTouchEvent(e) {
    return window.TouchEvent && e instanceof window.TouchEvent;
}
