"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-border-color
// --n-text-color
exports.default = (0, cssr_1.cB)('layout-footer', `
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
`, [(0, cssr_1.cM)('absolute-positioned', `
 position: absolute;
 left: 0;
 right: 0;
 bottom: 0;
 `), (0, cssr_1.cM)('bordered', `
 border-top: solid 1px var(--n-border-color);
 `)]);