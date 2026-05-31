"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('alert', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cE)('icon', `
 left: unset;
 right: 0;
 margin: var(--n-icon-margin-rtl);
 `), (0, cssr_1.cM)('show-icon', [(0, cssr_1.cB)('alert-body', `
 padding-left: var(--n-padding);
 padding-right: calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right));
 `)]), (0, cssr_1.cE)('close', `
 position: absolute;
 right: unset;
 left: 0;
 margin: var(--n-close-margin-rtl);
 `)])]);