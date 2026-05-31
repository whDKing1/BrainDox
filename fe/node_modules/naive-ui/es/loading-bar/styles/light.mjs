import { commonLight } from "../../_styles/common/index.mjs";
function self(vars) {
  const {
    primaryColor,
    errorColor
  } = vars;
  return {
    colorError: errorColor,
    colorLoading: primaryColor,
    height: '2px'
  };
}
const loadingBarLight = {
  name: 'LoadingBar',
  common: commonLight,
  self
};
export default loadingBarLight;