"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../../_utils/cssr");
// vars:
// --n-close-border-radius
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-close-icon-color-disabled
exports.default = (0, cssr_1.cB)('base-close', `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [(0, cssr_1.cM)('absolute', `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), (0, cssr_1.c)('&::before', `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', `
 color: var(--n-close-icon-color-hover);
 `), (0, cssr_1.c)('&:hover::before', `
 background-color: var(--n-close-color-hover);
 `), (0, cssr_1.c)('&:focus::before', `
 background-color: var(--n-close-color-hover);
 `), (0, cssr_1.c)('&:active', `
 color: var(--n-close-icon-color-pressed);
 `), (0, cssr_1.c)('&:active::before', `
 background-color: var(--n-close-color-pressed);
 `)]), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), (0, cssr_1.cM)('round', [(0, cssr_1.c)('&::before', `
 border-radius: 50%;
 `)])]);