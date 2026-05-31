import { commonLight } from "../../_styles/common/index.mjs";
import sizeVariables from "./_common.mjs";
function self(vars) {
  const indicatorColor = 'rgba(0, 0, 0, .85)';
  const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)';
  const {
    railColor,
    primaryColor,
    baseColor,
    cardColor,
    modalColor,
    popoverColor,
    borderRadius,
    fontSize,
    opacityDisabled
  } = vars;
  return Object.assign(Object.assign({}, sizeVariables), {
    fontSize,
    markFontSize: fontSize,
    railColor,
    railColorHover: railColor,
    fillColor: primaryColor,
    fillColorHover: primaryColor,
    opacityDisabled,
    handleColor: '#FFF',
    dotColor: cardColor,
    dotColorModal: modalColor,
    dotColorPopover: popoverColor,
    handleBoxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowHover: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowActive: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowFocus: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    indicatorColor,
    indicatorBoxShadow: boxShadow,
    indicatorTextColor: baseColor,
    indicatorBorderRadius: borderRadius,
    dotBorder: `2px solid ${railColor}`,
    dotBorderActive: `2px solid ${primaryColor}`,
    dotBoxShadow: ''
  });
}
const sliderLight = {
  name: 'Slider',
  common: commonLight,
  self
};
export default sliderLight;