import { changeColor } from 'seemly';
import { createTheme } from "../../_mixins/use-theme.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { popoverLight } from "../../popover/styles/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    primaryColor,
    textColor2,
    dividerColor,
    hoverColor,
    popoverColor,
    invertedColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    textColor3,
    opacityDisabled
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    // non-inverted
    optionTextColor: textColor2,
    optionTextColorHover: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorChildActive: primaryColor,
    color: popoverColor,
    dividerColor,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    optionColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    groupHeaderTextColor: textColor3,
    // inverted
    optionTextColorInverted: '#BBB',
    optionTextColorHoverInverted: '#FFF',
    optionTextColorActiveInverted: '#FFF',
    optionTextColorChildActiveInverted: '#FFF',
    colorInverted: invertedColor,
    dividerColorInverted: '#BBB',
    suffixColorInverted: '#BBB',
    prefixColorInverted: '#BBB',
    optionColorHoverInverted: primaryColor,
    optionColorActiveInverted: primaryColor,
    groupHeaderTextColorInverted: '#AAA',
    optionOpacityDisabled: opacityDisabled
  });
}
const dropdownLight = createTheme({
  name: 'Dropdown',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
});
export default dropdownLight;