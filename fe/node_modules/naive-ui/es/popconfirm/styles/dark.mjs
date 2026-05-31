import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { popoverDark } from "../../popover/styles/index.mjs";
import { self } from "./light.mjs";
const popconfirmDark = {
  name: 'Popconfirm',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Popover: popoverDark
  },
  self
};
export default popconfirmDark;