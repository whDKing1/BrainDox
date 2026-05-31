import { buttonRtl } from "../../button/styles/rtl.mjs";
import { inputRtl } from "../../input/styles/rtl.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const inputNumberRtl = {
  name: 'InputNumber',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl]
};