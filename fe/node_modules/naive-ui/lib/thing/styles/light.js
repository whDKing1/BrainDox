"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { textColor1, textColor2, fontWeightStrong, fontSize } = vars;
    return {
        fontSize,
        titleTextColor: textColor1,
        textColor: textColor2,
        titleFontWeight: fontWeightStrong
    };
}
const thingLight = {
    name: 'Thing',
    common: common_1.commonLight,
    self
};
exports.default = thingLight;
