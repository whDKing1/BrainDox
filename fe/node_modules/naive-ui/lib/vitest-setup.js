"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("./_utils");
// Polyfill browser APIs
class _ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
function _matchMedia(query) {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false
    };
}
if ((0, _utils_1.isJsdom)() && typeof window !== 'undefined') {
    window.ResizeObserver = _ResizeObserver;
    window.matchMedia = _matchMedia;
}
// https://github.com/jsdom/jsdom/issues/1422
if (_utils_1.isBrowser) {
    HTMLDivElement.prototype.scrollTo = () => { };
}
