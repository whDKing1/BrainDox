"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
const tagDark = {
    name: 'Tag',
    common: common_1.commonDark,
    self(vars) {
        const { textColor2, primaryColorHover, primaryColorPressed, primaryColor, infoColor, successColor, warningColor, errorColor, baseColor, borderColor, tagColor, opacityDisabled, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, borderRadiusSmall: borderRadius, fontSizeMini, fontSizeTiny, fontSizeSmall, fontSizeMedium, heightMini, heightTiny, heightSmall, heightMedium, buttonColor2Hover, buttonColor2Pressed, fontWeightStrong } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { closeBorderRadius: borderRadius, heightTiny: heightMini, heightSmall: heightTiny, heightMedium: heightSmall, heightLarge: heightMedium, borderRadius,
            opacityDisabled, fontSizeTiny: fontSizeMini, fontSizeSmall: fontSizeTiny, fontSizeMedium: fontSizeSmall, fontSizeLarge: fontSizeMedium, fontWeightStrong, 
            // checked
            textColorCheckable: textColor2, textColorHoverCheckable: textColor2, textColorPressedCheckable: textColor2, textColorChecked: baseColor, colorCheckable: '#0000', colorHoverCheckable: buttonColor2Hover, colorPressedCheckable: buttonColor2Pressed, colorChecked: primaryColor, colorCheckedHover: primaryColorHover, colorCheckedPressed: primaryColorPressed, 
            // default
            border: `1px solid ${borderColor}`, textColor: textColor2, color: tagColor, colorBordered: '#0000', closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeColorHover,
            closeColorPressed, borderPrimary: `1px solid ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}`, textColorPrimary: primaryColor, colorPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.16 }), colorBorderedPrimary: '#0000', closeIconColorPrimary: (0, seemly_1.scaleColor)(primaryColor, { lightness: 0.7 }), closeIconColorHoverPrimary: (0, seemly_1.scaleColor)(primaryColor, { lightness: 0.7 }), closeIconColorPressedPrimary: (0, seemly_1.scaleColor)(primaryColor, {
                lightness: 0.7
            }), closeColorHoverPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.16 }), closeColorPressedPrimary: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.12 }), borderInfo: `1px solid ${(0, seemly_1.changeColor)(infoColor, { alpha: 0.3 })}`, textColorInfo: infoColor, colorInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.16 }), colorBorderedInfo: '#0000', closeIconColorInfo: (0, seemly_1.scaleColor)(infoColor, { alpha: 0.7 }), closeIconColorHoverInfo: (0, seemly_1.scaleColor)(infoColor, { alpha: 0.7 }), closeIconColorPressedInfo: (0, seemly_1.scaleColor)(infoColor, { alpha: 0.7 }), closeColorHoverInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.16 }), closeColorPressedInfo: (0, seemly_1.changeColor)(infoColor, { alpha: 0.12 }), borderSuccess: `1px solid ${(0, seemly_1.changeColor)(successColor, { alpha: 0.3 })}`, textColorSuccess: successColor, colorSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.16 }), colorBorderedSuccess: '#0000', closeIconColorSuccess: (0, seemly_1.scaleColor)(successColor, { alpha: 0.7 }), closeIconColorHoverSuccess: (0, seemly_1.scaleColor)(successColor, { alpha: 0.7 }), closeIconColorPressedSuccess: (0, seemly_1.scaleColor)(successColor, { alpha: 0.7 }), closeColorHoverSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.16 }), closeColorPressedSuccess: (0, seemly_1.changeColor)(successColor, { alpha: 0.12 }), borderWarning: `1px solid ${(0, seemly_1.changeColor)(warningColor, { alpha: 0.3 })}`, textColorWarning: warningColor, colorWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.16 }), colorBorderedWarning: '#0000', closeIconColorWarning: (0, seemly_1.scaleColor)(warningColor, { alpha: 0.7 }), closeIconColorHoverWarning: (0, seemly_1.scaleColor)(warningColor, { alpha: 0.7 }), closeIconColorPressedWarning: (0, seemly_1.scaleColor)(warningColor, { alpha: 0.7 }), closeColorHoverWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.16 }), closeColorPressedWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.11 }), borderError: `1px solid ${(0, seemly_1.changeColor)(errorColor, { alpha: 0.3 })}`, textColorError: errorColor, colorError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.16 }), colorBorderedError: '#0000', closeIconColorError: (0, seemly_1.scaleColor)(errorColor, { alpha: 0.7 }), closeIconColorHoverError: (0, seemly_1.scaleColor)(errorColor, { alpha: 0.7 }), closeIconColorPressedError: (0, seemly_1.scaleColor)(errorColor, { alpha: 0.7 }), closeColorHoverError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.16 }), closeColorPressedError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.12 }) });
    }
};
exports.default = tagDark;
