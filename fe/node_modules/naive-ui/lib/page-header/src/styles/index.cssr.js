"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-title-font-size
// --n-title-text-color
// --n-font-size
// --n-subtitle-text-color
// --n-back-color
// --n-back-color-hover
// --n-back-color-pressed
// --n-back-size
// --n-title-font-weight
// --n-bezier
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('page-header-header', `
 margin-bottom: 20px;
 `), (0, cssr_1.cB)('page-header', `
 display: flex;
 align-items: center;
 justify-content: space-between;
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [(0, cssr_1.cE)('main', `
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 `), (0, cssr_1.cE)('back', `
 display: flex;
 margin-right: 16px;
 font-size: var(--n-back-size);
 cursor: pointer;
 color: var(--n-back-color);
 transition: color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('&:hover', 'color: var(--n-back-color-hover);'), (0, cssr_1.c)('&:active', 'color: var(--n-back-color-pressed);')]), (0, cssr_1.cE)('avatar', `
 display: flex;
 margin-right: 12px
 `), (0, cssr_1.cE)('title', `
 margin-right: 16px;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `), (0, cssr_1.cE)('subtitle', `
 font-size: 14px;
 transition: color .3s var(--n-bezier);
 color: var(--n-subtitle-text-color);
 `)]), (0, cssr_1.cB)('page-header-content', `
 font-size: var(--n-font-size);
 `, [(0, cssr_1.c)('&:not(:first-child)', 'margin-top: 20px;')]), (0, cssr_1.cB)('page-header-footer', `
 font-size: var(--n-font-size);
 `, [(0, cssr_1.c)('&:not(:first-child)', 'margin-top: 20px;')])]);