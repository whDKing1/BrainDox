"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
const index_cssr_1 = require("./index.cssr");
function createRightBorderStyle(type) {
  return (0, cssr_1.cM)(`${type}-type`, [(0, cssr_1.c)('& +', [(0, cssr_1.cB)('button', {}, [(0, cssr_1.cM)(`${type}-type`, [(0, cssr_1.cE)('border', {
    borderRightWidth: index_cssr_1.zero
  }), (0, cssr_1.cE)('state-border', {
    left: index_cssr_1.n1
  })])])])]);
}
exports.default = (0, cssr_1.cB)('button-group', [(0, cssr_1.cNotM)('vertical', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('button', [(0, cssr_1.c)('&:last-child:not(:first-child)', `
 margin-right: ${index_cssr_1.zero};
 border-top-right-radius: ${index_cssr_1.zero};
 border-bottom-right-radius: ${index_cssr_1.zero};
 `), (0, cssr_1.c)('&:first-child:not(:last-child)', `
 margin-left: ${index_cssr_1.zero};
 border-top-left-radius: ${index_cssr_1.zero};
 border-bottom-left-radius: ${index_cssr_1.zero};
 `), (0, cssr_1.c)('&:not(:last-child):not(:first-child)', `
 margin-left: ${index_cssr_1.zero};
 margin-right: ${index_cssr_1.zero};
 border-radius: ${index_cssr_1.zero};
 `), createRightBorderStyle('default'), (0, cssr_1.cM)('ghost', [createRightBorderStyle('primary'), createRightBorderStyle('info'), createRightBorderStyle('success'), createRightBorderStyle('warning'), createRightBorderStyle('error')])])])])]);