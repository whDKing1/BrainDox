"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { textColorDisabled, iconColor, textColor2, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, fontSizeHuge } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { fontSizeTiny,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge,
        fontSizeHuge, textColor: textColorDisabled, iconColor, extraTextColor: textColor2 });
}
const emptyLight = {
    name: 'Empty',
    common: common_1.commonLight,
    self
};
exports.default = emptyLight;
