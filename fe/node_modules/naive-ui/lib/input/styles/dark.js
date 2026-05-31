"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColor2, textColor3, textColorDisabled, primaryColor, primaryColorHover, inputColor, inputColorDisabled, warningColor, warningColorHover, errorColor, errorColorHover, borderRadius, lineHeight, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightTiny, heightSmall, heightMedium, heightLarge, clearColor, clearColorHover, clearColorPressed, placeholderColor, placeholderColorDisabled, iconColor, iconColorDisabled, iconColorHover, iconColorPressed, fontWeight } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { fontWeight, countTextColorDisabled: textColorDisabled, countTextColor: textColor3, heightTiny,
        heightSmall,
        heightMedium,
        heightLarge,
        fontSizeTiny,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge,
        lineHeight, lineHeightTextarea: lineHeight, borderRadius, iconSize: '16px', groupLabelColor: inputColor, textColor: textColor2, textColorDisabled, textDecorationColor: textColor2, groupLabelTextColor: textColor2, caretColor: primaryColor, placeholderColor,
        placeholderColorDisabled, color: inputColor, colorDisabled: inputColorDisabled, colorFocus: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), groupLabelBorder: '1px solid #0000', border: '1px solid #0000', borderHover: `1px solid ${primaryColorHover}`, borderDisabled: '1px solid #0000', borderFocus: `1px solid ${primaryColorHover}`, boxShadowFocus: `0 0 8px 0 ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}`, loadingColor: primaryColor, 
        // warning
        loadingColorWarning: warningColor, borderWarning: `1px solid ${warningColor}`, borderHoverWarning: `1px solid ${warningColorHover}`, colorFocusWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.1 }), borderFocusWarning: `1px solid ${warningColorHover}`, boxShadowFocusWarning: `0 0 8px 0 ${(0, seemly_1.changeColor)(warningColor, {
            alpha: 0.3
        })}`, caretColorWarning: warningColor, 
        // error
        loadingColorError: errorColor, borderError: `1px solid ${errorColor}`, borderHoverError: `1px solid ${errorColorHover}`, colorFocusError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.1 }), borderFocusError: `1px solid ${errorColorHover}`, boxShadowFocusError: `0 0 8px 0 ${(0, seemly_1.changeColor)(errorColor, {
            alpha: 0.3
        })}`, caretColorError: errorColor, clearColor,
        clearColorHover,
        clearColorPressed,
        iconColor,
        iconColorDisabled,
        iconColorHover,
        iconColorPressed, suffixTextColor: textColor2 });
}
const inputDark = (0, _mixins_1.createTheme)({
    name: 'Input',
    common: common_1.commonDark,
    peers: {
        Scrollbar: styles_1.scrollbarDark
    },
    self
});
exports.default = inputDark;
