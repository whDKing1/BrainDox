"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const icon_switch_cssr_1 = require("../../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../../_utils/cssr");
exports.default = (0, cssr_1.c)([(0, cssr_1.c)('@keyframes rotator', `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), (0, cssr_1.cB)('base-loading', `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [(0, cssr_1.cE)('transition-wrapper', `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()]), (0, cssr_1.cE)('placeholder', `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)({
  left: '50%',
  top: '50%',
  originalTransform: 'translateX(-50%) translateY(-50%)'
})]), (0, cssr_1.cE)('container', `
 animation: rotator 3s linear infinite both;
 `, [(0, cssr_1.cE)('icon', `
 height: 1em;
 width: 1em;
 `)])])]);