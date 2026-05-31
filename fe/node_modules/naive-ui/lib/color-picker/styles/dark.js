"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
const light_1 = require("./light");
const colorPickerDark = {
    name: 'ColorPicker',
    common: common_1.commonDark,
    peers: {
        Input: styles_2.inputDark,
        Button: styles_1.buttonDark
    },
    self: light_1.self
};
exports.default = colorPickerDark;
