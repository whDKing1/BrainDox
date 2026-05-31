import { cB, cM } from "../../../_utils/cssr/index.mjs";
export default cB('badge', [cM('rtl', `
 direction: rtl;
 `, [cB('badge-sup', `
 right: 100%;
 left: unset;
 transform: translateX(50%);
 direction: initial;
 `)])]);