import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import commonVariables from "./_common.mjs";
const dynamicInputDark = {
  name: 'DynamicInput',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self() {
    return commonVariables;
  }
};
export default dynamicInputDark;