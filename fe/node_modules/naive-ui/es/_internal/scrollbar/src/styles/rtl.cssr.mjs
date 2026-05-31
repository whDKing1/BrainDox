import { c, cB, cE, cM } from "../../../../_utils/cssr/index.mjs";
export default cB('scrollbar', [cM('rtl', `
 direction: rtl;
 `, [c('>', [cB('scrollbar-rail', [cM('horizontal', [c('>', [cE('scrollbar', `
 left: 0;
 right: unset;
 `)])])])])])]);