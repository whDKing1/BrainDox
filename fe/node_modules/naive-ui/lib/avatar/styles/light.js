"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { borderRadius, avatarColor, cardColor, fontSize, heightTiny, heightSmall, heightMedium, heightLarge, heightHuge, modalColor, popoverColor } = vars;
    return {
        borderRadius,
        fontSize,
        border: `2px solid ${cardColor}`,
        heightTiny,
        heightSmall,
        heightMedium,
        heightLarge,
        heightHuge,
        color: (0, seemly_1.composite)(cardColor, avatarColor),
        colorModal: (0, seemly_1.composite)(modalColor, avatarColor),
        colorPopover: (0, seemly_1.composite)(popoverColor, avatarColor)
    };
}
const avatarLight = {
    name: 'Avatar',
    common: common_1.commonLight,
    self
};
exports.default = avatarLight;
