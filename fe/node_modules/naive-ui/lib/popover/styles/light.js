"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { boxShadow2, popoverColor, textColor2, borderRadius, fontSize, dividerColor } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { fontSize,
        borderRadius, color: popoverColor, dividerColor, textColor: textColor2, boxShadow: boxShadow2 });
}
const popoverLight = (0, _mixins_1.createTheme)({
    name: 'Popover',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight
    },
    self
});
exports.default = popoverLight;
