"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-border-radius
// --n-color
// --n-color-modal
// --n-color-popover
// --n-bezier
// --n-merged-size
exports.default = (0, cssr_1.cB)('avatar', `
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`, [(0, cssr_1.insideModal)((0, cssr_1.c)('&', '--n-merged-color: var(--n-color-modal);')), (0, cssr_1.insidePopover)((0, cssr_1.c)('&', '--n-merged-color: var(--n-color-popover);')), (0, cssr_1.c)('img', `
 width: 100%;
 height: 100%;
 `), (0, cssr_1.cE)('text', `
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `), (0, cssr_1.cB)('icon', `
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `), (0, cssr_1.cE)('text', 'line-height: 1.25')]);