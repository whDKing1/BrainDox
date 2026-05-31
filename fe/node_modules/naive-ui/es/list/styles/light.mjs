import { composite } from 'seemly';
import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    textColor2,
    cardColor,
    modalColor,
    popoverColor,
    dividerColor,
    borderRadius,
    fontSize,
    hoverColor
  } = vars;
  return {
    textColor: textColor2,
    color: cardColor,
    colorHover: hoverColor,
    colorModal: modalColor,
    colorHoverModal: composite(modalColor, hoverColor),
    colorPopover: popoverColor,
    colorHoverPopover: composite(popoverColor, hoverColor),
    borderColor: dividerColor,
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    borderRadius,
    fontSize
  };
}
const listLight = {
  name: 'List',
  common: commonLight,
  self
};
export default listLight;