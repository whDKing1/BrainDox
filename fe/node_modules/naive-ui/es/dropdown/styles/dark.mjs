import { changeColor } from 'seemly';
import { commonDark } from "../../_styles/common/index.mjs";
import { popoverDark } from "../../popover/styles/index.mjs";
import { self } from "./light.mjs";
const dropdownDark = {
  name: 'Dropdown',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self(vars) {
    const {
      primaryColorSuppl,
      primaryColor,
      popoverColor
    } = vars;
    const commonSelf = self(vars);
    commonSelf.colorInverted = popoverColor;
    commonSelf.optionColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.optionColorActiveInverted = primaryColorSuppl;
    commonSelf.optionColorHoverInverted = primaryColorSuppl;
    return commonSelf;
  }
};
export default dropdownDark;