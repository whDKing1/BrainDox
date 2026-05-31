"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColor3, infoColor, errorColor, successColor, warningColor, textColor1, textColor2, railColor, fontWeightStrong, fontSize } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { contentFontSize: fontSize, titleFontWeight: fontWeightStrong, circleBorder: `2px solid ${textColor3}`, circleBorderInfo: `2px solid ${infoColor}`, circleBorderError: `2px solid ${errorColor}`, circleBorderSuccess: `2px solid ${successColor}`, circleBorderWarning: `2px solid ${warningColor}`, iconColor: textColor3, iconColorInfo: infoColor, iconColorError: errorColor, iconColorSuccess: successColor, iconColorWarning: warningColor, titleTextColor: textColor1, contentTextColor: textColor2, metaTextColor: textColor3, lineColor: railColor });
}
const timelineLight = {
    name: 'Timeline',
    common: common_1.commonLight,
    self
};
exports.default = timelineLight;
