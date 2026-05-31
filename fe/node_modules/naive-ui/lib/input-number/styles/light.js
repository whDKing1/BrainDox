"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
function self(vars) {
    const { textColorDisabled } = vars;
    return {
        iconColorDisabled: textColorDisabled
    };
}
const inputNumberLight = (0, _mixins_1.createTheme)({
    name: 'InputNumber',
    common: common_1.commonLight,
    peers: {
        Button: styles_1.buttonLight,
        Input: styles_2.inputLight
    },
    self
});
exports.default = inputNumberLight;
