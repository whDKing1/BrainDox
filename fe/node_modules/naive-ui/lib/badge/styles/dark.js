"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const badgeDark = {
    name: 'Badge',
    common: common_1.commonDark,
    self(vars) {
        const { errorColorSuppl, infoColorSuppl, successColorSuppl, warningColorSuppl, fontFamily } = vars;
        return {
            color: errorColorSuppl,
            colorInfo: infoColorSuppl,
            colorSuccess: successColorSuppl,
            colorError: errorColorSuppl,
            colorWarning: warningColorSuppl,
            fontSize: '12px',
            fontFamily
        };
    }
};
exports.default = badgeDark;
