"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-resize-trigger-color
// --n-resize-trigger-color-hover
// --n-bezier
exports.default = (0, cssr_1.cB)('split', `
 display: flex;
 width: 100%;
 height: 100%;
`, [(0, cssr_1.cM)('horizontal', `
 flex-direction: row;
 `), (0, cssr_1.cM)('vertical', `
 flex-direction: column;
 `), (0, cssr_1.cB)('split-pane-1', `
 overflow: hidden;
 `), (0, cssr_1.cB)('split-pane-2', `
 overflow: hidden;
 flex: 1;
 `), (0, cssr_1.cE)('resize-trigger', `
 background-color: var(--n-resize-trigger-color);
 transition: background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('hover', `
 background-color: var(--n-resize-trigger-color-hover);
 `), (0, cssr_1.c)('&:hover', `
 background-color: var(--n-resize-trigger-color-hover);
 `)])]);