"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../input/styles");
const light_1 = require("./light");
const inputOtpDark = {
    name: 'InputOtp',
    common: common_1.commonDark,
    peers: {
        Input: styles_1.inputDark
    },
    self: light_1.self
};
exports.default = inputOtpDark;
