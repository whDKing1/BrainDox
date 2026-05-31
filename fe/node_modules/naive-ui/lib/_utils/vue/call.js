"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.call = call;
function call(funcs, ...args) {
    if (Array.isArray(funcs)) {
        funcs.forEach(func => call(func, ...args));
    }
    else {
        return funcs(...args);
    }
}
