"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../progress/styles");
const light_1 = require("./light");
const uploadDark = {
    name: 'Upload',
    common: common_1.commonDark,
    peers: {
        Button: styles_1.buttonDark,
        Progress: styles_2.progressDark
    },
    self(vars) {
        const { errorColor } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.itemColorHoverError = (0, seemly_1.changeColor)(errorColor, {
            alpha: 0.09
        });
        return commonSelf;
    }
};
exports.default = uploadDark;
