import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import common from "./_common.mjs";
export function self(vars) {
  const {
    textColor1,
    textColor2,
    textColor3,
    fontSize,
    fontWeightStrong,
    primaryColorHover,
    primaryColorPressed
  } = vars;
  return Object.assign(Object.assign({}, common), {
    titleFontWeight: fontWeightStrong,
    fontSize,
    titleTextColor: textColor1,
    backColor: textColor2,
    backColorHover: primaryColorHover,
    backColorPressed: primaryColorPressed,
    subtitleTextColor: textColor3
  });
}
export const pageHeaderLight = createTheme({
  name: 'PageHeader',
  common: commonLight,
  self
});