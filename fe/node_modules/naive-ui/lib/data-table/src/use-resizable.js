"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizable = useResizable;
const vue_1 = require("vue");
const utils_1 = require("./utils");
function useResizable() {
    const resizableWidthsRef = (0, vue_1.ref)({});
    function getResizableWidth(key) {
        return resizableWidthsRef.value[key];
    }
    function doUpdateResizableWidth(column, width) {
        if ((0, utils_1.isColumnResizable)(column) && 'key' in column) {
            resizableWidthsRef.value[column.key] = width;
        }
    }
    function clearResizableWidth() {
        resizableWidthsRef.value = {};
    }
    return {
        getResizableWidth,
        doUpdateResizableWidth,
        clearResizableWidth
    };
}
