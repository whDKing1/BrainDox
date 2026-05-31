import { changeColor } from 'seemly';
import { commonLight } from "../../_styles/common/index.mjs";
import commonVars from "./_common.mjs";
export function self(vars) {
  const {
    borderRadius,
    railColor,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    textColor2
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    borderRadius,
    railColor,
    railColorActive: primaryColor,
    linkColor: changeColor(primaryColor, {
      alpha: 0.15
    }),
    linkTextColor: textColor2,
    linkTextColorHover: primaryColorHover,
    linkTextColorPressed: primaryColorPressed,
    linkTextColorActive: primaryColor
  });
}
const anchorLight = {
  name: 'Anchor',
  common: commonLight,
  self
};
export default anchorLight;