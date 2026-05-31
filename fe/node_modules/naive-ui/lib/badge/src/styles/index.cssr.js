"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-color
// --n-ripple-color
// --n-bezier
// --n-ripple-bezier
// --n-font-size
// --n-font-family
exports.default = (0, cssr_1.c)([(0, cssr_1.c)('@keyframes badge-wave-spread', {
  from: {
    boxShadow: '0 0 0.5px 0px var(--n-ripple-color)',
    opacity: 0.6
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: '0 0 0.5px 4.5px var(--n-ripple-color)',
    opacity: 0
  }
}), (0, cssr_1.cB)('badge', `
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `, [(0, cssr_1.cM)('as-is', [(0, cssr_1.cB)('badge-sup', {
  position: 'static',
  transform: 'translateX(0)'
}, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)({
  transformOrigin: 'left bottom',
  originalTransform: 'translateX(0)'
})])]), (0, cssr_1.cM)('dot', [(0, cssr_1.cB)('badge-sup', `
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `, [(0, cssr_1.c)('::before', 'border-radius: 4px;')])]), (0, cssr_1.cB)('badge-sup', `
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 2;
 display: flex;
 align-items: center;
 `, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)({
  transformOrigin: 'left bottom',
  originalTransform: 'translateX(-50%)'
}), (0, cssr_1.cB)('base-wave', {
  zIndex: 1,
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationDelay: '1s',
  animationTimingFunction: 'var(--n-ripple-bezier)',
  animationName: 'badge-wave-spread'
}), (0, cssr_1.c)('&::before', `
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]);