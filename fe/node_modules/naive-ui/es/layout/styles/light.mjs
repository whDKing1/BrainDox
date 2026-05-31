import { composite } from 'seemly';
import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    baseColor,
    textColor2,
    bodyColor,
    cardColor,
    dividerColor,
    actionColor,
    scrollbarColor,
    scrollbarColorHover,
    invertedColor
  } = vars;
  return {
    textColor: textColor2,
    textColorInverted: '#FFF',
    color: bodyColor,
    colorEmbedded: actionColor,
    headerColor: cardColor,
    headerColorInverted: invertedColor,
    footerColor: actionColor,
    footerColorInverted: invertedColor,
    headerBorderColor: dividerColor,
    headerBorderColorInverted: invertedColor,
    footerBorderColor: dividerColor,
    footerBorderColorInverted: invertedColor,
    siderBorderColor: dividerColor,
    siderBorderColorInverted: invertedColor,
    siderColor: cardColor,
    siderColorInverted: invertedColor,
    siderToggleButtonBorder: `1px solid ${dividerColor}`,
    siderToggleButtonColor: baseColor,
    siderToggleButtonIconColor: textColor2,
    siderToggleButtonIconColorInverted: textColor2,
    siderToggleBarColor: composite(bodyColor, scrollbarColor),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
    // hack for inverted background
    __invertScrollbar: 'true'
  };
}
const layoutLight = createTheme({
  name: 'Layout',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
});
export default layoutLight;