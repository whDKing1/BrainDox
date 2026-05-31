import { changeColor } from 'seemly';
import { commonDark } from "../../_styles/common/index.mjs";
import { dropdownDark } from "../../dropdown/styles/index.mjs";
import { tooltipDark } from "../../tooltip/styles/index.mjs";
import { self } from "./light.mjs";
const menuDark = {
  name: 'Menu',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark,
    Dropdown: dropdownDark
  },
  self(vars) {
    const {
      primaryColor,
      primaryColorSuppl
    } = vars;
    const commonSelf = self(vars);
    commonSelf.itemColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveHover = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveCollapsed = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveInverted = primaryColorSuppl;
    commonSelf.itemColorActiveHoverInverted = primaryColorSuppl;
    commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl;
    return commonSelf;
  }
};
export default menuDark;