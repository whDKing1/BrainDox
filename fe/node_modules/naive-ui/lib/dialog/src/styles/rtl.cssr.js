"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('dialog', [(0, cssr_1.cM)('rtl', `
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-left) var(--n-icon-margin-bottom) var(--n-icon-margin-right);
 direction: rtl;
 `, [(0, cssr_1.cE)('close', `
 right: unset;
 left: 0;
 margin-left: 1.8rem;
 `), (0, cssr_1.cE)('action', `
 direction: rtl;
 display: flex;
 `, [(0, cssr_1.c)('> *:not(:first-child)', `
 margin-right: var(--n-action-space);
 `), (0, cssr_1.c)('> *', `
 margin-right: 0;
 `)]), (0, cssr_1.cM)('icon-left', [(0, cssr_1.cM)('closable', [(0, cssr_1.cE)('title', `
 padding-right: unset;
 `)])])])]);