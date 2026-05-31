"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../input/styles");
const light_1 = require("./light");
const timePickerDark = {
    name: 'TimePicker',
    common: common_1.commonDark,
    peers: {
        Scrollbar: styles_1.scrollbarDark,
        Button: styles_2.buttonDark,
        Input: styles_3.inputDark
    },
    self: light_1.self
};
exports.default = timePickerDark;
