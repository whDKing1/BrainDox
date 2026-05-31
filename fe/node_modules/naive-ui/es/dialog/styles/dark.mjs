import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { self } from "./light.mjs";
const dialogDark = {
  name: 'Dialog',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self
};
export default dialogDark;