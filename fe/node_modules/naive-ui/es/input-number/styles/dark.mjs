import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
const inputNumberDark = {
  name: 'InputNumber',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Input: inputDark
  },
  self(vars) {
    const {
      textColorDisabled
    } = vars;
    return {
      iconColorDisabled: textColorDisabled
    };
  }
};
export default inputNumberDark;