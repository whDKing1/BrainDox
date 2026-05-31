"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('pagination', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.c)('> *:not(:first-child)', `
 margin: var(--n-item-margin-rtl);
 `), (0, cssr_1.cB)('pagination-quick-jumper', [(0, cssr_1.cB)('input', `
 margin: var(--n-input-margin-rtl);
 `)])])]);