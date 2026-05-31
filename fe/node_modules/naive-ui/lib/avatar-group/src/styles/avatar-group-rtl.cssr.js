"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// --n-gap
exports.default = (0, cssr_1.cB)('avatar-group', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cNotM)('vertical', `
 flex-direction: row;
 `, [(0, cssr_1.cB)('avatar', [(0, cssr_1.c)('&:not(:first-child)', `
 margin-right: var(--n-gap);
 margin-left: 0;
 `)])])])]);