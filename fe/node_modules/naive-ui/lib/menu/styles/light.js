"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPartialInvertedVars = createPartialInvertedVars;
exports.self = self;
const seemly_1 = require("seemly");
const use_theme_1 = require("../../_mixins/use-theme");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../dropdown/styles");
const styles_2 = require("../../tooltip/styles");
function createPartialInvertedVars(color, activeItemColor, activeTextColor, groupTextColor) {
    return {
        itemColorHoverInverted: '#0000',
        itemColorActiveInverted: activeItemColor,
        itemColorActiveHoverInverted: activeItemColor,
        itemColorActiveCollapsedInverted: activeItemColor,
        itemTextColorInverted: color,
        itemTextColorHoverInverted: activeTextColor,
        itemTextColorChildActiveInverted: activeTextColor,
        itemTextColorChildActiveHoverInverted: activeTextColor,
        itemTextColorActiveInverted: activeTextColor,
        itemTextColorActiveHoverInverted: activeTextColor,
        itemTextColorHorizontalInverted: color,
        itemTextColorHoverHorizontalInverted: activeTextColor,
        itemTextColorChildActiveHorizontalInverted: activeTextColor,
        itemTextColorChildActiveHoverHorizontalInverted: activeTextColor,
        itemTextColorActiveHorizontalInverted: activeTextColor,
        itemTextColorActiveHoverHorizontalInverted: activeTextColor,
        itemIconColorInverted: color,
        itemIconColorHoverInverted: activeTextColor,
        itemIconColorActiveInverted: activeTextColor,
        itemIconColorActiveHoverInverted: activeTextColor,
        itemIconColorChildActiveInverted: activeTextColor,
        itemIconColorChildActiveHoverInverted: activeTextColor,
        itemIconColorCollapsedInverted: color,
        itemIconColorHorizontalInverted: color,
        itemIconColorHoverHorizontalInverted: activeTextColor,
        itemIconColorActiveHorizontalInverted: activeTextColor,
        itemIconColorActiveHoverHorizontalInverted: activeTextColor,
        itemIconColorChildActiveHorizontalInverted: activeTextColor,
        itemIconColorChildActiveHoverHorizontalInverted: activeTextColor,
        arrowColorInverted: color,
        arrowColorHoverInverted: activeTextColor,
        arrowColorActiveInverted: activeTextColor,
        arrowColorActiveHoverInverted: activeTextColor,
        arrowColorChildActiveInverted: activeTextColor,
        arrowColorChildActiveHoverInverted: activeTextColor,
        groupTextColorInverted: groupTextColor
    };
}
function self(vars) {
    const { borderRadius, textColor3, primaryColor, textColor2, textColor1, fontSize, dividerColor, hoverColor, primaryColorHover } = vars;
    return Object.assign({ borderRadius, color: '#0000', groupTextColor: textColor3, itemColorHover: hoverColor, itemColorActive: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), itemColorActiveHover: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), itemColorActiveCollapsed: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), itemTextColor: textColor2, itemTextColorHover: textColor2, itemTextColorActive: primaryColor, itemTextColorActiveHover: primaryColor, itemTextColorChildActive: primaryColor, itemTextColorChildActiveHover: primaryColor, itemTextColorHorizontal: textColor2, itemTextColorHoverHorizontal: primaryColorHover, itemTextColorActiveHorizontal: primaryColor, itemTextColorActiveHoverHorizontal: primaryColor, itemTextColorChildActiveHorizontal: primaryColor, itemTextColorChildActiveHoverHorizontal: primaryColor, itemIconColor: textColor1, itemIconColorHover: textColor1, itemIconColorActive: primaryColor, itemIconColorActiveHover: primaryColor, itemIconColorChildActive: primaryColor, itemIconColorChildActiveHover: primaryColor, itemIconColorCollapsed: textColor1, itemIconColorHorizontal: textColor1, itemIconColorHoverHorizontal: primaryColorHover, itemIconColorActiveHorizontal: primaryColor, itemIconColorActiveHoverHorizontal: primaryColor, itemIconColorChildActiveHorizontal: primaryColor, itemIconColorChildActiveHoverHorizontal: primaryColor, itemHeight: '42px', arrowColor: textColor2, arrowColorHover: textColor2, arrowColorActive: primaryColor, arrowColorActiveHover: primaryColor, arrowColorChildActive: primaryColor, arrowColorChildActiveHover: primaryColor, colorInverted: '#0000', borderColorHorizontal: '#0000', fontSize,
        dividerColor }, createPartialInvertedVars('#BBB', primaryColor, '#FFF', '#AAA'));
}
const menuLight = (0, use_theme_1.createTheme)({
    name: 'Menu',
    common: common_1.commonLight,
    peers: {
        Tooltip: styles_2.tooltipLight,
        Dropdown: styles_1.dropdownLight
    },
    self
});
exports.default = menuLight;
