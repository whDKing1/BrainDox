"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-border-radius
// --n-height
// --n-width
// --n-box-shadow
// --n-box-shadow-hover
// --n-box-shadow-pressed
// --n-color
// --n-icon-size
// --n-icon-color
// --n-icon-color-hover
// --n-icon-color-pressed
// --n-text-color
exports.default = (0, cssr_1.cB)('back-top', `
 position: fixed;
 right: 40px;
 bottom: 40px;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 height: var(--n-height);
 min-width: var(--n-width);
 box-shadow: var(--n-box-shadow);
 background-color: var(--n-color);
`, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)(), (0, cssr_1.cM)('transition-disabled', {
  transition: 'none !important'
}), (0, cssr_1.cB)('base-icon', `
 font-size: var(--n-icon-size);
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.c)('svg', {
  pointerEvents: 'none'
}), (0, cssr_1.c)('&:hover', {
  boxShadow: 'var(--n-box-shadow-hover)'
}, [(0, cssr_1.cB)('base-icon', {
  color: 'var(--n-icon-color-hover)'
})]), (0, cssr_1.c)('&:active', {
  boxShadow: 'var(--n-box-shadow-pressed)'
}, [(0, cssr_1.cB)('base-icon', {
  color: 'var(--n-icon-color-pressed)'
})])]);