"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { borderColor, primaryColor, baseColor, textColorDisabled, inputColorDisabled, textColor2, opacityDisabled, borderRadius, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightSmall, heightMedium, heightLarge, lineHeight } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { labelLineHeight: lineHeight, buttonHeightSmall: heightSmall, buttonHeightMedium: heightMedium, buttonHeightLarge: heightLarge, fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge, boxShadow: `inset 0 0 0 1px ${borderColor}`, boxShadowActive: `inset 0 0 0 1px ${primaryColor}`, boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.2 })}`, boxShadowHover: `inset 0 0 0 1px ${primaryColor}`, boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`, color: baseColor, colorDisabled: inputColorDisabled, colorActive: '#0000', textColor: textColor2, textColorDisabled, dotColorActive: primaryColor, dotColorDisabled: borderColor, buttonBorderColor: borderColor, buttonBorderColorActive: primaryColor, buttonBorderColorHover: borderColor, buttonColor: baseColor, buttonColorActive: baseColor, buttonTextColor: textColor2, buttonTextColorActive: primaryColor, buttonTextColorHover: primaryColor, opacityDisabled, buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}`, buttonBoxShadowHover: 'inset 0 0 0 1px #0000', buttonBoxShadow: 'inset 0 0 0 1px #0000', buttonBorderRadius: borderRadius });
}
const radioLight = {
    name: 'Radio',
    common: common_1.commonLight,
    self
};
exports.default = radioLight;
