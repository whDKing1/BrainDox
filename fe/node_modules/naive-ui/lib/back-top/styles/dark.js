"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
const backTopDark = {
    name: 'BackTop',
    common: common_1.commonDark,
    self(vars) {
        const { popoverColor, textColor2, primaryColorHover, primaryColorPressed } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { color: popoverColor, textColor: textColor2, iconColor: textColor2, iconColorHover: primaryColorHover, iconColorPressed: primaryColorPressed, boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)', boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)', boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)' });
    }
};
exports.default = backTopDark;
