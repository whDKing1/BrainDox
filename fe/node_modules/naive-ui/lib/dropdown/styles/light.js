"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const use_theme_1 = require("../../_mixins/use-theme");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../popover/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { primaryColor, textColor2, dividerColor, hoverColor, popoverColor, invertedColor, borderRadius, fontSizeSmall, fontSizeMedium, fontSizeLarge, fontSizeHuge, heightSmall, heightMedium, heightLarge, heightHuge, textColor3, opacityDisabled } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { optionHeightSmall: heightSmall, optionHeightMedium: heightMedium, optionHeightLarge: heightLarge, optionHeightHuge: heightHuge, borderRadius,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge,
        fontSizeHuge, 
        // non-inverted
        optionTextColor: textColor2, optionTextColorHover: textColor2, optionTextColorActive: primaryColor, optionTextColorChildActive: primaryColor, color: popoverColor, dividerColor, suffixColor: textColor2, prefixColor: textColor2, optionColorHover: hoverColor, optionColorActive: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), groupHeaderTextColor: textColor3, 
        // inverted
        optionTextColorInverted: '#BBB', optionTextColorHoverInverted: '#FFF', optionTextColorActiveInverted: '#FFF', optionTextColorChildActiveInverted: '#FFF', colorInverted: invertedColor, dividerColorInverted: '#BBB', suffixColorInverted: '#BBB', prefixColorInverted: '#BBB', optionColorHoverInverted: primaryColor, optionColorActiveInverted: primaryColor, groupHeaderTextColorInverted: '#AAA', optionOpacityDisabled: opacityDisabled });
}
const dropdownLight = (0, use_theme_1.createTheme)({
    name: 'Dropdown',
    common: common_1.commonLight,
    peers: {
        Popover: styles_1.popoverLight
    },
    self
});
exports.default = dropdownLight;
