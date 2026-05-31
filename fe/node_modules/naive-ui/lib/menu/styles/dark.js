"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../dropdown/styles");
const styles_2 = require("../../tooltip/styles");
const light_1 = require("./light");
const menuDark = {
    name: 'Menu',
    common: common_1.commonDark,
    peers: {
        Tooltip: styles_2.tooltipDark,
        Dropdown: styles_1.dropdownDark
    },
    self(vars) {
        const { primaryColor, primaryColorSuppl } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.itemColorActive = (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 });
        commonSelf.itemColorActiveHover = (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 });
        commonSelf.itemColorActiveCollapsed = (0, seemly_1.changeColor)(primaryColor, {
            alpha: 0.15
        });
        commonSelf.itemColorActiveInverted = primaryColorSuppl;
        commonSelf.itemColorActiveHoverInverted = primaryColorSuppl;
        commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl;
        return commonSelf;
    }
};
exports.default = menuDark;
