"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
const vue_1 = require("vue");
function render(r, ...args) {
    if (typeof r === 'function') {
        return r(...args);
    }
    else if (typeof r === 'string') {
        return (0, vue_1.createTextVNode)(r);
    }
    else if (typeof r === 'number') {
        return (0, vue_1.createTextVNode)(String(r));
    }
    else {
        return null;
    }
}
