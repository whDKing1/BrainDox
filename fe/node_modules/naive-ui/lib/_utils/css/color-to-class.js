"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color2Class = color2Class;
function color2Class(color) {
    return color.replace(/#|\(|\)|,|\s|\./g, '_');
}
