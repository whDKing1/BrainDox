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
    const { tableHeaderColor, textColor2, textColor1, cardColor, modalColor, popoverColor, dividerColor, borderRadius, fontWeightStrong, lineHeight, fontSizeSmall, fontSizeMedium, fontSizeLarge } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { lineHeight,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge, titleTextColor: textColor1, thColor: (0, seemly_1.composite)(cardColor, tableHeaderColor), thColorModal: (0, seemly_1.composite)(modalColor, tableHeaderColor), thColorPopover: (0, seemly_1.composite)(popoverColor, tableHeaderColor), thTextColor: textColor1, thFontWeight: fontWeightStrong, tdTextColor: textColor2, tdColor: cardColor, tdColorModal: modalColor, tdColorPopover: popoverColor, borderColor: (0, seemly_1.composite)(cardColor, dividerColor), borderColorModal: (0, seemly_1.composite)(modalColor, dividerColor), borderColorPopover: (0, seemly_1.composite)(popoverColor, dividerColor), borderRadius });
}
const descriptionsLight = {
    name: 'Descriptions',
    common: common_1.commonLight,
    self
};
exports.default = descriptionsLight;
