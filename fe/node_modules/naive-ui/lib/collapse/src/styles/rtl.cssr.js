"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('collapse', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('collapse-item', [(0, cssr_1.cB)('collapse-item', {
  marginRight: '32px',
  marginLeft: 0
}), (0, cssr_1.cM)('left-arrow-placement', [(0, cssr_1.cE)('header', [(0, cssr_1.cB)('collapse-item-arrow', {
  marginRight: 0,
  marginLeft: '4px'
})])]), (0, cssr_1.cM)('right-arrow-placement', [(0, cssr_1.cE)('header', [(0, cssr_1.cB)('collapse-item-arrow', {
  marginLeft: 0,
  marginRight: '4px'
})])]), (0, cssr_1.cM)('active', [(0, cssr_1.cE)('header', [(0, cssr_1.cM)('active', [(0, cssr_1.cB)('collapse-item-arrow', {
  transform: 'rotate(-90deg)'
})])])])])])]);