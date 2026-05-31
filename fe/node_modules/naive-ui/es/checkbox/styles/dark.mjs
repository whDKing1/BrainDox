import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const checkboxDark = {
  name: 'Checkbox',
  common: commonDark,
  self(vars) {
    const {
      cardColor
    } = vars;
    const commonSelf = self(vars);
    commonSelf.color = '#0000';
    commonSelf.checkMarkColor = cardColor;
    return commonSelf;
  }
};
export default checkboxDark;