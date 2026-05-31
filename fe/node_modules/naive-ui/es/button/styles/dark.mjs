import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const buttonDark = {
  name: 'Button',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    commonSelf.waveOpacity = '0.8';
    commonSelf.colorOpacitySecondary = '0.16';
    commonSelf.colorOpacitySecondaryHover = '0.2';
    commonSelf.colorOpacitySecondaryPressed = '0.12';
    return commonSelf;
  }
};
export default buttonDark;