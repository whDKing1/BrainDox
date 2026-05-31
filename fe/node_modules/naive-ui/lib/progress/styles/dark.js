"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const progressDark = {
    name: 'Progress',
    common: common_1.commonDark,
    self(vars) {
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.textColorLineInner = 'rgb(0, 0, 0)';
        commonSelf.lineBgProcessing
            = 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)';
        return commonSelf;
    }
};
exports.default = progressDark;
