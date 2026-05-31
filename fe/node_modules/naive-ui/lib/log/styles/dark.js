"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../code/styles");
const logDark = {
    name: 'Log',
    common: common_1.commonDark,
    peers: {
        Scrollbar: styles_1.scrollbarDark,
        Code: styles_2.codeDark
    },
    self(vars) {
        const { textColor2, inputColor, fontSize, primaryColor } = vars;
        return {
            loaderFontSize: fontSize,
            loaderTextColor: textColor2,
            loaderColor: inputColor,
            loaderBorder: '1px solid #0000',
            loadingColor: primaryColor
        };
    }
};
exports.default = logDark;
