import { scrollbarRtl } from "../../_internal/scrollbar/styles/index.mjs";
import { paginationRtl } from "../../pagination/styles/index.mjs";
import rtlStyle from "../src/styles/rtl.cssr.mjs";
export const DataTableRtl = {
  name: 'DataTable',
  style: rtlStyle,
  peers: [scrollbarRtl, paginationRtl]
};