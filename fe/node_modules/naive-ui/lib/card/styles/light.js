"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { primaryColor, borderRadius, lineHeight, fontSize, cardColor, textColor2, textColor1, dividerColor, fontWeightStrong, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, modalColor, boxShadow1, popoverColor, actionColor } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { lineHeight, color: cardColor, colorModal: modalColor, colorPopover: popoverColor, colorTarget: primaryColor, colorEmbedded: actionColor, colorEmbeddedModal: actionColor, colorEmbeddedPopover: actionColor, textColor: textColor2, titleTextColor: textColor1, borderColor: dividerColor, actionColor, titleFontWeight: fontWeightStrong, closeColorHover,
        closeColorPressed, closeBorderRadius: borderRadius, closeIconColor,
        closeIconColorHover,
        closeIconColorPressed, fontSizeSmall: fontSize, fontSizeMedium: fontSize, fontSizeLarge: fontSize, fontSizeHuge: fontSize, boxShadow: boxShadow1, borderRadius });
}
const cardLight = {
    name: 'Card',
    common: common_1.commonLight,
    self
};
exports.default = cardLight;
