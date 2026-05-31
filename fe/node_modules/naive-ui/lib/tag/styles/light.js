"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColor2, primaryColorHover, primaryColorPressed, primaryColor, infoColor, successColor, warningColor, errorColor, baseColor, borderColor, opacityDisabled, tagColor, closeIconColor, closeIconColorHover, closeIconColorPressed, borderRadiusSmall: borderRadius, fontSizeMini, fontSizeTiny, fontSizeSmall, fontSizeMedium, heightMini, heightTiny, heightSmall, heightMedium, closeColorHover, closeColorPressed, buttonColor2Hover, buttonColor2Pressed, fontWeightStrong } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { closeBorderRadius: borderRadius, heightTiny: heightMini, heightSmall: heightTiny, heightMedium: heightSmall, heightLarge: heightMedium, borderRadius,
        opacityDisabled, fontSizeTiny: fontSizeMini, fontSizeSmall: fontSizeTiny, fontSizeMedium: fontSizeSmall, fontSizeLarge: fontSizeMedium, fontWeightStrong, 
        // checked
        textColorCheckable: textColor2, textColorHoverCheckable: textColor2, textColorPressedCheckable: textColor2, textColorChecked: baseColor, colorCheckable: '#0000', colorHoverCheckable: buttonColor2Hover, colorPressedCheckable: buttonColor2Pressed, colorChecked: primaryColor, colorCheckedHover: primaryColorHover, colorCheckedPressed: primaryColorPressed, 
        // default
        border: `1px solid ${borderColor}`, textColor: textColor2, color: tagColor, colorBordered: 'rgb(250, 250, 252)', closeIconColor,
        closeIconColorHover,
        closeIconColorPressed,
        closeColorHover,
        closeColorPressed, borderPrimary: `1px solid ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}`, textColorPrimary: primaryColor, colorPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.12 }), colorBorderedPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), closeIconColorPrimary: primaryColor, closeIconColorHoverPrimary: primaryColor, closeIconColorPressedPrimary: primaryColor, closeColorHoverPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.12 }), closeColorPressedPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.18 }), borderInfo: `1px solid ${(0, seemly_1.changeColor)(infoColor, { alpha: 0.3 })}`, textColorInfo: infoColor, colorInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.12 }), colorBorderedInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.1 }), closeIconColorInfo: infoColor, closeIconColorHoverInfo: infoColor, closeIconColorPressedInfo: infoColor, closeColorHoverInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.12 }), closeColorPressedInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.18 }), borderSuccess: `1px solid ${(0, seemly_1.changeColor)(successColor, { alpha: 0.3 })}`, textColorSuccess: successColor, colorSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.12 }), colorBorderedSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.1 }), closeIconColorSuccess: successColor, closeIconColorHoverSuccess: successColor, closeIconColorPressedSuccess: successColor, closeColorHoverSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.12 }), closeColorPressedSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.18 }), borderWarning: `1px solid ${(0, seemly_1.changeColor)(warningColor, { alpha: 0.35 })}`, textColorWarning: warningColor, colorWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.15 }), colorBorderedWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.12 }), closeIconColorWarning: warningColor, closeIconColorHoverWarning: warningColor, closeIconColorPressedWarning: warningColor, closeColorHoverWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.12 }), closeColorPressedWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.18 }), borderError: `1px solid ${(0, seemly_1.changeColor)(errorColor, { alpha: 0.23 })}`, textColorError: errorColor, colorError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.1 }), colorBorderedError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.08 }), closeIconColorError: errorColor, closeIconColorHoverError: errorColor, closeIconColorPressedError: errorColor, closeColorHoverError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.12 }), closeColorPressedError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.18 }) });
}
const tagLight = {
    name: 'Tag',
    common: common_1.commonLight,
    self
};
exports.default = tagLight;
