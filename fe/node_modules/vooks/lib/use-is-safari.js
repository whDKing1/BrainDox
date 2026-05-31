"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_is_ios_1 = require("./use-is-ios");
const isSafari = typeof window === 'undefined'
    ? false
    : use_is_ios_1.isIos || window.safari !== undefined;
function useIsSafari() {
    return isSafari;
}
exports.default = useIsSafari;
