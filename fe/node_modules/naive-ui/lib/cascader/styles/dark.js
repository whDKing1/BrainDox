"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const styles_2 = require("../../_internal/select-menu/styles");
const styles_3 = require("../../_internal/selection/styles");
const common_1 = require("../../_styles/common");
const styles_4 = require("../../checkbox/styles");
const styles_5 = require("../../empty/styles");
const light_1 = require("./light");
const cascaderDark = {
    name: 'Cascader',
    common: common_1.commonDark,
    peers: {
        InternalSelectMenu: styles_2.internalSelectMenuDark,
        InternalSelection: styles_3.internalSelectionDark,
        Scrollbar: styles_1.scrollbarDark,
        Checkbox: styles_4.checkboxDark,
        Empty: styles_5.emptyLight
    },
    self: light_1.self
};
exports.default = cascaderDark;
