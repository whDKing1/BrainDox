"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { primaryColorHover, borderColor } = vars;
    return {
        resizableTriggerColorHover: primaryColorHover,
        resizableTriggerColor: borderColor
    };
}
const themeLight = {
    name: 'Split',
    common: common_1.commonLight,
    self
};
exports.default = themeLight;
