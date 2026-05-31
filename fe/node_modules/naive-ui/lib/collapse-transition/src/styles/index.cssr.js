"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('collapse-transition', {
  width: '100%'
}, [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)()]);