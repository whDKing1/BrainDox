"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
const inputNumberDark = {
    name: 'InputNumber',
    common: common_1.commonDark,
    peers: {
        Button: styles_1.buttonDark,
        Input: styles_2.inputDark
    },
    self(vars) {
        const { textColorDisabled } = vars;
        return {
            iconColorDisabled: textColorDisabled
        };
    }
};
exports.default = inputNumberDark;
