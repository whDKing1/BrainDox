"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
function self(vars) {
    const { errorColor, infoColor, successColor, warningColor, fontFamily } = vars;
    return {
        color: errorColor,
        colorInfo: infoColor,
        colorSuccess: successColor,
        colorError: errorColor,
        colorWarning: warningColor,
        fontSize: '12px',
        fontFamily
    };
}
const badgeLight = {
    name: 'Badge',
    common: common_1.commonLight,
    self
};
exports.default = badgeLight;
