"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_cssr_1 = require("../../../../_styles/transitions/fade-in.cssr");
const cssr_1 = require("../../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('base-menu-mask', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 text-align: center;
 padding: 14px;
 overflow: hidden;
`, [(0, fade_in_cssr_1.fadeInTransition)()]);