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
    const { textColor2, successColor, infoColor, warningColor, errorColor, popoverColor, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, textColor1, textColor3, borderRadius, fontWeightStrong, boxShadow2, lineHeight, fontSize } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { borderRadius,
        lineHeight,
        fontSize, headerFontWeight: fontWeightStrong, iconColor: textColor2, iconColorSuccess: successColor, iconColorInfo: infoColor, iconColorWarning: warningColor, iconColorError: errorColor, color: popoverColor, textColor: textColor2, closeIconColor,
        closeIconColorHover,
        closeIconColorPressed, closeBorderRadius: borderRadius, closeColorHover,
        closeColorPressed, headerTextColor: textColor1, descriptionTextColor: textColor3, actionTextColor: textColor2, boxShadow: boxShadow2 });
}
const notificationLight = (0, _mixins_1.createTheme)({
    name: 'Notification',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight
    },
    self
});
exports.default = notificationLight;
