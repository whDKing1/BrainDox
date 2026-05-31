import { commonLight } from "../../_styles/common/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    fontSize,
    textColor3,
    textColor2,
    borderRadius,
    buttonColor2Hover,
    buttonColor2Pressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    fontSize,
    itemLineHeight: '1.25',
    itemTextColor: textColor3,
    itemTextColorHover: textColor2,
    itemTextColorPressed: textColor2,
    itemTextColorActive: textColor2,
    itemBorderRadius: borderRadius,
    itemColorHover: buttonColor2Hover,
    itemColorPressed: buttonColor2Pressed,
    separatorColor: textColor3
  });
}
const breadcrumbLight = {
  name: 'Breadcrumb',
  common: commonLight,
  self
};
export default breadcrumbLight;