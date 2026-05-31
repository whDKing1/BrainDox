import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { self } from "./light.mjs";
const colorPickerDark = {
  name: 'ColorPicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self
};
export default colorPickerDark;