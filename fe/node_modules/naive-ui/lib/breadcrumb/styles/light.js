"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { fontSize, textColor3, textColor2, borderRadius, buttonColor2Hover, buttonColor2Pressed } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { fontSize, itemLineHeight: '1.25', itemTextColor: textColor3, itemTextColorHover: textColor2, itemTextColorPressed: textColor2, itemTextColorActive: textColor2, itemBorderRadius: borderRadius, itemColorHover: buttonColor2Hover, itemColorPressed: buttonColor2Pressed, separatorColor: textColor3 });
}
const breadcrumbLight = {
    name: 'Breadcrumb',
    common: common_1.commonLight,
    self
};
exports.default = breadcrumbLight;
