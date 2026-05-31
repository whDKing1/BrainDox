"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('base-select-menu', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('base-select-option', [(0, cssr_1.cE)('check', `
 right: unset;
 left: calc(var(--n-option-padding-right) - 4px);
 `), (0, cssr_1.cM)('show-checkmark', `
 padding-left: calc(var(--n-option-padding-right) + 20px);
 padding-right: var(--n-option-padding-left);
 `)])])]);