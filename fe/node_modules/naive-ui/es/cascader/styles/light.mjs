import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { internalSelectMenuLight } from "../../_internal/select-menu/styles/index.mjs";
import { internalSelectionLight } from "../../_internal/selection/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { checkboxLight } from "../../checkbox/styles/index.mjs";
import { emptyLight } from "../../empty/styles/index.mjs";
export function self(vars) {
  const {
    borderRadius,
    boxShadow2,
    popoverColor,
    textColor2,
    textColor3,
    primaryColor,
    textColorDisabled,
    dividerColor,
    hoverColor,
    fontSizeMedium,
    heightMedium
  } = vars;
  return {
    menuBorderRadius: borderRadius,
    menuColor: popoverColor,
    menuBoxShadow: boxShadow2,
    menuDividerColor: dividerColor,
    menuHeight: 'calc(var(--n-option-height) * 6.6)',
    optionArrowColor: textColor3,
    optionHeight: heightMedium,
    optionFontSize: fontSizeMedium,
    optionColorHover: hoverColor,
    optionTextColor: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorDisabled: textColorDisabled,
    optionCheckMarkColor: primaryColor,
    loadingColor: primaryColor,
    columnWidth: '180px'
  };
}
const cascaderLight = createTheme({
  name: 'Cascader',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    InternalSelection: internalSelectionLight,
    Scrollbar: scrollbarLight,
    Checkbox: checkboxLight,
    Empty: emptyLight
  },
  self
});
export default cascaderLight;