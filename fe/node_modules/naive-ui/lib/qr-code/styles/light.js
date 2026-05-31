"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
function self(vars) {
    return {
        borderRadius: vars.borderRadius
    };
}
const themeLight = {
    name: 'QrCode',
    common: common_1.commonLight,
    self
};
exports.default = themeLight;
