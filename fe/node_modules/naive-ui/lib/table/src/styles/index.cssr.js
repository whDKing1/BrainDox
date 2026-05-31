"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-td-color
// --n-td-color-modal
// --n-td-color-popover
// --n-td-text-color
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-border-radius
// --n-font-size
// --n-th-color
// --n-th-color-modal
// --n-th-color-popover
// --n-th-font-weight
// --n-th-text-color
// --n-line-height
// --n-td-padding
// --n-th-padding
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('table', `
 font-size: var(--n-font-size);
 font-variant-numeric: tabular-nums;
 line-height: var(--n-line-height);
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 text-align: left;
 border-collapse: separate;
 border-spacing: 0;
 overflow: hidden;
 background-color: var(--n-td-color);
 border-color: var(--n-merged-border-color);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 --n-merged-border-color: var(--n-border-color);
 `, [(0, cssr_1.c)('th', `
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 text-align: inherit;
 padding: var(--n-th-padding);
 vertical-align: inherit;
 text-transform: none;
 border: 0px solid var(--n-merged-border-color);
 font-weight: var(--n-th-font-weight);
 color: var(--n-th-text-color);
 background-color: var(--n-th-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.c)('&:last-child', `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), (0, cssr_1.c)('td', `
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 padding: var(--n-td-padding);
 color: var(--n-td-text-color);
 background-color: var(--n-td-color);
 border: 0px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.c)('&:last-child', `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), (0, cssr_1.cM)('bordered', `
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `, [(0, cssr_1.c)('tr', [(0, cssr_1.c)('&:last-child', [(0, cssr_1.c)('td', `
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]), (0, cssr_1.cM)('single-line', [(0, cssr_1.c)('th', `
 border-right: 0px solid var(--n-merged-border-color);
 `), (0, cssr_1.c)('td', `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), (0, cssr_1.cM)('single-column', [(0, cssr_1.c)('tr', [(0, cssr_1.c)('&:not(:last-child)', [(0, cssr_1.c)('td', `
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]), (0, cssr_1.cM)('striped', [(0, cssr_1.c)('tr:nth-of-type(even)', [(0, cssr_1.c)('td', 'background-color: var(--n-td-color-striped)')])]), (0, cssr_1.cNotM)('bottom-bordered', [(0, cssr_1.c)('tr', [(0, cssr_1.c)('&:last-child', [(0, cssr_1.c)('td', `
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]), (0, cssr_1.insideModal)((0, cssr_1.cB)('table', `
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `, [(0, cssr_1.c)('th', `
 background-color: var(--n-th-color-modal);
 `), (0, cssr_1.c)('td', `
 background-color: var(--n-td-color-modal);
 `)])), (0, cssr_1.insidePopover)((0, cssr_1.cB)('table', `
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `, [(0, cssr_1.c)('th', `
 background-color: var(--n-th-color-popover);
 `), (0, cssr_1.c)('td', `
 background-color: var(--n-td-color-popover);
 `)]))]);