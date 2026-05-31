import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const cardDark = {
  name: 'Card',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    const {
      cardColor,
      modalColor,
      popoverColor
    } = vars;
    commonSelf.colorEmbedded = cardColor;
    commonSelf.colorEmbeddedModal = modalColor;
    commonSelf.colorEmbeddedPopover = popoverColor;
    return commonSelf;
  }
};
export default cardDark;