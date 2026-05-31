"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-box-shadow
// --n-box-shadow-hover
// --n-box-shadow-pressed
// --n-color
// --n-text-color
// --n-color-hover
// --n-color-pressed
// --n-border-radius-square
exports.default = (0, cssr_1.cB)('float-button', `
 user-select: none;
 cursor: pointer;
 color: var(--n-text-color);
 background-color: var(--n-color);
 font-size: 18px;
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-shadow: var(--n-box-shadow);
 display: flex;
 align-items: stretch;
 box-sizing: border-box;
`, [(0, cssr_1.cM)('circle-shape', `
 border-radius: 4096px;
 `), (0, cssr_1.cM)('square-shape', `
 border-radius: var(--n-border-radius-square);
 `), (0, cssr_1.cE)('fill', `
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0
 left: 0;
 transition: background-color .3s var(--n-bezier);
 border-radius: inherit;
 `), (0, cssr_1.cE)('body', `
 position: relative;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
 border-radius: inherit;
 flex-direction: column;
 box-sizing: border-box;
 padding: 2px 4px;
 gap: 2px;
 transform: scale(1);
 `, [(0, cssr_1.cE)('description', `
 font-size: 12px;
 text-align: center;
 line-height: 14px;
 `)]), (0, cssr_1.c)('&:hover', 'box-shadow: var(--n-box-shadow-hover);', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('fill', `
 background-color: var(--n-color-hover);
 `)])]), (0, cssr_1.c)('&:active', 'box-shadow: var(--n-box-shadow-pressed);', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('fill', `
 background-color: var(--n-color-pressed);
 `)])]), (0, cssr_1.cM)('show-menu', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('menu', `
 pointer-events: all;
 bottom: 100%;
 opacity: 1;
 `), (0, cssr_1.cE)('close', `
 transform: scale(1);
 opacity: 1;
 `), (0, cssr_1.cE)('body', `
 transform: scale(0.75);
 opacity: 0;
 `)])]), (0, cssr_1.cE)('close', `
 opacity: 0;
 transform: scale(0.75);
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
 `), (0, cssr_1.cE)('menu', `
 position: absolute;
 bottom: calc(100% - 8px);
 display: flex;
 flex-direction: column;
 opacity: 0;
 pointer-events: none;
 transition:
 opacity .3s var(--n-bezier),
 bottom .3s var(--n-bezier); 
 `, [(0, cssr_1.c)('> *', `
 margin-bottom: 16px;
 `), (0, cssr_1.cB)('float-button', `
 position: relative !important;
 `)])]);