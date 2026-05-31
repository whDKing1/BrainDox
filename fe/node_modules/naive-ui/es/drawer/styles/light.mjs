import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    modalColor,
    textColor1,
    textColor2,
    boxShadow3,
    lineHeight,
    fontWeightStrong,
    dividerColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    borderRadius,
    primaryColorHover
  } = vars;
  return {
    bodyPadding: '16px 24px',
    borderRadius,
    headerPadding: '16px 24px',
    footerPadding: '16px 24px',
    color: modalColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    titleFontSize: '18px',
    titleFontWeight: fontWeightStrong,
    boxShadow: boxShadow3,
    lineHeight,
    headerBorderBottom: `1px solid ${dividerColor}`,
    footerBorderTop: `1px solid ${dividerColor}`,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeSize: '22px',
    closeIconSize: '18px',
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    resizableTriggerColorHover: primaryColorHover
  };
}
const drawerLight = createTheme({
  name: 'Drawer',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
});
export default drawerLight;