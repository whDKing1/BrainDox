"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
const liStyle = (0, cssr_1.c)('li', {
  transition: 'color .3s var(--n-bezier)',
  lineHeight: 'var(--n-line-height)',
  margin: 'var(--n-li-margin)',
  marginBottom: 0,
  color: 'var(--n-text-color)'
});
const childStyle = [(0, cssr_1.c)('&:first-child', `
 margin-top: 0;
 `), (0, cssr_1.c)('&:last-child', `
 margin-bottom: 0;
 `)];
// vars:
// --n-bezier
// --n-font-size
// --n-line-height
// --n-text-color
// --n-li-margin
// --n-ol-padding
// --n-ul-padding
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('ol', {
  fontSize: 'var(--n-font-size)',
  padding: 'var(--n-ol-padding)'
}, [(0, cssr_1.cM)('align-text', {
  paddingLeft: 0
}), liStyle, childStyle]), (0, cssr_1.cB)('ul', {
  fontSize: 'var(--n-font-size)',
  padding: 'var(--n-ul-padding)'
}, [(0, cssr_1.cM)('align-text', {
  paddingLeft: 0
}), liStyle, childStyle])]);