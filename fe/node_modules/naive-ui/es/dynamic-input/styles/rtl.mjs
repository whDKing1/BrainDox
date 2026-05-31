import { buttonGroupRtl } from "../../button-group/styles/rtl.mjs";
import { buttonRtl } from "../../button/styles/rtl.mjs";
import { checkboxRtl } from "../../checkbox/styles/rtl.mjs";
import { inputNumberRtl } from "../../input-number/styles/rtl.mjs";
import { inputRtl } from "../../input/styles/rtl.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const dynamicInputRtl = {
  name: 'DynamicInput',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl, buttonGroupRtl, checkboxRtl, inputNumberRtl]
};