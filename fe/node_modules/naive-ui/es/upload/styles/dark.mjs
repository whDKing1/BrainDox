import { changeColor } from 'seemly';
import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { progressDark } from "../../progress/styles/index.mjs";
import { self } from "./light.mjs";
const uploadDark = {
  name: 'Upload',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Progress: progressDark
  },
  self(vars) {
    const {
      errorColor
    } = vars;
    const commonSelf = self(vars);
    commonSelf.itemColorHoverError = changeColor(errorColor, {
      alpha: 0.09
    });
    return commonSelf;
  }
};
export default uploadDark;