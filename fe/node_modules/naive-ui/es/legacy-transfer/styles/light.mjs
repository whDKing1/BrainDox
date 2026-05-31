import { composite } from 'seemly';
import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { buttonLight } from "../../button/styles/index.mjs";
import { checkboxLight } from "../../checkbox/styles/index.mjs";
import { emptyLight } from "../../empty/styles/index.mjs";
import { inputLight } from "../../input/styles/index.mjs";
import commonVariables from "./_common.mjs";
function self(vars) {
  const {
    fontWeight,
    iconColorDisabled,
    iconColor,
    fontSizeLarge,
    fontSizeMedium,
    fontSizeSmall,
    heightLarge,
    heightMedium,
    heightSmall,
    borderRadius,
    cardColor,
    tableHeaderColor,
    textColor1,
    textColorDisabled,
    textColor2,
    borderColor,
    hoverColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    itemHeightSmall: heightSmall,
    itemHeightMedium: heightMedium,
    itemHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius,
    borderColor,
    listColor: cardColor,
    headerColor: composite(cardColor, tableHeaderColor),
    titleTextColor: textColor1,
    titleTextColorDisabled: textColorDisabled,
    extraTextColor: textColor2,
    filterDividerColor: borderColor,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemColorPending: hoverColor,
    titleFontWeight: fontWeight,
    iconColor,
    iconColorDisabled
  });
}
const transferLight = createTheme({
  name: 'Transfer',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Input: inputLight,
    Empty: emptyLight,
    Button: buttonLight
  },
  self
});
export default transferLight;