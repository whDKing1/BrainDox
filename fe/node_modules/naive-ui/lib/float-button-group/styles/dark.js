"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const floatButtonGroupDark = {
    name: 'FloatButtonGroup',
    common: common_1.commonDark,
    self(vars) {
        const { popoverColor, dividerColor, borderRadius } = vars;
        return {
            color: popoverColor,
            buttonBorderColor: dividerColor,
            borderRadiusSquare: borderRadius,
            boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)'
        };
    }
};
exports.default = floatButtonGroupDark;
