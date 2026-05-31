"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-text-color
// --n-font-weight-strong
// --n-font-famliy-mono
// --n-code-border-radius
// --n-code-text-color
// --n-code-color
// --n-code-border
exports.default = (0, cssr_1.cB)('text', `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [(0, cssr_1.cM)('strong', `
 font-weight: var(--n-font-weight-strong);
 `), (0, cssr_1.cM)('italic', {
  fontStyle: 'italic'
}), (0, cssr_1.cM)('underline', {
  textDecoration: 'underline'
}), (0, cssr_1.cM)('code', `
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]);