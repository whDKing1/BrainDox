"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const watermarkDark = {
    name: 'Watermark',
    common: common_1.commonDark,
    self(vars) {
        const { fontFamily } = vars;
        return {
            fontFamily
        };
    }
};
exports.default = watermarkDark;
