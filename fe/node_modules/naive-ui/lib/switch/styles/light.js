"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { primaryColor, opacityDisabled, borderRadius, textColor3 } = vars;
    const railOverlayColor = 'rgba(0, 0, 0, .14)';
    return Object.assign(Object.assign({}, _common_1.default), { iconColor: textColor3, textColor: 'white', loadingColor: primaryColor, opacityDisabled, railColor: railOverlayColor, railColorActive: primaryColor, buttonBoxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)', buttonColor: '#FFF', railBorderRadiusSmall: borderRadius, railBorderRadiusMedium: borderRadius, railBorderRadiusLarge: borderRadius, buttonBorderRadiusSmall: borderRadius, buttonBorderRadiusMedium: borderRadius, buttonBorderRadiusLarge: borderRadius, boxShadowFocus: `0 0 0 2px ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.2 })}` });
}
const switchLight = {
    name: 'Switch',
    common: common_1.commonLight,
    self
};
exports.default = switchLight;
