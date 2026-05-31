"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const use_breakpoints_1 = require("./use-breakpoints");
const utils_1 = require("./utils");
function useBreakpoint(screens) {
    if (!utils_1.isBrowser)
        return (0, vue_1.computed)(() => undefined);
    // pass ts check
    const breakpointsRef = screens !== undefined ? (0, use_breakpoints_1.default)(screens) : (0, use_breakpoints_1.default)();
    return (0, vue_1.computed)(() => {
        const { value } = breakpointsRef;
        if (value.length === 0)
            return undefined;
        return value[value.length - 1];
    });
}
exports.default = useBreakpoint;
