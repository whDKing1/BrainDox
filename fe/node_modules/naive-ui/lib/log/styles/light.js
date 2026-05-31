"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../code/styles");
function self(vars) {
    const { textColor2, modalColor, borderColor, fontSize, primaryColor } = vars;
    return {
        loaderFontSize: fontSize,
        loaderTextColor: textColor2,
        loaderColor: modalColor,
        loaderBorder: `1px solid ${borderColor}`,
        loadingColor: primaryColor
    };
}
const logLight = (0, _mixins_1.createTheme)({
    name: 'Log',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight,
        Code: styles_2.codeLight
    },
    self
});
exports.default = logLight;
