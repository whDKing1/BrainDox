"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIos = void 0;
exports.isIos = (typeof window === 'undefined'
    ? false
    : /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    !window.MSStream;
function useIsIos() {
    return exports.isIos;
}
exports.default = useIsIos;
