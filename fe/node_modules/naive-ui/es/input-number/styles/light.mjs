import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { buttonLight } from "../../button/styles/index.mjs";
import { inputLight } from "../../input/styles/index.mjs";
function self(vars) {
  const {
    textColorDisabled
  } = vars;
  return {
    iconColorDisabled: textColorDisabled
  };
}
const inputNumberLight = createTheme({
  name: 'InputNumber',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Input: inputLight
  },
  self
});
export default inputNumberLight;