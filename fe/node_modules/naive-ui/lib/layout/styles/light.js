"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { baseColor, textColor2, bodyColor, cardColor, dividerColor, actionColor, scrollbarColor, scrollbarColorHover, invertedColor } = vars;
    return {
        textColor: textColor2,
        textColorInverted: '#FFF',
        color: bodyColor,
        colorEmbedded: actionColor,
        headerColor: cardColor,
        headerColorInverted: invertedColor,
        footerColor: actionColor,
        footerColorInverted: invertedColor,
        headerBorderColor: dividerColor,
        headerBorderColorInverted: invertedColor,
        footerBorderColor: dividerColor,
        footerBorderColorInverted: invertedColor,
        siderBorderColor: dividerColor,
        siderBorderColorInverted: invertedColor,
        siderColor: cardColor,
        siderColorInverted: invertedColor,
        siderToggleButtonBorder: `1px solid ${dividerColor}`,
        siderToggleButtonColor: baseColor,
        siderToggleButtonIconColor: textColor2,
        siderToggleButtonIconColorInverted: textColor2,
        siderToggleBarColor: (0, seemly_1.composite)(bodyColor, scrollbarColor),
        siderToggleBarColorHover: (0, seemly_1.composite)(bodyColor, scrollbarColorHover),
        // hack for inverted background
        __invertScrollbar: 'true'
    };
}
const layoutLight = (0, _mixins_1.createTheme)({
    name: 'Layout',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight
    },
    self
});
exports.default = layoutLight;
