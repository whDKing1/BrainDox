import { scrollbarLight } from "../../_internal/scrollbar/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import commonVariables from "./_common.mjs";
export function self(vars) {
  const {
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    fontSize,
    dividerColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    fontSize,
    borderRadius,
    color: popoverColor,
    dividerColor,
    textColor: textColor2,
    boxShadow: boxShadow2
  });
}
const popoverLight = createTheme({
  name: 'Popover',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
});
export default popoverLight;