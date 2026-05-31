"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const checkboxDark = {
    name: 'Checkbox',
    common: common_1.commonDark,
    self(vars) {
        const { cardColor } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.color = '#0000';
        commonSelf.checkMarkColor = cardColor;
        return commonSelf;
    }
};
exports.default = checkboxDark;
