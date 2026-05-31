"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../input/styles");
function self() {
    return {
        inputWidthSmall: '24px',
        inputWidthMedium: '30px',
        inputWidthLarge: '36px',
        gapSmall: '8px',
        gapMedium: '8px',
        gapLarge: '8px'
    };
}
const inputOtpLight = (0, _mixins_1.createTheme)({
    name: 'InputOtp',
    common: common_1.commonLight,
    peers: {
        Input: styles_1.inputLight
    },
    self
});
exports.default = inputOtpLight;
