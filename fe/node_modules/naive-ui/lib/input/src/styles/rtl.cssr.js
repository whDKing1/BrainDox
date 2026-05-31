"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('input', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cE)('prefix', {
  marginRight: 0,
  marginLeft: '4px'
}), (0, cssr_1.cE)('suffix', {
  marginRight: '4px',
  marginLeft: 0
}), (0, cssr_1.cM)('textarea', 'width: 100%;', [(0, cssr_1.cB)('input-word-count', `
 left: var(--n-padding-right);
 right: unset;
 `)]), (0, cssr_1.cB)('input-word-count', `
 margin-left: 0;
 margin-right: 4px;
 `)])]);