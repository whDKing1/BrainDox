"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../input/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { popoverColor, textColor2, primaryColor, hoverColor, dividerColor, opacityDisabled, boxShadow2, borderRadius, iconColor, iconColorDisabled } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { panelColor: popoverColor, panelBoxShadow: boxShadow2, panelDividerColor: dividerColor, itemTextColor: textColor2, itemTextColorActive: primaryColor, itemColorHover: hoverColor, itemOpacityDisabled: opacityDisabled, itemBorderRadius: borderRadius, borderRadius,
        iconColor,
        iconColorDisabled });
}
const timePickerLight = (0, _mixins_1.createTheme)({
    name: 'TimePicker',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight,
        Button: styles_2.buttonLight,
        Input: styles_3.inputLight
    },
    self
});
exports.default = timePickerLight;
