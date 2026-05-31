"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/selection/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../empty/styles");
const styles_3 = require("../../tree/styles");
const treeSelectDark = {
    name: 'TreeSelect',
    common: common_1.commonDark,
    peers: {
        Tree: styles_3.treeDark,
        Empty: styles_2.emptyDark,
        InternalSelection: styles_1.internalSelectionDark
    }
};
exports.default = treeSelectDark;
