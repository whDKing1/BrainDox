"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-text-color
exports.default = (0, cssr_1.cB)('layout', `
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`, [(0, cssr_1.cB)('layout-scroll-container', `
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `), (0, cssr_1.cM)('absolute-positioned', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]);