"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../card/styles");
const styles_3 = require("../../dialog/styles");
function self(vars) {
    const { modalColor, textColor2, boxShadow3 } = vars;
    return {
        color: modalColor,
        textColor: textColor2,
        boxShadow: boxShadow3
    };
}
const modalLight = (0, _mixins_1.createTheme)({
    name: 'Modal',
    common: common_1.commonLight,
    peers: {
        Scrollbar: styles_1.scrollbarLight,
        Dialog: styles_3.dialogLight,
        Card: styles_2.cardLight
    },
    self
});
exports.default = modalLight;
