"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const tabsDark = {
    name: 'Tabs',
    common: common_1.commonDark,
    self(vars) {
        const commonSelf = (0, light_1.self)(vars);
        const { inputColor } = vars;
        commonSelf.colorSegment = inputColor;
        commonSelf.tabColorSegment = inputColor;
        return commonSelf;
    }
};
exports.default = tabsDark;
