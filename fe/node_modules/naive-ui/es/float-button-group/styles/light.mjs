import { commonLight } from "../../styles.mjs";
function self(vars) {
  const {
    popoverColor,
    dividerColor,
    borderRadius
  } = vars;
  return {
    color: popoverColor,
    buttonBorderColor: dividerColor,
    borderRadiusSquare: borderRadius,
    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)'
  };
}
const themeLight = {
  name: 'FloatButtonGroup',
  common: commonLight,
  self
};
export default themeLight;