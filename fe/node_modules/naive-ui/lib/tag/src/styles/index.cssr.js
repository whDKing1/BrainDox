"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-border-radius
// --n-border
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-close-margin
// --n-close-size
// --n-color
// --n-color-checkable
// --n-color-checked
// --n-color-checked-hover
// --n-color-checked-pressed
// --n-color-hover-checkable
// --n-color-pressed-checkable
// --n-font-size
// --n-height
// --n-opacity-disabled
// --n-padding
// --n-text-color
// --n-text-color-checkable
// --n-text-color-checked
// --n-text-color-hover-checkable
// --n-text-color-pressed-checkable
// --n-font-weight-strong
exports.default = (0, cssr_1.cB)('tag', `
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [(0, cssr_1.cM)('strong', `
 font-weight: var(--n-font-weight-strong);
 `), (0, cssr_1.cE)('border', `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('icon', `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), (0, cssr_1.cE)('avatar', `
 display: flex;
 margin: 0 6px 0 0;
 `), (0, cssr_1.cE)('close', `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), (0, cssr_1.cM)('round', `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [(0, cssr_1.cE)('icon', `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), (0, cssr_1.cE)('avatar', `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), (0, cssr_1.cM)('closable', `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), (0, cssr_1.cM)('icon, avatar', [(0, cssr_1.cM)('round', `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), (0, cssr_1.cM)('checkable', `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', 'background-color: var(--n-color-hover-checkable);', [(0, cssr_1.cNotM)('checked', 'color: var(--n-text-color-hover-checkable);')]), (0, cssr_1.c)('&:active', 'background-color: var(--n-color-pressed-checkable);', [(0, cssr_1.cNotM)('checked', 'color: var(--n-text-color-pressed-checkable);')])]), (0, cssr_1.cM)('checked', `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', 'background-color: var(--n-color-checked-hover);'), (0, cssr_1.c)('&:active', 'background-color: var(--n-color-checked-pressed);')])])])]);