"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('radio', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `)]), (0, cssr_1.cB)('radio-group', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('radio-button', [(0, cssr_1.c)('&:first-child', `
 border-radius: 0 var(--n-button-border-radius) var(--n-button-border-radius) 0;
 border-right: 1px solid var(--n-button-border-color);
 border-left: 0;
 `, [(0, cssr_1.cE)('state-border', `
 border-radius: 0 var(--n-button-border-radius) var(--n-button-border-radius) 0;
 `)]), (0, cssr_1.c)('&:last-child', `
 border-radius: var(--n-button-border-radius) 0 0 var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 border-right: 0;
 `, [(0, cssr_1.cE)('state-border', `
 border-radius: var(--n-button-border-radius) 0 0 var(--n-button-border-radius);
 `)]), (0, cssr_1.cM)('checked', `
 border-color: var(--n-button-border-color-active);
 `)])])])]);