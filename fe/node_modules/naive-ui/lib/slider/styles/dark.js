"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
const sliderDark = {
    name: 'Slider',
    common: common_1.commonDark,
    self(vars) {
        const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)';
        const { railColor, modalColor, primaryColorSuppl, popoverColor, textColor2, cardColor, borderRadius, fontSize, opacityDisabled } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { fontSize, markFontSize: fontSize, railColor, railColorHover: railColor, fillColor: primaryColorSuppl, fillColorHover: primaryColorSuppl, opacityDisabled, handleColor: '#FFF', dotColor: cardColor, dotColorModal: modalColor, dotColorPopover: popoverColor, handleBoxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)', handleBoxShadowHover: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)', handleBoxShadowActive: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)', handleBoxShadowFocus: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)', indicatorColor: popoverColor, indicatorBoxShadow: boxShadow, indicatorTextColor: textColor2, indicatorBorderRadius: borderRadius, dotBorder: `2px solid ${railColor}`, dotBorderActive: `2px solid ${primaryColorSuppl}`, dotBoxShadow: '' });
    }
};
exports.default = sliderDark;
