import { c, cB, cE, cM, cNotM } from "../../../_utils/cssr/index.mjs";
import { n1, zero } from "./index.cssr.mjs";
function createRightBorderStyle(type) {
  return cM(`${type}-type`, [c('& +', [cB('button', {}, [cM(`${type}-type`, [cE('border', {
    borderRightWidth: zero
  }), cE('state-border', {
    left: n1
  })])])])]);
}
export default cB('button-group', [cNotM('vertical', [cM('rtl', `
 direction: rtl;
 `, [cB('button', [c('&:last-child:not(:first-child)', `
 margin-right: ${zero};
 border-top-right-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c('&:first-child:not(:last-child)', `
 margin-left: ${zero};
 border-top-left-radius: ${zero};
 border-bottom-left-radius: ${zero};
 `), c('&:not(:last-child):not(:first-child)', `
 margin-left: ${zero};
 margin-right: ${zero};
 border-radius: ${zero};
 `), createRightBorderStyle('default'), cM('ghost', [createRightBorderStyle('primary'), createRightBorderStyle('info'), createRightBorderStyle('success'), createRightBorderStyle('warning'), createRightBorderStyle('error')])])])])]);