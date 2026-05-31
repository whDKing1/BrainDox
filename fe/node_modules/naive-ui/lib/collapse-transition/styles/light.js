"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { cubicBezierEaseInOut } = vars;
    return {
        bezier: cubicBezierEaseInOut
    };
}
const collapseTransitionLight = {
    name: 'CollapseTransition',
    common: common_1.commonLight,
    self
};
exports.default = collapseTransitionLight;
