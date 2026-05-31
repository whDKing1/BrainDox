"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const light_1 = require("./light");
const dialogDark = {
    name: 'Dialog',
    common: common_1.commonDark,
    peers: {
        Button: styles_1.buttonDark
    },
    self: light_1.self
};
exports.default = dialogDark;
