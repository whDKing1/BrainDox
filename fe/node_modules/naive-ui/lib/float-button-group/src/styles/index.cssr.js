"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const index_1 = require("../../../_utils/cssr/index");
// --n-border-radius-square
exports.default = (0, index_1.cB)('float-button-group', [(0, index_1.cB)('float-button', `
 position: relative;
 `), (0, index_1.cM)('square-shape', `
 background-color: var(--n-color);
 cursor: pointer;
 display: flex;
 width: fit-content;
 align-items: center;
 justify-content: center;
 border-radius: var(--n-border-radius-square);
 flex-direction: column;
 box-shadow: var(--n-box-shadow);
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [(0, index_1.cB)('float-button', `
 background-color: unset;
 border-radius: 0;
 box-shadow: none;
 box-sizing: content-box;
 `, [(0, index_1.c)('&:not(:last-child)', `
 border-bottom: 1px solid var(--n-button-border-color); 
 `), (0, index_1.c)('&:first-child', `
 border-top-left-radius: 4px;
 border-top-right-radius: 4px;
 `), (0, index_1.c)('&:last-child', `
 border-bottom-left-radius: 4px;
 border-bottom-right-radius: 4px;
 `), (0, index_1.cE)('fill', `
 top: 4px;
 right: 4px;
 bottom: 4px;
 left: 4px;
 border-radius: var(--n-border-radius-square); 
 `)])]), (0, index_1.cM)('circle-shape', [(0, index_1.c)('>:not(:last-child)', `
 margin-bottom: 16px;
 `)])]);