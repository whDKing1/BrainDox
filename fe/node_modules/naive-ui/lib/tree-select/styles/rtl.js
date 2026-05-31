"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeSelectRtl = void 0;
const styles_1 = require("../../_internal/scrollbar/styles");
const styles_2 = require("../../_internal/select-menu/styles");
const styles_3 = require("../../_internal/selection/styles");
const cssr_1 = require("../../_utils/cssr");
const styles_4 = require("../../tag/styles");
const styles_5 = require("../../tree/styles");
exports.treeSelectRtl = {
    name: 'Select',
    style: (0, cssr_1.c)([]),
    peers: [
        styles_3.internalSelectionRtl,
        styles_2.internalSelectMenuRtl,
        styles_4.tagRtl,
        styles_1.scrollbarRtl,
        styles_5.treeRtl
    ]
};
