import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { buttonLight } from "../../button/styles/index.mjs";
import { popoverLight } from "../../popover/styles/index.mjs";
import commonVars from "./_common.mjs";
export function self(vars) {
  const {
    fontSize,
    warningColor
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    fontSize,
    iconColor: warningColor
  });
}
const popconfirmLight = createTheme({
  name: 'Popconfirm',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Popover: popoverLight
  },
  self
});
export default popconfirmLight;