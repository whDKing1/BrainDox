"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_width_expand_cssr_1 = require("../../../../_styles/transitions/fade-in-width-expand.cssr");
const fade_up_width_expand_cssr_1 = require("../../../../_styles/transitions/fade-up-width-expand.cssr");
const cssr_1 = require("../../../../_utils/cssr");
// ease-out: cubic-bezier(0, 0, .2, 1)
exports.default = (0, cssr_1.c)([(0, cssr_1.c)('@keyframes n-base-slot-machine-fade-up-in', `
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `), (0, cssr_1.c)('@keyframes n-base-slot-machine-fade-down-in', `
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `), (0, cssr_1.c)('@keyframes n-base-slot-machine-fade-up-out', `
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `), (0, cssr_1.c)('@keyframes n-base-slot-machine-fade-down-out', `
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `), (0, cssr_1.cB)('base-slot-machine', `
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `, [(0, cssr_1.cB)('base-slot-machine-number', `
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `, [(0, fade_up_width_expand_cssr_1.fadeUpWidthExpandTransition)({
  duration: '.2s'
}),
// use 0s, not 0
(0, fade_in_width_expand_cssr_1.fadeInWidthExpandTransition)({
  duration: '.2s',
  delay: '0s'
}), (0, cssr_1.cB)('base-slot-machine-old-number', `
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `, [(0, cssr_1.cM)('top', {
  transform: 'translateY(-100%)'
}), (0, cssr_1.cM)('bottom', {
  transform: 'translateY(100%)'
}), (0, cssr_1.cM)('down-scroll', {
  animation: 'n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)',
  animationIterationCount: 1
}), (0, cssr_1.cM)('up-scroll', {
  animation: 'n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)',
  animationIterationCount: 1
})]), (0, cssr_1.cB)('base-slot-machine-current-number', `
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `, [(0, cssr_1.cM)('down-scroll', {
  animation: 'n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)',
  animationIterationCount: 1
}), (0, cssr_1.cM)('up-scroll', {
  animation: 'n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)',
  animationIterationCount: 1
}), (0, cssr_1.cE)('inner', `
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `, [(0, cssr_1.cM)('not-number', `
 right: unset;
 left: 0;
 `)])])])])]);