"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'Photo',
    render() {
        return ((0, vue_1.h)("svg", { viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
            (0, vue_1.h)("g", { fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
                (0, vue_1.h)("path", { d: "M15 8h.01" }),
                (0, vue_1.h)("rect", { x: "4", y: "4", width: "16", height: "16", rx: "3" }),
                (0, vue_1.h)("path", { d: "M4 15l4-4a3 5 0 0 1 3 0l5 5" }),
                (0, vue_1.h)("path", { d: "M14 14l1-1a3 5 0 0 1 3 0l2 2" }))));
    }
});
