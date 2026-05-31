"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../styles");
function self(vars) {
    const { popoverColor, dividerColor, borderRadius } = vars;
    return {
        color: popoverColor,
        buttonBorderColor: dividerColor,
        borderRadiusSquare: borderRadius,
        boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)'
    };
}
const themeLight = {
    name: 'FloatButtonGroup',
    common: styles_1.commonLight,
    self
};
exports.default = themeLight;
