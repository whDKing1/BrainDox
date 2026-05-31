"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../card/styles");
const styles_3 = require("../../dialog/styles");
const light_1 = require("./light");
const modalDark = {
    name: 'Modal',
    common: common_1.commonDark,
    peers: {
        Scrollbar: styles_1.scrollbarDark,
        Dialog: styles_3.dialogDark,
        Card: styles_2.cardDark
    },
    self: light_1.self
};
exports.default = modalDark;
