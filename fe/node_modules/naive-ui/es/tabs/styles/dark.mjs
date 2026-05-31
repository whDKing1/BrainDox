import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const tabsDark = {
  name: 'Tabs',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    const {
      inputColor
    } = vars;
    commonSelf.colorSegment = inputColor;
    commonSelf.tabColorSegment = inputColor;
    return commonSelf;
  }
};
export default tabsDark;