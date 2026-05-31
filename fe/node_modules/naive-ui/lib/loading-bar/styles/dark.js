"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const loadingBarDark = {
    name: 'LoadingBar',
    common: common_1.commonDark,
    self(vars) {
        const { primaryColor } = vars;
        return {
            colorError: 'red',
            colorLoading: primaryColor,
            height: '2px'
        };
    }
};
exports.default = loadingBarDark;
