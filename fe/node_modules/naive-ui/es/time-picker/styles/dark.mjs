import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { self } from "./light.mjs";
const timePickerDark = {
  name: 'TimePicker',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark,
    Input: inputDark
  },
  self
};
export default timePickerDark;