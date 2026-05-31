import { commonLight } from "../../_styles/common/index.mjs";
function self(vars) {
  const {
    errorColor,
    infoColor,
    successColor,
    warningColor,
    fontFamily
  } = vars;
  return {
    color: errorColor,
    colorInfo: infoColor,
    colorSuccess: successColor,
    colorError: errorColor,
    colorWarning: warningColor,
    fontSize: '12px',
    fontFamily
  };
}
const badgeLight = {
  name: 'Badge',
  common: commonLight,
  self
};
export default badgeLight;