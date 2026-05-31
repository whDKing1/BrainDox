"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { primaryColor, successColor, warningColor, errorColor, infoColor, fontWeightStrong } = vars;
    return {
        fontWeight: fontWeightStrong,
        rotate: '252deg',
        colorStartPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.6 }),
        colorEndPrimary: primaryColor,
        colorStartInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.6 }),
        colorEndInfo: infoColor,
        colorStartWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.6 }),
        colorEndWarning: warningColor,
        colorStartError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.6 }),
        colorEndError: errorColor,
        colorStartSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.6 }),
        colorEndSuccess: successColor
    };
}
const gradientTextLight = {
    name: 'GradientText',
    common: common_1.commonLight,
    self
};
exports.default = gradientTextLight;
