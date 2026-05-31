"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeVShowFalse = isNodeVShowFalse;
const vue_1 = require("vue");
function isNodeVShowFalse(vNode) {
    var _a;
    const showDir = (_a = vNode.dirs) === null || _a === void 0 ? void 0 : _a.find(({ dir }) => dir === vue_1.vShow);
    return !!(showDir && showDir.value === false);
}
