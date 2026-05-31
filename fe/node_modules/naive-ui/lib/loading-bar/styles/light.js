"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
function self(vars) {
    const { primaryColor, errorColor } = vars;
    return {
        colorError: errorColor,
        colorLoading: primaryColor,
        height: '2px'
    };
}
const loadingBarLight = {
    name: 'LoadingBar',
    common: common_1.commonLight,
    self
};
exports.default = loadingBarLight;
