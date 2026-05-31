import { changeColor } from 'seemly';
import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { checkboxDark } from "../../checkbox/styles/index.mjs";
import { emptyDark } from "../../empty/styles/index.mjs";
import { self } from "./light.mjs";
const treeDark = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self(vars) {
    const {
      primaryColor
    } = vars;
    const commonSelf = self(vars);
    commonSelf.nodeColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    return commonSelf;
  }
};
export default treeDark;