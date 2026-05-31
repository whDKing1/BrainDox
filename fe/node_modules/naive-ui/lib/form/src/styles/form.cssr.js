"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('form', [(0, cssr_1.cM)('inline', `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [(0, cssr_1.cB)('form-item', {
  width: 'auto',
  marginRight: '18px'
}, [(0, cssr_1.c)('&:last-child', {
  marginRight: 0
})])])]);