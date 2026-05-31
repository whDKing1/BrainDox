"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-font-size
// --n-line-height
// --n-margin
// --n-text-color
exports.default = (0, cssr_1.cB)('p', `
 box-sizing: border-box;
 transition: color .3s var(--n-bezier);
 margin: var(--n-margin);
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 color: var(--n-text-color);
`, [(0, cssr_1.c)('&:first-child', 'margin-top: 0;'), (0, cssr_1.c)('&:last-child', 'margin-bottom: 0;')]);