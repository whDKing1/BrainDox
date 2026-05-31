"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-color
// --n-color-hover
// --n-border-radius
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-color-modal
// --n-color-popover
// --n-color-hover-modal
// --n-color-hover-popover
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('list', `
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `, [(0, cssr_1.cM)('show-divider', [(0, cssr_1.cB)('list-item', [(0, cssr_1.c)('&:not(:last-child)', [(0, cssr_1.cE)('divider', `
 background-color: var(--n-merged-border-color);
 `)])])]), (0, cssr_1.cM)('clickable', [(0, cssr_1.cB)('list-item', `
 cursor: pointer;
 `)]), (0, cssr_1.cM)('bordered', `
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `), (0, cssr_1.cM)('hoverable', [(0, cssr_1.cB)('list-item', `
 border-radius: var(--n-border-radius);
 `, [(0, cssr_1.c)('&:hover', `
 background-color: var(--n-merged-color-hover);
 `, [(0, cssr_1.cE)('divider', `
 background-color: transparent;
 `)])])]), (0, cssr_1.cM)('bordered, hoverable', [(0, cssr_1.cB)('list-item', `
 padding: 12px 20px;
 `), (0, cssr_1.cE)('header, footer', `
 padding: 12px 20px;
 `)]), (0, cssr_1.cE)('header, footer', `
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('&:not(:last-child)', `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]), (0, cssr_1.cB)('list-item', `
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('prefix', `
 margin-right: 20px;
 flex: 0;
 `), (0, cssr_1.cE)('suffix', `
 margin-left: 20px;
 flex: 0;
 `), (0, cssr_1.cE)('main', `
 flex: 1;
 `), (0, cssr_1.cE)('divider', `
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]), (0, cssr_1.insideModal)((0, cssr_1.cB)('list', `
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)), (0, cssr_1.insidePopover)((0, cssr_1.cB)('list', `
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]);