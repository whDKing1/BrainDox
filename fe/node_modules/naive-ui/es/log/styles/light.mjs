import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { codeLight } from "../../code/styles/index.mjs";
function self(vars) {
  const {
    textColor2,
    modalColor,
    borderColor,
    fontSize,
    primaryColor
  } = vars;
  return {
    loaderFontSize: fontSize,
    loaderTextColor: textColor2,
    loaderColor: modalColor,
    loaderBorder: `1px solid ${borderColor}`,
    loadingColor: primaryColor
  };
}
const logLight = createTheme({
  name: 'Log',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Code: codeLight
  },
  self
});
export default logLight;