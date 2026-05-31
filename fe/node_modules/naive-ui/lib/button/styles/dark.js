"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const buttonDark = {
    name: 'Button',
    common: common_1.commonDark,
    self(vars) {
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.waveOpacity = '0.8';
        commonSelf.colorOpacitySecondary = '0.16';
        commonSelf.colorOpacitySecondaryHover = '0.2';
        commonSelf.colorOpacitySecondaryPressed = '0.12';
        return commonSelf;
    }
};
exports.default = buttonDark;
