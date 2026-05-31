"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('tree', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 text-align: right;
 `, [(0, cssr_1.cB)('tree-node-switcher', `
 transform: rotate(180deg);
 `, [(0, cssr_1.cM)('expanded', `
 transform: rotate(90deg);
 `)]), (0, cssr_1.cB)('tree-node-checkbox', `
 margin-right: 0;
 margin-left: 4px;
 `), (0, cssr_1.cB)('tree-node-content', [(0, cssr_1.cE)('prefix', `
 margin-right: 0;
 margin-left: 8px;
 `)]), (0, cssr_1.cB)('tree-node-checkbox', [(0, cssr_1.cM)('right', `
 margin-right: 4px;
 `)])])]);