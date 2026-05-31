"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageHeaderLight = void 0;
exports.self = self;
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColor1, textColor2, textColor3, fontSize, fontWeightStrong, primaryColorHover, primaryColorPressed } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { titleFontWeight: fontWeightStrong, fontSize, titleTextColor: textColor1, backColor: textColor2, backColorHover: primaryColorHover, backColorPressed: primaryColorPressed, subtitleTextColor: textColor3 });
}
exports.pageHeaderLight = (0, _mixins_1.createTheme)({
    name: 'PageHeader',
    common: common_1.commonLight,
    self
});
