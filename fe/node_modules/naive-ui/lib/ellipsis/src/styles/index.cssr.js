"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('ellipsis', {
  overflow: 'hidden'
}, [(0, cssr_1.cNotM)('line-clamp', `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), (0, cssr_1.cM)('line-clamp', `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), (0, cssr_1.cM)('cursor-pointer', `
 cursor: pointer;
 `)]);