"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const gradientTextDark = {
    name: 'GradientText',
    common: common_1.commonDark,
    self(vars) {
        const { primaryColor, successColor, warningColor, errorColor, infoColor, primaryColorSuppl, successColorSuppl, warningColorSuppl, errorColorSuppl, infoColorSuppl, fontWeightStrong } = vars;
        return {
            fontWeight: fontWeightStrong,
            rotate: '252deg',
            colorStartPrimary: primaryColor,
            colorEndPrimary: primaryColorSuppl,
            colorStartInfo: infoColor,
            colorEndInfo: infoColorSuppl,
            colorStartWarning: warningColor,
            colorEndWarning: warningColorSuppl,
            colorStartError: errorColor,
            colorEndError: errorColorSuppl,
            colorStartSuccess: successColor,
            colorEndSuccess: successColorSuppl
        };
    }
};
exports.default = gradientTextDark;
