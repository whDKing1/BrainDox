"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { textColor2, cardColor, modalColor, popoverColor, dividerColor, borderRadius, fontSize, hoverColor } = vars;
    return {
        textColor: textColor2,
        color: cardColor,
        colorHover: hoverColor,
        colorModal: modalColor,
        colorHoverModal: (0, seemly_1.composite)(modalColor, hoverColor),
        colorPopover: popoverColor,
        colorHoverPopover: (0, seemly_1.composite)(popoverColor, hoverColor),
        borderColor: dividerColor,
        borderColorModal: (0, seemly_1.composite)(modalColor, dividerColor),
        borderColorPopover: (0, seemly_1.composite)(popoverColor, dividerColor),
        borderRadius,
        fontSize
    };
}
const listLight = {
    name: 'List',
    common: common_1.commonLight,
    self
};
exports.default = listLight;
