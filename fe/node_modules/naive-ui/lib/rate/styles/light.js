"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
function self(vars) {
    const { railColor } = vars;
    return {
        itemColor: railColor,
        itemColorActive: '#FFCC33',
        sizeSmall: '16px',
        sizeMedium: '20px',
        sizeLarge: '24px'
    };
}
const themeLight = {
    name: 'Rate',
    common: common_1.commonLight,
    self
};
exports.default = themeLight;
