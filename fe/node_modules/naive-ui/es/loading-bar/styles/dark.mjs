import { commonDark } from "../../_styles/common/index.mjs";
const loadingBarDark = {
  name: 'LoadingBar',
  common: commonDark,
  self(vars) {
    const {
      primaryColor
    } = vars;
    return {
      colorError: 'red',
      colorLoading: primaryColor,
      height: '2px'
    };
  }
};
export default loadingBarDark;