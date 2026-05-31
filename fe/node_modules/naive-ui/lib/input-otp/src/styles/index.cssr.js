"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// --n-input-width
// --n-gap
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('input-otp', `
 display: flex;
 align-items: center;
 gap: var(--n-gap);
 `, [(0, cssr_1.cM)('block', ``, [(0, cssr_1.cB)('input', ``, [(0, cssr_1.cNotM)('autosize', `
 text-align: center;
 min-width: 0;
 `), (0, cssr_1.cM)('autosize', `
 text-align: center;
 min-width: 0;
 `)])]), (0, cssr_1.cNotM)('block', ``, [(0, cssr_1.cB)('input', ``, [(0, cssr_1.cNotM)('autosize', `
 width: var(--n-input-width);
 text-align: center;
 `), (0, cssr_1.cM)('autosize', `
 width: var(--n-input-width);
 text-align: center;
 `)])])])]);