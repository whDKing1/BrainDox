"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const floatButtonDark = {
    name: 'FloatButton',
    common: common_1.commonDark,
    self(vars) {
        const { popoverColor, textColor2, buttonColor2Hover, buttonColor2Pressed, primaryColor, primaryColorHover, primaryColorPressed, baseColor, borderRadius } = vars;
        return {
            color: popoverColor,
            textColor: textColor2,
            boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
            boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
            boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)',
            colorHover: buttonColor2Hover,
            colorPressed: buttonColor2Pressed,
            colorPrimary: primaryColor,
            colorPrimaryHover: primaryColorHover,
            colorPrimaryPressed: primaryColorPressed,
            textColorPrimary: baseColor,
            borderRadiusSquare: borderRadius
        };
    }
};
exports.default = floatButtonDark;
