"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-font-size
// --n-margin
// --n-bar-color
// --n-bar-width
// --n-font-weight
// --n-text-color
// --n-prefix-width
exports.default = (0, cssr_1.cB)('h', `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [(0, cssr_1.c)('&:first-child', {
  marginTop: 0
}), (0, cssr_1.cM)('prefix-bar', {
  position: 'relative',
  paddingLeft: 'var(--n-prefix-width)'
}, [(0, cssr_1.cM)('align-text', {
  paddingLeft: 0
}, [(0, cssr_1.c)('&::before', {
  left: 'calc(-1 * var(--n-prefix-width))'
})]), (0, cssr_1.c)('&::before', `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), (0, cssr_1.c)('&::before', {
  backgroundColor: 'var(--n-bar-color)'
})])]);