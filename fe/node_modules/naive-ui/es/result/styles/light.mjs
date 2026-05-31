import { commonLight } from "../../_styles/common/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    textColor2,
    textColor1,
    errorColor,
    successColor,
    infoColor,
    warningColor,
    lineHeight,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    lineHeight,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    textColor: textColor2,
    iconColorError: errorColor,
    iconColorSuccess: successColor,
    iconColorInfo: infoColor,
    iconColorWarning: warningColor
  });
}
const resultLight = {
  name: 'Result',
  common: commonLight,
  self
};
export default resultLight;