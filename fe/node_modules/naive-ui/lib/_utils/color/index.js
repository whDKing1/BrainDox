"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHoverColor = createHoverColor;
exports.createPressedColor = createPressedColor;
const seemly_1 = require("seemly");
function createHoverColor(rgb) {
    return (0, seemly_1.composite)(rgb, [255, 255, 255, 0.16]);
}
function createPressedColor(rgb) {
    return (0, seemly_1.composite)(rgb, [0, 0, 0, 0.12]);
}
