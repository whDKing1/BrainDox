import { composite } from 'seemly';
import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    borderRadius,
    avatarColor,
    cardColor,
    fontSize,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    modalColor,
    popoverColor
  } = vars;
  return {
    borderRadius,
    fontSize,
    border: `2px solid ${cardColor}`,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    color: composite(cardColor, avatarColor),
    colorModal: composite(modalColor, avatarColor),
    colorPopover: composite(popoverColor, avatarColor)
  };
}
const avatarLight = {
  name: 'Avatar',
  common: commonLight,
  self
};
export default avatarLight;