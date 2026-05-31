"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const cssr_1 = require("../../../_utils/cssr");
// --n-menu-box-shadow
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('select', `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), (0, cssr_1.cB)('select-menu', `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)({
  originalTransition: 'background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)'
})])]);