"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('notification', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('notification-main', `
 margin-left: unset;
 margin-right: 8px;
 `, [(0, cssr_1.cE)('header', `
 margin: var(--n-icon-margin);
 margin-right: 0;
 `)]), (0, cssr_1.cE)('avatar', `
 left: unset;
 right: var(--n-padding-left);
 `), (0, cssr_1.cM)('show-avatar', [(0, cssr_1.cB)('notification-main', `
 margin-right: 40px;
 margin-reft: unset;
 `)]), (0, cssr_1.cM)('closable', [(0, cssr_1.cB)('notification-main', [(0, cssr_1.c)('> *:first-child', `
 padding-left: 20px;
 padding-right: unset;
 `)]), (0, cssr_1.cE)('close', `
 right: unset;
 left: 0;
 `)])])]);