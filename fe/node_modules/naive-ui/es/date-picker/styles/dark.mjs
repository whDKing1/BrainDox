import { changeColor, composite } from 'seemly';
import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { timePickerDark } from "../../time-picker/styles/index.mjs";
import { self } from "./light.mjs";
const datePickerDark = {
  name: 'DatePicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    TimePicker: timePickerDark,
    Scrollbar: scrollbarDark
  },
  self(vars) {
    const {
      popoverColor,
      hoverColor,
      primaryColor
    } = vars;
    const commonSelf = self(vars);
    commonSelf.itemColorDisabled = composite(popoverColor, hoverColor);
    commonSelf.itemColorIncluded = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorHover = composite(popoverColor, hoverColor);
    return commonSelf;
  }
};
export default datePickerDark;