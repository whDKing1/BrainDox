"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../popover/styles");
const light_1 = require("./light");
const popconfirmDark = {
    name: 'Popconfirm',
    common: common_1.commonDark,
    peers: {
        Button: styles_1.buttonDark,
        Popover: styles_2.popoverDark
    },
    self: light_1.self
};
exports.default = popconfirmDark;
