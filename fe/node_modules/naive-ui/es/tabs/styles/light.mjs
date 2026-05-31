import { commonLight } from "../../_styles/common/index.mjs";
import sizeVariables from "./_common.mjs";
export function self(vars) {
  const {
    textColor2,
    primaryColor,
    textColorDisabled,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    tabColor,
    baseColor,
    dividerColor,
    fontWeight,
    textColor1,
    borderRadius,
    fontSize,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, sizeVariables), {
    colorSegment: tabColor,
    tabFontSizeCard: fontSize,
    tabTextColorLine: textColor1,
    tabTextColorActiveLine: primaryColor,
    tabTextColorHoverLine: primaryColor,
    tabTextColorDisabledLine: textColorDisabled,
    tabTextColorSegment: textColor1,
    tabTextColorActiveSegment: textColor2,
    tabTextColorHoverSegment: textColor2,
    tabTextColorDisabledSegment: textColorDisabled,
    tabTextColorBar: textColor1,
    tabTextColorActiveBar: primaryColor,
    tabTextColorHoverBar: primaryColor,
    tabTextColorDisabledBar: textColorDisabled,
    tabTextColorCard: textColor1,
    tabTextColorHoverCard: textColor1,
    tabTextColorActiveCard: primaryColor,
    tabTextColorDisabledCard: textColorDisabled,
    barColor: primaryColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    tabColor,
    tabColorSegment: baseColor,
    tabBorderColor: dividerColor,
    tabFontWeightActive: fontWeight,
    tabFontWeight: fontWeight,
    tabBorderRadius: borderRadius,
    paneTextColor: textColor2,
    fontWeightStrong
  });
}
const tabsLight = {
  name: 'Tabs',
  common: commonLight,
  self
};
export default tabsLight;