import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    primaryColor,
    baseColor
  } = vars;
  return {
    color: primaryColor,
    iconColor: baseColor
  };
}
const iconWrapperLight = {
  name: 'IconWrapper',
  common: commonLight,
  self
};
export default iconWrapperLight;