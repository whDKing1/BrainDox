"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'Checkmark',
    render() {
        return ((0, vue_1.h)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
            (0, vue_1.h)("g", { fill: "none" },
                (0, vue_1.h)("path", { d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z", fill: "currentColor" }))));
    }
});
