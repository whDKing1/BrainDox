"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-opacity
exports.default = (0, cssr_1.cB)('icon', `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [(0, cssr_1.cM)('color-transition', {
  transition: 'color .3s var(--n-bezier)'
}), (0, cssr_1.cM)('depth', {
  color: 'var(--n-color)'
}, [(0, cssr_1.c)('svg', {
  opacity: 'var(--n-opacity)',
  transition: 'opacity .3s var(--n-bezier)'
})]), (0, cssr_1.c)('svg', {
  height: '1em',
  width: '1em'
})]);