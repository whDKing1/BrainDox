"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_cssr_1 = require("../../../_styles/transitions/fade-in.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-opacity-spinning
// --n-size
// --n-color
// --n-text-color
// --n-font-size
exports.default = (0, cssr_1.c)([(0, cssr_1.c)('@keyframes spin-rotate', `
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `), (0, cssr_1.cB)('spin-container', `
 position: relative;
 `, [(0, cssr_1.cB)('spin-body', `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [(0, fade_in_cssr_1.fadeInTransition)()])]), (0, cssr_1.cB)('spin-body', `
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `), (0, cssr_1.cB)('spin', `
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `, [(0, cssr_1.cM)('rotate', `
 animation: spin-rotate 2s linear infinite;
 `)]), (0, cssr_1.cB)('spin-description', `
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `), (0, cssr_1.cB)('spin-content', `
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `, [(0, cssr_1.cM)('spinning', `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]);