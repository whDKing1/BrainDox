"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../progress/styles");
function self(vars) {
    const { iconColor, primaryColor, errorColor, textColor2, successColor, opacityDisabled, actionColor, borderColor, hoverColor, lineHeight, borderRadius, fontSize } = vars;
    return {
        fontSize,
        lineHeight,
        borderRadius,
        draggerColor: actionColor,
        draggerBorder: `1px dashed ${borderColor}`,
        draggerBorderHover: `1px dashed ${primaryColor}`,
        itemColorHover: hoverColor,
        itemColorHoverError: (0, seemly_1.changeColor)(errorColor, {
            alpha: 0.06
        }),
        itemTextColor: textColor2,
        itemTextColorError: errorColor,
        itemTextColorSuccess: successColor,
        itemIconColor: iconColor,
        itemDisabledOpacity: opacityDisabled,
        itemBorderImageCardError: `1px solid ${errorColor}`,
        itemBorderImageCard: `1px solid ${borderColor}`
    };
}
const uploadLight = (0, _mixins_1.createTheme)({
    name: 'Upload',
    common: common_1.commonLight,
    peers: {
        Button: styles_1.buttonLight,
        Progress: styles_2.progressLight
    },
    self
});
exports.default = uploadLight;
