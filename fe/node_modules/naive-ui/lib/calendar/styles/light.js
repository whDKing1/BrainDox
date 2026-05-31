"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { borderRadius, fontSize, lineHeight, textColor2, textColor1, textColorDisabled, dividerColor, fontWeightStrong, primaryColor, baseColor, hoverColor, cardColor, modalColor, popoverColor } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { borderRadius, borderColor: (0, seemly_1.composite)(cardColor, dividerColor), borderColorModal: (0, seemly_1.composite)(modalColor, dividerColor), borderColorPopover: (0, seemly_1.composite)(popoverColor, dividerColor), textColor: textColor2, titleFontWeight: fontWeightStrong, titleTextColor: textColor1, dayTextColor: textColorDisabled, fontSize,
        lineHeight, dateColorCurrent: primaryColor, dateTextColorCurrent: baseColor, cellColorHover: (0, seemly_1.composite)(cardColor, hoverColor), cellColorHoverModal: (0, seemly_1.composite)(modalColor, hoverColor), cellColorHoverPopover: (0, seemly_1.composite)(popoverColor, hoverColor), cellColor: cardColor, cellColorModal: modalColor, cellColorPopover: popoverColor, barColor: primaryColor });
}
const calendarLight = (0, _mixins_1.createTheme)({
    name: 'Calendar',
    common: common_1.commonLight,
    peers: {
        Button: styles_1.buttonLight
    },
    self
});
exports.default = calendarLight;
