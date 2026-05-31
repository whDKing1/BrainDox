"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const icon_switch_cssr_1 = require("../../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../../_utils/cssr");
// vars:
// --n-bezier
// --n-clear-color
// --n-clear-size
// --n-clear-color-hover
// --n-clear-color-pressed
exports.default = (0, cssr_1.cB)('base-clear', `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [(0, cssr_1.c)('>', [(0, cssr_1.cE)('clear', `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [(0, cssr_1.c)('&:hover', `
 color: var(--n-clear-color-hover)!important;
 `), (0, cssr_1.c)('&:active', `
 color: var(--n-clear-color-pressed)!important;
 `)]), (0, cssr_1.cE)('placeholder', `
 display: flex;
 `), (0, cssr_1.cE)('clear, placeholder', `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)({
  originalTransform: 'translateX(-50%) translateY(-50%)',
  left: '50%',
  top: '50%'
})])])]);