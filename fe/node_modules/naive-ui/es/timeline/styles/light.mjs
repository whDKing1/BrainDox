import { commonLight } from "../../_styles/common/index.mjs";
import sizeVariables from "./_common.mjs";
function self(vars) {
  const {
    textColor3,
    infoColor,
    errorColor,
    successColor,
    warningColor,
    textColor1,
    textColor2,
    railColor,
    fontWeightStrong,
    fontSize
  } = vars;
  return Object.assign(Object.assign({}, sizeVariables), {
    contentFontSize: fontSize,
    titleFontWeight: fontWeightStrong,
    circleBorder: `2px solid ${textColor3}`,
    circleBorderInfo: `2px solid ${infoColor}`,
    circleBorderError: `2px solid ${errorColor}`,
    circleBorderSuccess: `2px solid ${successColor}`,
    circleBorderWarning: `2px solid ${warningColor}`,
    iconColor: textColor3,
    iconColorInfo: infoColor,
    iconColorError: errorColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    titleTextColor: textColor1,
    contentTextColor: textColor2,
    metaTextColor: textColor3,
    lineColor: railColor
  });
}
const timelineLight = {
  name: 'Timeline',
  common: commonLight,
  self
};
export default timelineLight;