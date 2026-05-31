"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('list', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 text-align: right;
 `, [(0, cssr_1.cB)('list-item', [(0, cssr_1.cE)('prefix', `
 margin-right: 0;
 margin-left: 20px;
 `), (0, cssr_1.cE)('suffix', `
 margin-right: 20px;
 margin-left: 0;
 `)])])]);