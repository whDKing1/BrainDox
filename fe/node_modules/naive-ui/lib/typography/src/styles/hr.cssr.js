"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-color
exports.default = (0, cssr_1.cB)('hr', `
 margin: 12px 0;
 transition: border-color .3s var(--n-bezier);
 border-left: none;
 border-right: none;
 border-bottom: none;
 border-top: 1px solid var(--n-color);
`);