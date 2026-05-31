"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safariStyle = void 0;
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-font-size
// --n-border-radius
// --n-height
// --n-padding-left
// --n-padding-right
// --n-text-color
// --n-text-color-disabled
// --n-caret-color
// --n-text-decoration-color
// --n-border
// --n-border-disabled
// --n-border-hover
// --n-border-focus
// --n-placeholder-color
// --n-placeholder-color-disabled
// --n-line-height-textarea
// --n-color-disabled
// --n-color-focus
// --n-box-shadow-focus
// --n-clear-color
// --n-clear-size
// --n-clear-color-hover
// --n-clear-color-pressed
// --n-suffix-text-color
// --n-icon-color
// --n-icon-color-hover
// --n-icon-color-pressed
// --n-icon-color-disabled
// --n-count-text-color
// --n-count-text-color-disabled
// --n-loading-color
// ...form item vars
exports.default = (0, cssr_1.cB)('input', `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
// common
(0, cssr_1.cE)('input, textarea', `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `), (0, cssr_1.cE)('input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder', `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('input-el, textarea-el', `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [(0, cssr_1.c)('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
 width: 0;
 height: 0;
 display: none;
 `), (0, cssr_1.c)('&::placeholder', `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), (0, cssr_1.c)('&:-webkit-autofill ~', [(0, cssr_1.cE)('placeholder', 'display: none;')])]), (0, cssr_1.cM)('round', [(0, cssr_1.cNotM)('textarea', 'border-radius: calc(var(--n-height) / 2);')]), (0, cssr_1.cE)('placeholder', `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [(0, cssr_1.c)('span', `
 width: 100%;
 display: inline-block;
 `)]), (0, cssr_1.cM)('textarea', [(0, cssr_1.cE)('placeholder', 'overflow: visible;')]), (0, cssr_1.cNotM)('autosize', 'width: 100%;'), (0, cssr_1.cM)('autosize', [(0, cssr_1.cE)('textarea-el, input-el', `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
// input
(0, cssr_1.cB)('input-wrapper', `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `), (0, cssr_1.cE)('input-mirror', `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `), (0, cssr_1.cE)('input-el', `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [(0, cssr_1.c)('&[type=password]::-ms-reveal', 'display: none;'), (0, cssr_1.c)('+', [(0, cssr_1.cE)('placeholder', `
 display: flex;
 align-items: center; 
 `)])]), (0, cssr_1.cNotM)('textarea', [(0, cssr_1.cE)('placeholder', 'white-space: nowrap;')]), (0, cssr_1.cE)('eye', `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
// textarea
(0, cssr_1.cM)('textarea', 'width: 100%;', [(0, cssr_1.cB)('input-word-count', `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), (0, cssr_1.cM)('resizable', [(0, cssr_1.cB)('input-wrapper', `
 resize: vertical;
 min-height: var(--n-height);
 `)]), (0, cssr_1.cE)('textarea-el, textarea-mirror, placeholder', `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `), (0, cssr_1.cE)('textarea-mirror', `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
// pair
(0, cssr_1.cM)('pair', [(0, cssr_1.cE)('input-el, placeholder', 'text-align: center;'), (0, cssr_1.cE)('separator', `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [(0, cssr_1.cB)('icon', `
 color: var(--n-icon-color);
 `), (0, cssr_1.cB)('base-icon', `
 color: var(--n-icon-color);
 `)])]), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [(0, cssr_1.cE)('border', 'border: var(--n-border-disabled);'), (0, cssr_1.cE)('input-el, textarea-el', `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), (0, cssr_1.cE)('placeholder', 'color: var(--n-placeholder-color-disabled);'), (0, cssr_1.cE)('separator', 'color: var(--n-text-color-disabled);', [(0, cssr_1.cB)('icon', `
 color: var(--n-icon-color-disabled);
 `), (0, cssr_1.cB)('base-icon', `
 color: var(--n-icon-color-disabled);
 `)]), (0, cssr_1.cB)('input-word-count', `
 color: var(--n-count-text-color-disabled);
 `), (0, cssr_1.cE)('suffix, prefix', 'color: var(--n-text-color-disabled);', [(0, cssr_1.cB)('icon', `
 color: var(--n-icon-color-disabled);
 `), (0, cssr_1.cB)('internal-icon', `
 color: var(--n-icon-color-disabled);
 `)])]), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cE)('eye', `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [(0, cssr_1.c)('&:hover', `
 color: var(--n-icon-color-hover);
 `), (0, cssr_1.c)('&:active', `
 color: var(--n-icon-color-pressed);
 `)]), (0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('state-border', 'border: var(--n-border-hover);')]), (0, cssr_1.cM)('focus', 'background-color: var(--n-color-focus);', [(0, cssr_1.cE)('state-border', `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), (0, cssr_1.cE)('border, state-border', `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('state-border', `
 border-color: #0000;
 z-index: 1;
 `), (0, cssr_1.cE)('prefix', 'margin-right: 4px;'), (0, cssr_1.cE)('suffix', `
 margin-left: 4px;
 `), (0, cssr_1.cE)('suffix, prefix', `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [(0, cssr_1.cB)('base-loading', `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), (0, cssr_1.cB)('base-clear', `
 font-size: var(--n-icon-size);
 `, [(0, cssr_1.cE)('placeholder', [(0, cssr_1.cB)('base-icon', `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), (0, cssr_1.c)('>', [(0, cssr_1.cB)('icon', `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), (0, cssr_1.cB)('base-icon', `
 font-size: var(--n-icon-size);
 `)]), (0, cssr_1.cB)('input-word-count', `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `), ['warning', 'error'].map(status => (0, cssr_1.cM)(`${status}-status`, [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.cB)('base-loading', `
 color: var(--n-loading-color-${status})
 `), (0, cssr_1.cE)('input-el, textarea-el', `
 caret-color: var(--n-caret-color-${status});
 `), (0, cssr_1.cE)('state-border', `
 border: var(--n-border-${status});
 `), (0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('state-border', `
 border: var(--n-border-hover-${status});
 `)]), (0, cssr_1.c)('&:focus', `
 background-color: var(--n-color-focus-${status});
 `, [(0, cssr_1.cE)('state-border', `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)]), (0, cssr_1.cM)('focus', `
 background-color: var(--n-color-focus-${status});
 `, [(0, cssr_1.cE)('state-border', `
 box-shadow: var(--n-box-shadow-focus-${status});
 border: var(--n-border-focus-${status});
 `)])])]))]);
exports.safariStyle = (0, cssr_1.cB)('input', [(0, cssr_1.cM)('disabled', [(0, cssr_1.cE)('input-el, textarea-el', `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);