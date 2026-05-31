"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const qrcodeDark = {
    name: 'QrCode',
    common: common_1.commonDark,
    self: (vars) => {
        return {
            borderRadius: vars.borderRadius
        };
    }
};
exports.default = qrcodeDark;
