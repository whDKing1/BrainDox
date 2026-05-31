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
    const { baseColor, inputColorDisabled, cardColor, modalColor, popoverColor, textColorDisabled, borderColor, primaryColor, textColor2, fontSizeSmall, fontSizeMedium, fontSizeLarge, borderRadiusSmall, lineHeight } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { labelLineHeight: lineHeight, fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge, borderRadius: borderRadiusSmall, color: baseColor, colorChecked: primaryColor, colorDisabled: inputColorDisabled, colorDisabledChecked: inputColorDisabled, colorTableHeader: cardColor, colorTableHeaderModal: modalColor, colorTableHeaderPopover: popoverColor, checkMarkColor: baseColor, checkMarkColorDisabled: textColorDisabled, checkMarkColorDisabledChecked: textColorDisabled, border: `1px solid ${borderColor}`, borderDisabled: `1px solid ${borderColor}`, borderDisabledChecked: `1px solid ${borderColor}`, borderChecked: `1px solid ${primaryColor}`, borderFocus: `1px solid ${primaryColor}`, boxShadowFocus: `0 0 0 2px ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}`, textColor: textColor2, textColorDisabled });
}
const checkboxLight = {
    name: 'Checkbox',
    common: common_1.commonLight,
    self
};
exports.default = checkboxLight;
