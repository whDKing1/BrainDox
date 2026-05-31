"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --action-margin
exports.default = (0, cssr_1.cB)('dynamic-input', {
  width: '100%'
}, [(0, cssr_1.cB)('dynamic-input-item', `
 margin-bottom: 10px;
 display: flex;
 flex-wrap: nowrap;
 `, [(0, cssr_1.cB)('dynamic-input-preset-input', {
  flex: 1,
  alignItems: 'center'
}), (0, cssr_1.cB)('dynamic-input-preset-pair', `
 flex: 1;
 display: flex;
 align-items: center;
 `, [(0, cssr_1.cB)('dynamic-input-pair-input', [(0, cssr_1.c)('&:first-child', {
  'margin-right': '12px'
})])]), (0, cssr_1.cE)('action', `
 align-self: flex-start;
 display: flex;
 justify-content: flex-end;
 flex-shrink: 0;
 flex-grow: 0;
 margin: var(--action-margin);
 `, [(0, cssr_1.cM)('icon', {
  cursor: 'pointer'
})]), (0, cssr_1.c)('&:last-child', {
  marginBottom: 0
})]), (0, cssr_1.cB)('form-item', `
 padding-top: 0 !important;
 margin-right: 0 !important;
 `, [(0, cssr_1.cB)('form-item-blank', {
  paddingTop: '0 !important'
})])]);