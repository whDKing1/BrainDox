"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const use_theme_1 = require("../../_mixins/use-theme");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../popover/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { borderRadius, boxShadow2, baseColor } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { borderRadius, boxShadow: boxShadow2, color: (0, seemly_1.composite)(baseColor, 'rgba(0, 0, 0, .85)'), textColor: baseColor });
}
const tooltipLight = (0, use_theme_1.createTheme)({
    name: 'Tooltip',
    common: common_1.commonLight,
    peers: {
        Popover: styles_1.popoverLight
    },
    self
});
exports.default = tooltipLight;
