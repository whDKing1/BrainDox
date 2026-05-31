"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeIcon = void 0;
const vue_1 = require("vue");
exports.MinimizeIcon = (0, vue_1.defineComponent)({
    render() {
        return ((0, vue_1.h)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
            (0, vue_1.h)("path", { d: "M4 18v2h6.586L2 28.582L3.414 30L12 21.414V28h2V18H4z", fill: "currentColor" }),
            (0, vue_1.h)("path", { d: "M30 3.416L28.592 2L20 10.586V4h-2v10h10v-2h-6.586L30 3.416z", fill: "currentColor" })));
    }
});
