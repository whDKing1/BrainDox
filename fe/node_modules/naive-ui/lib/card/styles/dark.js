"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const cardDark = {
    name: 'Card',
    common: common_1.commonDark,
    self(vars) {
        const commonSelf = (0, light_1.self)(vars);
        const { cardColor, modalColor, popoverColor } = vars;
        commonSelf.colorEmbedded = cardColor;
        commonSelf.colorEmbeddedModal = modalColor;
        commonSelf.colorEmbeddedPopover = popoverColor;
        return commonSelf;
    }
};
exports.default = cardDark;
