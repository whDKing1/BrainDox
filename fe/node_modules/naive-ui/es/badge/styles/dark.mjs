import { commonDark } from "../../_styles/common/index.mjs";
const badgeDark = {
  name: 'Badge',
  common: commonDark,
  self(vars) {
    const {
      errorColorSuppl,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      fontFamily
    } = vars;
    return {
      color: errorColorSuppl,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl,
      fontSize: '12px',
      fontFamily
    };
  }
};
export default badgeDark;