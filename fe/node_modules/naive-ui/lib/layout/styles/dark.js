"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const layoutDark = {
    name: 'Layout',
    common: common_1.commonDark,
    peers: {
        Scrollbar: styles_1.scrollbarDark
    },
    self(vars) {
        const { textColor2, bodyColor, popoverColor, cardColor, dividerColor, scrollbarColor, scrollbarColorHover } = vars;
        return {
            textColor: textColor2,
            textColorInverted: textColor2,
            color: bodyColor,
            colorEmbedded: bodyColor,
            headerColor: cardColor,
            headerColorInverted: cardColor,
            footerColor: cardColor,
            footerColorInverted: cardColor,
            headerBorderColor: dividerColor,
            headerBorderColorInverted: dividerColor,
            footerBorderColor: dividerColor,
            footerBorderColorInverted: dividerColor,
            siderBorderColor: dividerColor,
            siderBorderColorInverted: dividerColor,
            siderColor: cardColor,
            siderColorInverted: cardColor,
            siderToggleButtonBorder: '1px solid transparent',
            siderToggleButtonColor: popoverColor,
            siderToggleButtonIconColor: textColor2,
            siderToggleButtonIconColorInverted: textColor2,
            siderToggleBarColor: (0, seemly_1.composite)(bodyColor, scrollbarColor),
            siderToggleBarColorHover: (0, seemly_1.composite)(bodyColor, scrollbarColorHover),
            __invertScrollbar: 'false'
        };
    }
};
exports.default = layoutDark;
