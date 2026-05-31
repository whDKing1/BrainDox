import { cB, cM } from "../../../_utils/cssr/index.mjs";
export default cB('thing', [cM('rtl', `
 direction: rtl;
 text-align: right;
 `, [cB('thing-avatar', `
 margin-left: 12px;
 margin-right: 0;
 `)])]);