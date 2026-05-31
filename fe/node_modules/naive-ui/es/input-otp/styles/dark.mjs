import { commonDark } from "../../_styles/common/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { self } from "./light.mjs";
const inputOtpDark = {
  name: 'InputOtp',
  common: commonDark,
  peers: {
    Input: inputDark
  },
  self
};
export default inputOtpDark;