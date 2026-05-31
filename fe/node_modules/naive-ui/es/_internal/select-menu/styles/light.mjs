import { createTheme } from "../../../_mixins/index.mjs";
import { commonLight } from "../../../_styles/common/index.mjs";
import { emptyLight } from "../../../empty/styles/index.mjs";
import { scrollbarLight } from "../../scrollbar/styles/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    borderRadius,
    popoverColor,
    textColor3,
    dividerColor,
    textColor2,
    primaryColorPressed,
    textColorDisabled,
    primaryColor,
    opacityDisabled,
    hoverColor,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    optionFontSizeTiny: fontSizeTiny,
    optionFontSizeSmall: fontSizeSmall,
    optionFontSizeMedium: fontSizeMedium,
    optionFontSizeLarge: fontSizeLarge,
    optionFontSizeHuge: fontSizeHuge,
    optionHeightTiny: heightTiny,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    color: popoverColor,
    groupHeaderTextColor: textColor3,
    actionDividerColor: dividerColor,
    optionTextColor: textColor2,
    optionTextColorPressed: primaryColorPressed,
    optionTextColorDisabled: textColorDisabled,
    optionTextColorActive: primaryColor,
    optionOpacityDisabled: opacityDisabled,
    optionCheckColor: primaryColor,
    optionColorPending: hoverColor,
    optionColorActive: 'rgba(0, 0, 0, 0)',
    optionColorActivePending: hoverColor,
    actionTextColor: textColor2,
    loadingColor: primaryColor
  });
}
const internalSelectMenuLight = createTheme({
  name: 'InternalSelectMenu',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self
});
export default internalSelectMenuLight;