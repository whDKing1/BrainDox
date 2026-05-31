"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { dividerColor, cardColor, modalColor, popoverColor, tableHeaderColor, tableColorStriped, textColor1, textColor2, borderRadius, fontWeightStrong, lineHeight, fontSizeSmall, fontSizeMedium, fontSizeLarge } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge,
        lineHeight,
        borderRadius, borderColor: (0, seemly_1.composite)(cardColor, dividerColor), borderColorModal: (0, seemly_1.composite)(modalColor, dividerColor), borderColorPopover: (0, seemly_1.composite)(popoverColor, dividerColor), tdColor: cardColor, tdColorModal: modalColor, tdColorPopover: popoverColor, tdColorStriped: (0, seemly_1.composite)(cardColor, tableColorStriped), tdColorStripedModal: (0, seemly_1.composite)(modalColor, tableColorStriped), tdColorStripedPopover: (0, seemly_1.composite)(popoverColor, tableColorStriped), thColor: (0, seemly_1.composite)(cardColor, tableHeaderColor), thColorModal: (0, seemly_1.composite)(modalColor, tableHeaderColor), thColorPopover: (0, seemly_1.composite)(popoverColor, tableHeaderColor), thTextColor: textColor1, tdTextColor: textColor2, thFontWeight: fontWeightStrong });
}
const tableLight = {
    name: 'Table',
    common: common_1.commonLight,
    self
};
exports.default = tableLight;
