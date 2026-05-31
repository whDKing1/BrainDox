"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-bezier
// --n-item-text-color
// --n-item-text-color-hover
// --n-item-text-color-pressed
// --n-item-text-color-active
// --n-separator-color
// --n-font-weight-active
// --n-item-border-radius
// --n-item-color-hover
// --n-item-color-active
// --n-item-line-height
exports.default = (0, cssr_1.cB)('breadcrumb', `
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`, [(0, cssr_1.c)('ul', `
 list-style: none;
 padding: 0;
 margin: 0;
 `), (0, cssr_1.c)('a', `
 color: inherit;
 text-decoration: inherit;
 `), (0, cssr_1.cB)('breadcrumb-item', `
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `, [(0, cssr_1.cB)('icon', `
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `), (0, cssr_1.c)('&:not(:last-child)', [(0, cssr_1.cM)('clickable', [(0, cssr_1.cE)('link', `
 cursor: pointer;
 `, [(0, cssr_1.c)('&:hover', `
 background-color: var(--n-item-color-hover);
 `), (0, cssr_1.c)('&:active', `
 background-color: var(--n-item-color-pressed); 
 `)])])]), (0, cssr_1.cE)('link', `
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `, [(0, cssr_1.c)('&:hover', `
 color: var(--n-item-text-color-hover);
 `, [(0, cssr_1.cB)('icon', `
 color: var(--n-item-text-color-hover);
 `)]), (0, cssr_1.c)('&:active', `
 color: var(--n-item-text-color-pressed);
 `, [(0, cssr_1.cB)('icon', `
 color: var(--n-item-text-color-pressed);
 `)])]), (0, cssr_1.cE)('separator', `
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `), (0, cssr_1.c)('&:last-child', [(0, cssr_1.cE)('link', `
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `, [(0, cssr_1.cB)('icon', `
 color: var(--n-item-text-color-active);
 `)]), (0, cssr_1.cE)('separator', `
 display: none;
 `)])])]);