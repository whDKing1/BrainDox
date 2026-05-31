"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('dynamic-input', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('dynamic-input-preset-pair', [(0, cssr_1.cB)('dynamic-input-pair-input', [(0, cssr_1.c)('&:first-child', {
  'margin-left': '12px',
  'margin-right': '0'
})])]), (0, cssr_1.cB)('dynamic-input-item', [(0, cssr_1.cE)('action', `
 margin: var(--action-margin-rtl);
 `)])])]);