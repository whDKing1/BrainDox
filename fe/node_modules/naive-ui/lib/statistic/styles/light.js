"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { textColor2, textColor3, fontSize, fontWeight } = vars;
    return {
        labelFontSize: fontSize,
        labelFontWeight: fontWeight,
        valueFontWeight: fontWeight,
        valueFontSize: '24px',
        labelTextColor: textColor3,
        valuePrefixTextColor: textColor2,
        valueSuffixTextColor: textColor2,
        valueTextColor: textColor2
    };
}
const statisticLight = {
    name: 'Statistic',
    common: common_1.commonLight,
    self
};
exports.default = statisticLight;
