"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../../_styles/common");
const styles_1 = require("../../../popover/styles");
const _common_1 = __importDefault(require("./_common"));
const internalSelectionDark = {
    name: 'InternalSelection',
    common: common_1.commonDark,
    peers: {
        Popover: styles_1.popoverDark
    },
    self(vars) {
        const { borderRadius, textColor2, textColorDisabled, inputColor, inputColorDisabled, primaryColor, primaryColorHover, warningColor, warningColorHover, errorColor, errorColorHover, iconColor, iconColorDisabled, clearColor, clearColorHover, clearColorPressed, placeholderColor, placeholderColorDisabled, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightTiny, heightSmall, heightMedium, heightLarge, fontWeight } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { fontWeight,
            fontSizeTiny,
            fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            heightTiny,
            heightSmall,
            heightMedium,
            heightLarge,
            borderRadius, 
            // default
            textColor: textColor2, textColorDisabled,
            placeholderColor,
            placeholderColorDisabled, color: inputColor, colorDisabled: inputColorDisabled, colorActive: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), border: '1px solid #0000', borderHover: `1px solid ${primaryColorHover}`, borderActive: `1px solid ${primaryColor}`, borderFocus: `1px solid ${primaryColorHover}`, boxShadowHover: 'none', boxShadowActive: `0 0 8px 0 ${(0, seemly_1.changeColor)(primaryColor, {
                alpha: 0.4
            })}`, boxShadowFocus: `0 0 8px 0 ${(0, seemly_1.changeColor)(primaryColor, {
                alpha: 0.4
            })}`, caretColor: primaryColor, arrowColor: iconColor, arrowColorDisabled: iconColorDisabled, loadingColor: primaryColor, 
            // warning
            borderWarning: `1px solid ${warningColor}`, borderHoverWarning: `1px solid ${warningColorHover}`, borderActiveWarning: `1px solid ${warningColor}`, borderFocusWarning: `1px solid ${warningColorHover}`, boxShadowHoverWarning: 'none', boxShadowActiveWarning: `0 0 8px 0 ${(0, seemly_1.changeColor)(warningColor, {
                alpha: 0.4
            })}`, boxShadowFocusWarning: `0 0 8px 0 ${(0, seemly_1.changeColor)(warningColor, {
                alpha: 0.4
            })}`, colorActiveWarning: (0, seemly_1.changeColor)(warningColor, { alpha: 0.1 }), caretColorWarning: warningColor, 
            // error
            borderError: `1px solid ${errorColor}`, borderHoverError: `1px solid ${errorColorHover}`, borderActiveError: `1px solid ${errorColor}`, borderFocusError: `1px solid ${errorColorHover}`, boxShadowHoverError: 'none', boxShadowActiveError: `0 0 8px 0 ${(0, seemly_1.changeColor)(errorColor, {
                alpha: 0.4
            })}`, boxShadowFocusError: `0 0 8px 0 ${(0, seemly_1.changeColor)(errorColor, {
                alpha: 0.4
            })}`, colorActiveError: (0, seemly_1.changeColor)(errorColor, { alpha: 0.1 }), caretColorError: errorColor, clearColor,
            clearColorHover,
            clearColorPressed });
    }
};
exports.default = internalSelectionDark;
