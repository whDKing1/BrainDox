import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { cardLight } from "../../card/styles/index.mjs";
import { dialogLight } from "../../dialog/styles/index.mjs";
export function self(vars) {
  const {
    modalColor,
    textColor2,
    boxShadow3
  } = vars;
  return {
    color: modalColor,
    textColor: textColor2,
    boxShadow: boxShadow3
  };
}
const modalLight = createTheme({
  name: 'Modal',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    Card: cardLight
  },
  self
});
export default modalLight;