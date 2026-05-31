"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const use_theme_1 = require("../../_mixins/use-theme");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
function self(vars) {
    const { fontSize, boxShadow2, popoverColor, textColor2, borderRadius, borderColor, heightSmall, heightMedium, heightLarge, fontSizeSmall, fontSizeMedium, fontSizeLarge, dividerColor } = vars;
    return {
        panelFontSize: fontSize,
        boxShadow: boxShadow2,
        color: popoverColor,
        textColor: textColor2,
        borderRadius,
        border: `1px solid ${borderColor}`,
        heightSmall,
        heightMedium,
        heightLarge,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge,
        dividerColor
    };
}
const colorPickerLight = (0, use_theme_1.createTheme)({
    name: 'ColorPicker',
    common: common_1.commonLight,
    peers: {
        Input: styles_2.inputLight,
        Button: styles_1.buttonLight
    },
    self
});
exports.default = colorPickerLight;
