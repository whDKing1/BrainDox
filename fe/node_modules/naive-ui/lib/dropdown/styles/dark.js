"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../popover/styles");
const light_1 = require("./light");
const dropdownDark = {
    name: 'Dropdown',
    common: common_1.commonDark,
    peers: {
        Popover: styles_1.popoverDark
    },
    self(vars) {
        const { primaryColorSuppl, primaryColor, popoverColor } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.colorInverted = popoverColor;
        commonSelf.optionColorActive = (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 });
        commonSelf.optionColorActiveInverted = primaryColorSuppl;
        commonSelf.optionColorHoverInverted = primaryColorSuppl;
        return commonSelf;
    }
};
exports.default = dropdownDark;
