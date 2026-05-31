"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-icon-size
// --n-bezier
// --n-icon-color
exports.default = (0, cssr_1.cB)('popconfirm', [(0, cssr_1.cE)('body', `
 font-size: var(--n-font-size);
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 position: relative;
 `, [(0, cssr_1.cE)('icon', `
 display: flex;
 font-size: var(--n-icon-size);
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 margin: 0 8px 0 0;
 `)]), (0, cssr_1.cE)('action', `
 display: flex;
 justify-content: flex-end;
 `, [(0, cssr_1.c)('&:not(:first-child)', 'margin-top: 8px'), (0, cssr_1.cB)('button', [(0, cssr_1.c)('&:not(:last-child)', 'margin-right: 8px;')])])]);