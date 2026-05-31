import { scrollbarRtl } from "../../_internal/scrollbar/styles/rtl.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const drawerRtl = {
  name: 'Drawer',
  style: rtlStyle,
  peers: [scrollbarRtl]
};
export default drawerRtl;