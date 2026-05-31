"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('table', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 text-align: right;
 `, [(0, cssr_1.c)('th, td', `
 border-right: 0px solid var(--n-merged-border-color);
 border-left: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.c)('&:last-child', `
 border-left: none;
 border-right: inherit;
 `)]), (0, cssr_1.cM)('single-line', [(0, cssr_1.c)('th, td', `
 border-left: 0px solid var(--n-merged-border-color);
 `)])])])]);