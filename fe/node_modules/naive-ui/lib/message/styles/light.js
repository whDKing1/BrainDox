"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColor2, closeIconColor, closeIconColorHover, closeIconColorPressed, infoColor, successColor, errorColor, warningColor, popoverColor, boxShadow2, primaryColor, lineHeight, borderRadius, closeColorHover, closeColorPressed } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { closeBorderRadius: borderRadius, textColor: textColor2, textColorInfo: textColor2, textColorSuccess: textColor2, textColorError: textColor2, textColorWarning: textColor2, textColorLoading: textColor2, color: popoverColor, colorInfo: popoverColor, colorSuccess: popoverColor, colorError: popoverColor, colorWarning: popoverColor, colorLoading: popoverColor, boxShadow: boxShadow2, boxShadowInfo: boxShadow2, boxShadowSuccess: boxShadow2, boxShadowError: boxShadow2, boxShadowWarning: boxShadow2, boxShadowLoading: boxShadow2, iconColor: textColor2, iconColorInfo: infoColor, iconColorSuccess: successColor, iconColorWarning: warningColor, iconColorError: errorColor, iconColorLoading: primaryColor, closeColorHover,
        closeColorPressed,
        closeIconColor,
        closeIconColorHover,
        closeIconColorPressed, closeColorHoverInfo: closeColorHover, closeColorPressedInfo: closeColorPressed, closeIconColorInfo: closeIconColor, closeIconColorHoverInfo: closeIconColorHover, closeIconColorPressedInfo: closeIconColorPressed, closeColorHoverSuccess: closeColorHover, closeColorPressedSuccess: closeColorPressed, closeIconColorSuccess: closeIconColor, closeIconColorHoverSuccess: closeIconColorHover, closeIconColorPressedSuccess: closeIconColorPressed, closeColorHoverError: closeColorHover, closeColorPressedError: closeColorPressed, closeIconColorError: closeIconColor, closeIconColorHoverError: closeIconColorHover, closeIconColorPressedError: closeIconColorPressed, closeColorHoverWarning: closeColorHover, closeColorPressedWarning: closeColorPressed, closeIconColorWarning: closeIconColor, closeIconColorHoverWarning: closeIconColorHover, closeIconColorPressedWarning: closeIconColorPressed, closeColorHoverLoading: closeColorHover, closeColorPressedLoading: closeColorPressed, closeIconColorLoading: closeIconColor, closeIconColorHoverLoading: closeIconColorHover, closeIconColorPressedLoading: closeIconColorPressed, loadingColor: primaryColor, lineHeight,
        borderRadius, border: '0' });
}
const messageLight = {
    name: 'Message',
    common: common_1.commonLight,
    self
};
exports.default = messageLight;
