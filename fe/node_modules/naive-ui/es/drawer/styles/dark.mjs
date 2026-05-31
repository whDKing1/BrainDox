import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const drawerDark = {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self
};
export default drawerDark;