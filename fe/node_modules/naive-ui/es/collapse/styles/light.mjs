import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    fontWeight,
    textColor1,
    textColor2,
    textColorDisabled,
    dividerColor,
    fontSize
  } = vars;
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
  common: commonLight,
  self
};
export default collapseLight;