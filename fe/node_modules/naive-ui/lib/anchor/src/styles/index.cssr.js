"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-link-color
// --n-link-font-size
// --n-link-text-color
// --n-link-text-color-hover
// --n-link-text-color-active
// --n-link-text-color-pressed
// --n-bezier
// --n-rail-color
// --n-rail-color-active
// --n-rail-width
// --n-link-padding
// --n-link-border-radius
exports.default = (0, cssr_1.cB)('anchor', `
 position: relative;
`, [(0, cssr_1.cNotM)('block', `
 padding-left: var(--n-rail-width);
 `, [(0, cssr_1.cB)('anchor-link', [(0, cssr_1.c)('+, >', [(0, cssr_1.cB)('anchor-link', `
 margin-top: .5em;
 `)])]), (0, cssr_1.cB)('anchor-link-background', `
 max-width: 0;
 border-top-right-radius: 10.5px;
 border-bottom-right-radius: 10.5px;
 `), (0, cssr_1.cNotM)('show-rail', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('anchor-link', 'padding-left: 0;')])])]), (0, cssr_1.cM)('block', [(0, cssr_1.cB)('anchor-link', `
 margin-bottom: 4px;
 padding: 2px 8px;
 transition: background-color .3s var(--n-bezier);
 background-color: transparent;
 border-radius: var(--n-link-border-radius);
 `, [(0, cssr_1.cM)('active', `
 background-color: var(--n-link-color);
 `)])]), (0, cssr_1.cB)('anchor-link-background', `
 position: absolute;
 left: calc(var(--n-rail-width) / 2);
 width: 100%;
 background-color: var(--n-link-color);
 transition:
 top .15s var(--n-bezier),
 max-width .15s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('anchor-rail', `
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 width: var(--n-rail-width);
 border-radius: calc(var(--n-rail-width) / 2);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `, [(0, cssr_1.cE)('bar', `
 position: absolute;
 left: 0;
 width: var(--n-rail-width);
 height: 21px;
 background-color: #0000;
 transition: 
 top .15s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('active', {
  backgroundColor: 'var(--n-rail-color-active)'
})])]), (0, cssr_1.cB)('anchor-link', `
 padding: var(--n-link-padding);
 position: relative;
 line-height: 1.5;
 font-size: var(--n-link-font-size);
 min-height: 1.5em;
 display: flex;
 flex-direction: column;
 `, [(0, cssr_1.cM)('active', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('title', `
 color: var(--n-link-text-color-active);
 `)])]), (0, cssr_1.cE)('title', `
 outline: none;
 max-width: 100%;
 text-decoration: none;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 cursor: pointer;
 display: inline-block;
 padding-right: 16px;
 transition: color .3s var(--n-bezier);
 color: var(--n-link-text-color);
 `, [(0, cssr_1.c)('&:hover, &:focus', `
 color: var(--n-link-text-color-hover);
 `), (0, cssr_1.c)('&:active', `
 color: var(--n-link-text-color-pressed);
 `)])])]);