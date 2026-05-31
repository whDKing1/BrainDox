"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
const switchDark = {
    name: 'Switch',
    common: common_1.commonDark,
    self(vars) {
        const { primaryColorSuppl, opacityDisabled, borderRadius, primaryColor, textColor2, baseColor } = vars;
        const railOverlayColor = 'rgba(255, 255, 255, .20)';
        return Object.assign(Object.assign({}, _common_1.default), { iconColor: baseColor, textColor: textColor2, loadingColor: primaryColorSuppl, opacityDisabled, railColor: railOverlayColor, railColorActive: primaryColorSuppl, buttonBoxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)', buttonColor: '#FFF', railBorderRadiusSmall: borderRadius, railBorderRadiusMedium: borderRadius, railBorderRadiusLarge: borderRadius, buttonBorderRadiusSmall: borderRadius, buttonBorderRadiusMedium: borderRadius, buttonBorderRadiusLarge: borderRadius, boxShadowFocus: `0 0 8px 0 ${(0, seemly_1.changeColor)(primaryColor, { alpha: 0.3 })}` });
    }
};
exports.default = switchDark;
