"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../../_styles/common");
const common_2 = require("./common");
function self(vars) {
    const { scrollbarColor, scrollbarColorHover, scrollbarHeight, scrollbarWidth, scrollbarBorderRadius } = vars;
    return Object.assign(Object.assign({}, common_2.commonVars), { height: scrollbarHeight, width: scrollbarWidth, borderRadius: scrollbarBorderRadius, color: scrollbarColor, colorHover: scrollbarColorHover });
}
const scrollbarLight = {
    name: 'Scrollbar',
    common: common_1.commonLight,
    self
};
exports.default = scrollbarLight;
