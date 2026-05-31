"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScrollTop = getScrollTop;
exports.getRect = getRect;
function getScrollTop(target) {
    return target instanceof HTMLElement ? target.scrollTop : window.scrollY;
}
function getRect(target) {
    return target instanceof HTMLElement
        ? target.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight };
}
