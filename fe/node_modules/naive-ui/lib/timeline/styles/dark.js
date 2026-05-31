"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
const timelineDark = {
    name: 'Timeline',
    common: common_1.commonDark,
    self(vars) {
        const { textColor3, infoColorSuppl, errorColorSuppl, successColorSuppl, warningColorSuppl, textColor1, textColor2, railColor, fontWeightStrong, fontSize } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { contentFontSize: fontSize, titleFontWeight: fontWeightStrong, circleBorder: `2px solid ${textColor3}`, circleBorderInfo: `2px solid ${infoColorSuppl}`, circleBorderError: `2px solid ${errorColorSuppl}`, circleBorderSuccess: `2px solid ${successColorSuppl}`, circleBorderWarning: `2px solid ${warningColorSuppl}`, iconColor: textColor3, iconColorInfo: infoColorSuppl, iconColorError: errorColorSuppl, iconColorSuccess: successColorSuppl, iconColorWarning: warningColorSuppl, titleTextColor: textColor1, contentTextColor: textColor2, metaTextColor: textColor3, lineColor: railColor });
    }
};
exports.default = timelineDark;
