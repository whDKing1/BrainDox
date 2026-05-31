"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_cssr_1 = require("../../../_styles/transitions/fade-in.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-height
// --n-color-loading
// --n-color-error
exports.default = (0, cssr_1.cB)('loading-bar-container', `
 z-index: 5999;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 2px;
`, [(0, fade_in_cssr_1.fadeInTransition)({
  enterDuration: '0.3s',
  leaveDuration: '0.8s'
}), (0, cssr_1.cB)('loading-bar', `
 width: 100%;
 transition:
 max-width 4s linear,
 background .2s linear;
 height: var(--n-height);
 `, [(0, cssr_1.cM)('starting', `
 background: var(--n-color-loading);
 `), (0, cssr_1.cM)('finishing', `
 background: var(--n-color-loading);
 transition:
 max-width .2s linear,
 background .2s linear;
 `), (0, cssr_1.cM)('error', `
 background: var(--n-color-error);
 transition:
 max-width .2s linear,
 background .2s linear;
 `)])]);