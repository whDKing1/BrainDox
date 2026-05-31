"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('tag', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-left) var(--n-close-margin-bottom) var(--n-close-margin-right);
 `, [(0, cssr_1.cE)('icon', `
 margin: 0 0 0 4px;
 `), (0, cssr_1.cE)('avatar', `
 margin: 0 0 0 6px;
 `), (0, cssr_1.cM)('round', [(0, cssr_1.cE)('icon', `
 margin: 0 calc((var(--n-height) - 8px) / -2) 0 4px;
 `), (0, cssr_1.cE)('avatar', `
 margin: 0 calc((var(--n-height) - 8px) / -2) 0 6px;
 `), (0, cssr_1.cM)('closable', `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 4);
 `)]), (0, cssr_1.cM)('icon, avatar', [(0, cssr_1.cM)('round', `
 padding: 0 calc(var(--n-height) / 2) 0 calc(var(--n-height) / 3);
 `)])])]);