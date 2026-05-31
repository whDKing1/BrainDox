"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('base-selection', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-left) var(--n-padding-single-bottom) var(--n-padding-single-right);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-left) var(--n-padding-multiple-bottom) var(--n-padding-multiple-right);
 `, [(0, cssr_1.cB)('base-suffix', `
 right: unset;
 left: 10px;
 `)])]);