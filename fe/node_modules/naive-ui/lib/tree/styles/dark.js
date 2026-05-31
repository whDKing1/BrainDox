"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../checkbox/styles");
const styles_3 = require("../../empty/styles");
const light_1 = require("./light");
const treeDark = {
    name: 'Tree',
    common: common_1.commonDark,
    peers: {
        Checkbox: styles_2.checkboxDark,
        Scrollbar: styles_1.scrollbarDark,
        Empty: styles_3.emptyDark
    },
    self(vars) {
        const { primaryColor } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.nodeColorActive = (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 });
        return commonSelf;
    }
};
exports.default = treeDark;
