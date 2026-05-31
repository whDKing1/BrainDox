"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-icon-size
// --n-icon-color
// --n-bezier
// --n-text-color
// --n-extra-text-color
exports.default = (0, cssr_1.cB)('empty', `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [(0, cssr_1.cE)('icon', `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('+', [(0, cssr_1.cE)('description', `
 margin-top: 8px;
 `)])]), (0, cssr_1.cE)('description', `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), (0, cssr_1.cE)('extra', `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]);