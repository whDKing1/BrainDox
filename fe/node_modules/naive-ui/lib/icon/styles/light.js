"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { textColorBase, opacity1, opacity2, opacity3, opacity4, opacity5 } = vars;
    return {
        color: textColorBase,
        opacity1Depth: opacity1,
        opacity2Depth: opacity2,
        opacity3Depth: opacity3,
        opacity4Depth: opacity4,
        opacity5Depth: opacity5
    };
}
const iconLight = {
    name: 'Icon',
    common: common_1.commonLight,
    self
};
exports.default = iconLight;
