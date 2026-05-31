"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { primaryColor, baseColor } = vars;
    return {
        color: primaryColor,
        iconColor: baseColor
    };
}
const iconWrapperLight = {
    name: 'IconWrapper',
    common: common_1.commonLight,
    self
};
exports.default = iconWrapperLight;
