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
    const { borderRadius, railColor, primaryColor, primaryColorHover, primaryColorPressed, textColor2 } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { borderRadius,
        railColor, railColorActive: primaryColor, linkColor: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 }), linkTextColor: textColor2, linkTextColorHover: primaryColorHover, linkTextColorPressed: primaryColorPressed, linkTextColorActive: primaryColor });
}
const anchorLight = {
    name: 'Anchor',
    common: common_1.commonLight,
    self
};
exports.default = anchorLight;
