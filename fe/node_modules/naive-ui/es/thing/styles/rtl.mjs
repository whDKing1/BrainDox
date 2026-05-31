import { buttonRtl } from "../../button/styles/rtl.mjs";
import { spaceRtl } from "../../space/styles/rtl.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const thingRtl = {
  name: 'Thing',
  style: rtlStyle,
  peers: [buttonRtl, spaceRtl]
};