"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-font-size
// --n-text-color
// --n-title-font-weight
// --n-title-text-color
exports.default = (0, cssr_1.cB)('thing', `
 display: flex;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 color: var(--n-text-color);
`, [(0, cssr_1.cB)('thing-avatar', `
 margin-right: 12px;
 margin-top: 2px;
 `), (0, cssr_1.cB)('thing-avatar-header-wrapper', `
 display: flex;
 flex-wrap: nowrap;
 `, [(0, cssr_1.cB)('thing-header-wrapper', `
 flex: 1;
 `)]), (0, cssr_1.cB)('thing-main', `
 flex-grow: 1;
 `, [(0, cssr_1.cB)('thing-header', `
 display: flex;
 margin-bottom: 4px;
 justify-content: space-between;
 align-items: center;
 `, [(0, cssr_1.cE)('title', `
 font-size: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-title-text-color);
 `)]), (0, cssr_1.cE)('description', [(0, cssr_1.c)('&:not(:last-child)', `
 margin-bottom: 4px;
 `)]), (0, cssr_1.cE)('content', [(0, cssr_1.c)('&:not(:first-child)', `
 margin-top: 12px;
 `)]), (0, cssr_1.cE)('footer', [(0, cssr_1.c)('&:not(:first-child)', `
 margin-top: 12px;
 `)]), (0, cssr_1.cE)('action', [(0, cssr_1.c)('&:not(:first-child)', `
 margin-top: 12px;
 `)])])]);