"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../input/styles");
const styles_4 = require("../../time-picker/styles");
const light_1 = require("./light");
const datePickerDark = {
    name: 'DatePicker',
    common: common_1.commonDark,
    peers: {
        Input: styles_3.inputDark,
        Button: styles_2.buttonDark,
        TimePicker: styles_4.timePickerDark,
        Scrollbar: styles_1.scrollbarDark
    },
    self(vars) {
        const { popoverColor, hoverColor, primaryColor } = vars;
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.itemColorDisabled = (0, seemly_1.composite)(popoverColor, hoverColor);
        commonSelf.itemColorIncluded = (0, seemly_1.changeColor)(primaryColor, { alpha: 0.15 });
        commonSelf.itemColorHover = (0, seemly_1.composite)(popoverColor, hoverColor);
        return commonSelf;
    }
};
exports.default = datePickerDark;
