"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { textColor1, dividerColor, fontWeightStrong } = vars;
    return {
        textColor: textColor1,
        color: dividerColor,
        fontWeight: fontWeightStrong
    };
}
const dividerLight = {
    name: 'Divider',
    common: common_1.commonLight,
    self
};
exports.default = dividerLight;
