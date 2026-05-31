import { composite } from 'seemly';
import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { buttonLight } from "../../button/styles/index.mjs";
import { checkboxLight } from "../../checkbox/styles/index.mjs";
import { dropdownLight } from "../../dropdown/styles/index.mjs";
import { ellipsisLight } from "../../ellipsis/styles/index.mjs";
import { emptyLight } from "../../empty/styles/index.mjs";
import { paginationLight } from "../../pagination/styles/index.mjs";
import { popoverLight } from "../../popover/styles/index.mjs";
import { radioLight } from "../../radio/styles/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    cardColor,
    modalColor,
    popoverColor,
    textColor2,
    textColor1,
    tableHeaderColor,
    tableColorHover,
    iconColor,
    primaryColor,
    fontWeightStrong,
    borderRadius,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor,
    heightSmall,
    opacityDisabled,
    tableColorStriped
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    actionDividerColor: dividerColor,
    lineHeight,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderColor: composite(cardColor, dividerColor),
    tdColorHover: composite(cardColor, tableColorHover),
    tdColorSorting: composite(cardColor, tableColorHover),
    tdColorStriped: composite(cardColor, tableColorStriped),
    thColor: composite(cardColor, tableHeaderColor),
    thColorHover: composite(composite(cardColor, tableHeaderColor), tableColorHover),
    thColorSorting: composite(composite(cardColor, tableHeaderColor), tableColorHover),
    tdColor: cardColor,
    tdTextColor: textColor2,
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    thButtonColorHover: tableColorHover,
    thIconColor: iconColor,
    thIconColorActive: primaryColor,
    // modal
    borderColorModal: composite(modalColor, dividerColor),
    tdColorHoverModal: composite(modalColor, tableColorHover),
    tdColorSortingModal: composite(modalColor, tableColorHover),
    tdColorStripedModal: composite(modalColor, tableColorStriped),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorHoverModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
    thColorSortingModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
    tdColorModal: modalColor,
    // popover
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColorHoverPopover: composite(popoverColor, tableColorHover),
    tdColorSortingPopover: composite(popoverColor, tableColorHover),
    tdColorStripedPopover: composite(popoverColor, tableColorStriped),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thColorHoverPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
    thColorSortingPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
    tdColorPopover: popoverColor,
    boxShadowBefore: 'inset -12px 0 8px -12px rgba(0, 0, 0, .18)',
    boxShadowAfter: 'inset 12px 0 8px -12px rgba(0, 0, 0, .18)',
    // loading
    loadingColor: primaryColor,
    loadingSize: heightSmall,
    opacityLoading: opacityDisabled
  });
}
const dataTableLight = createTheme({
  name: 'DataTable',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Checkbox: checkboxLight,
    Radio: radioLight,
    Pagination: paginationLight,
    Scrollbar: scrollbarLight,
    Empty: emptyLight,
    Popover: popoverLight,
    Ellipsis: ellipsisLight,
    Dropdown: dropdownLight
  },
  self
});
export default dataTableLight;