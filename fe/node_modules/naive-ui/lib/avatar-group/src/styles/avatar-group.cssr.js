"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const index_1 = require("../../../_utils/cssr/index");
// --n-gap
exports.default = (0, index_1.cB)('avatar-group', `
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`, [(0, index_1.cM)('expand-on-hover', [(0, index_1.cB)('avatar', [(0, index_1.c)('&:not(:first-child)', `
 transition: margin .3s var(--n-bezier);
 `)]), (0, index_1.c)('&:hover', [(0, index_1.cNotM)('vertical', [(0, index_1.cB)('avatar', [(0, index_1.c)('&:not(:first-child)', `
 margin-left: 0 !important;
 `)])]), (0, index_1.cM)('vertical', [(0, index_1.cB)('avatar', [(0, index_1.c)('&:not(:first-child)', `
 margin-top: 0 !important;
 `)])])])]), (0, index_1.cNotM)('vertical', `
 flex-direction: row;
 `, [(0, index_1.cB)('avatar', [(0, index_1.c)('&:not(:first-child)', `
 margin-left: var(--n-gap);
 `)])]), (0, index_1.cM)('vertical', `
 flex-direction: column;
 `, [(0, index_1.cB)('avatar', [(0, index_1.c)('&:not(:first-child)', `
 margin-top: var(--n-gap);
 `)])])]);