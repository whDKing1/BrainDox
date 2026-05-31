"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-font-size
// --n-line-height
// --n-prefix-color
// --n-text-color
exports.default = (0, cssr_1.cB)('blockquote', `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 margin: 0;
 margin-top: 12px;
 margin-bottom: 12px;
 box-sizing: border-box;
 padding-left: 12px;
 border-left: 4px solid var(--n-prefix-color);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`, [(0, cssr_1.c)('&:first-child', {
  marginTop: 0
}), (0, cssr_1.c)('&:last-child', {
  marginBottom: 0
}), (0, cssr_1.cM)('align-text', {
  marginLeft: '-16px'
})]);