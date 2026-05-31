"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_cssr_1 = require("../../../../_styles/transitions/fade-in.cssr");
const cssr_1 = require("../../../../_utils/cssr");
// vars:
// --n-scrollbar-bezier
// --n-scrollbar-color
// --n-scrollbar-color-hover
// --n-scrollbar-width
// --n-scrollbar-height
// --n-scrollbar-border-radius
// --n-scrollbar-rail-inset-horizontal
// --n-scrollbar-rail-inset-vertical
// --n-scrollbar-rail-color
exports.default = (0, cssr_1.cB)('scrollbar', `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('scrollbar-container', `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [(0, cssr_1.c)('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
 width: 0;
 height: 0;
 display: none;
 `), (0, cssr_1.c)('>', [
// We can't set overflow hidden since it affects positioning.
(0, cssr_1.cB)('scrollbar-content', `
 box-sizing: border-box;
 min-width: 100%;
 `)])])]), (0, cssr_1.c)('>, +', [(0, cssr_1.cB)('scrollbar-rail', `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [(0, cssr_1.cM)('horizontal', `
 height: var(--n-scrollbar-height);
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cE)('scrollbar', `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), (0, cssr_1.cM)('horizontal--top', `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), (0, cssr_1.cM)('horizontal--bottom', `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), (0, cssr_1.cM)('vertical', `
 width: var(--n-scrollbar-width);
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cE)('scrollbar', `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), (0, cssr_1.cM)('vertical--left', `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), (0, cssr_1.cM)('vertical--right', `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), (0, cssr_1.cM)('disabled', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('scrollbar', 'pointer-events: none;')])]), (0, cssr_1.c)('>', [(0, cssr_1.cE)('scrollbar', `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [(0, fade_in_cssr_1.fadeInTransition)(), (0, cssr_1.c)('&:hover', 'background-color: var(--n-scrollbar-color-hover);')])])])])]);