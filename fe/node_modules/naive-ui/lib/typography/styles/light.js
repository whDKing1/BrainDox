"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { primaryColor, textColor2, borderColor, lineHeight, fontSize, borderRadiusSmall, dividerColor, fontWeightStrong, textColor1, textColor3, infoColor, warningColor, errorColor, successColor, codeColor } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { aTextColor: primaryColor, blockquoteTextColor: textColor2, blockquotePrefixColor: borderColor, blockquoteLineHeight: lineHeight, blockquoteFontSize: fontSize, codeBorderRadius: borderRadiusSmall, liTextColor: textColor2, liLineHeight: lineHeight, liFontSize: fontSize, hrColor: dividerColor, headerFontWeight: fontWeightStrong, headerTextColor: textColor1, pTextColor: textColor2, pTextColor1Depth: textColor1, pTextColor2Depth: textColor2, pTextColor3Depth: textColor3, pLineHeight: lineHeight, pFontSize: fontSize, headerBarColor: primaryColor, headerBarColorPrimary: primaryColor, headerBarColorInfo: infoColor, headerBarColorError: errorColor, headerBarColorWarning: warningColor, headerBarColorSuccess: successColor, textColor: textColor2, textColor1Depth: textColor1, textColor2Depth: textColor2, textColor3Depth: textColor3, textColorPrimary: primaryColor, textColorInfo: infoColor, textColorSuccess: successColor, textColorWarning: warningColor, textColorError: errorColor, codeTextColor: textColor2, codeColor, codeBorder: '1px solid #0000' });
}
const typographyLight = {
    name: 'Typography',
    common: common_1.commonLight,
    self
};
exports.default = typographyLight;
