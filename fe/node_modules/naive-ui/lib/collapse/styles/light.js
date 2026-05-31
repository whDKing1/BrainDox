"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { fontWeight, textColor1, textColor2, textColorDisabled, dividerColor, fontSize } = vars;
    return {
        titleFontSize: fontSize,
        titleFontWeight: fontWeight,
        dividerColor,
        titleTextColor: textColor1,
        titleTextColorDisabled: textColorDisabled,
        fontSize,
        textColor: textColor2,
        arrowColor: textColor2,
        arrowColorDisabled: textColorDisabled,
        itemMargin: '16px 0 0 0',
        titlePadding: '16px 0 0 0'
    };
}
const collapseLight = {
    name: 'Collapse',
    common: common_1.commonLight,
    self
};
exports.default = collapseLight;
