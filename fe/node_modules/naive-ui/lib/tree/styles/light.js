"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const use_theme_1 = require("../../_mixins/use-theme");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../checkbox/styles");
const styles_3 = require("../../empty/styles");
function self(vars) {
    const { borderRadiusSmall, dividerColor, hoverColor, pressedColor, primaryColor, textColor3, textColor2, textColorDisabled, fontSize } = vars;
    return {
        fontSize,
        lineHeight: '1.5',
        nodeHeight: '30px',
        nodeWrapperPadding: '3px 0',
        nodeBorderRadius: borderRadiusSmall,
        nodeColorHover: hoverColor,
        nodeColorPressed: pressedColor,
        nodeColorActive: (0, seemly_1.changeColor)(primaryColor, { alpha: 0.1 }),
        arrowColor: textColor3,
        nodeTextColor: textColor2,
        nodeTextColorDisabled: textColorDisabled,
        loadingColor: primaryColor,
        dropMarkColor: primaryColor,
        lineColor: dividerColor
    };
}
const treeLight = (0, use_theme_1.createTheme)({
    name: 'Tree',
    common: common_1.commonLight,
    peers: {
        Checkbox: styles_2.checkboxLight,
        Scrollbar: styles_1.scrollbarLight,
        Empty: styles_3.emptyLight
    },
    self
});
exports.default = treeLight;
