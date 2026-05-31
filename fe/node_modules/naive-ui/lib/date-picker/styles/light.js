"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../input/styles");
const styles_4 = require("../../time-picker/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { hoverColor, fontSize, textColor2, textColorDisabled, popoverColor, primaryColor, borderRadiusSmall, iconColor, iconColorDisabled, textColor1, dividerColor, boxShadow2, borderRadius, fontWeightStrong } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { itemFontSize: fontSize, calendarDaysFontSize: fontSize, calendarTitleFontSize: fontSize, itemTextColor: textColor2, itemTextColorDisabled: textColorDisabled, itemTextColorActive: popoverColor, itemTextColorCurrent: primaryColor, itemColorIncluded: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }), itemColorHover: hoverColor, itemColorDisabled: hoverColor, itemColorActive: primaryColor, itemBorderRadius: borderRadiusSmall, panelColor: popoverColor, panelTextColor: textColor2, arrowColor: iconColor, calendarTitleTextColor: textColor1, calendarTitleColorHover: hoverColor, calendarDaysTextColor: textColor2, panelHeaderDividerColor: dividerColor, calendarDaysDividerColor: dividerColor, calendarDividerColor: dividerColor, panelActionDividerColor: dividerColor, panelBoxShadow: boxShadow2, panelBorderRadius: borderRadius, calendarTitleFontWeight: fontWeightStrong, scrollItemBorderRadius: borderRadius, iconColor,
        iconColorDisabled });
}
const datePickerLight = (0, _mixins_1.createTheme)({
    name: 'DatePicker',
    common: common_1.commonLight,
    peers: {
        Input: styles_3.inputLight,
        Button: styles_2.buttonLight,
        TimePicker: styles_4.timePickerLight,
        Scrollbar: styles_1.scrollbarLight
    },
    self
});
exports.default = datePickerLight;
