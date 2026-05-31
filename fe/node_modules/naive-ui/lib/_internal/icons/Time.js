"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const replaceable_1 = require("./replaceable");
exports.default = (0, replaceable_1.replaceable)('time', () => ((0, vue_1.h)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    (0, vue_1.h)("path", { d: "M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z", style: "\n        fill: none;\n        stroke: currentColor;\n        stroke-miterlimit: 10;\n        stroke-width: 32px;\n      " }),
    (0, vue_1.h)("polyline", { points: "256 128 256 272 352 272", style: "\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        stroke-width: 32px;\n      " }))));
