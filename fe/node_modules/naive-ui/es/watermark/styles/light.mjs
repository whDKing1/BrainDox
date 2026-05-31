import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
const watermarkLight = createTheme({
  name: 'Watermark',
  common: commonLight,
  self(vars) {
    const {
      fontFamily
    } = vars;
    return {
      fontFamily
    };
  }
});
export default watermarkLight;