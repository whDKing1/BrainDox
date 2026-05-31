"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
const hoverStyleProps = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`;
const hoverStyleChildren = [(0, cssr_1.cM)('button', `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)];
// vars:
// --n-item-font-size
// --n-select-width
// --n-input-width
// --n-input-margin
// --n-item-size
// --n-item-text-color
// --n-item-text-color-disabled
// --n-item-text-color-hover
// --n-item-text-color-active
// --n-item-color
// --n-item-color-hover
// --n-item-color-disabled
// --n-item-color-active
// --n-item-color-active-hover
// --n-item-border
// --n-item-border-hover
// --n-item-border-disabled
// --n-item-border-active
// --n-item-padding
// --n-item-font-size
// --n-item-border-radius
// --n-bezier
// --n-jumper-font-size
// --n-jumper-text-color
// --n-jumper-text-color-disabled
// --n-item-margin
// --n-button-icon-size
// --n-button-icon-color
// --n-button-icon-color-hover
// --n-button-icon-color-pressed
// --n-prefix-margin
// --n-suffix-margin
// --n-button-color
// --n-button-color-hover
// --n-button-color-pressed
exports.default = (0, cssr_1.cB)('pagination', `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [(0, cssr_1.cB)('pagination-prefix', `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), (0, cssr_1.cB)('pagination-suffix', `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), (0, cssr_1.c)('> *:not(:first-child)', `
 margin: var(--n-item-margin);
 `), (0, cssr_1.cB)('select', `
 width: var(--n-select-width);
 `), (0, cssr_1.c)('&.transition-disabled', [(0, cssr_1.cB)('pagination-item', 'transition: none!important;')]), (0, cssr_1.cB)('pagination-quick-jumper', `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [(0, cssr_1.cB)('input', `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), (0, cssr_1.cB)('pagination-item', `
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('button', `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [(0, cssr_1.cB)('base-icon', `
 font-size: var(--n-button-icon-size);
 `)]), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cM)('hover', hoverStyleProps, hoverStyleChildren), (0, cssr_1.c)('&:hover', hoverStyleProps, hoverStyleChildren), (0, cssr_1.c)('&:active', `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [(0, cssr_1.cM)('button', `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), (0, cssr_1.cM)('active', `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [(0, cssr_1.c)('&:hover', `
 background: var(--n-item-color-active-hover);
 `)])]), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [(0, cssr_1.cM)('active, button', `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 `, [(0, cssr_1.cB)('pagination-quick-jumper', `
 color: var(--n-jumper-text-color-disabled);
 `)]), (0, cssr_1.cM)('simple', `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [(0, cssr_1.cB)('pagination-quick-jumper', [(0, cssr_1.cB)('input', `
 margin: 0;
 `)])])]);