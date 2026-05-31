import { inputRtl } from "../../input/styles/rtl.mjs";
import { selectRtl } from "../../select/styles/index.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const paginationRtl = {
  name: 'Pagination',
  style: rtlStyle,
  peers: [inputRtl, selectRtl]
};