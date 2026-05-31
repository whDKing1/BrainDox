"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// --n-bezier
// --n-font-size
// --n-icon-size
// --n-line-height
// --n-text-color
// --n-title-font-size
// --n-title-font-weight
// --n-title-text-color
exports.default = (0, cssr_1.cB)('result', `
 color: var(--n-text-color);
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier);
`, [(0, cssr_1.cB)('result-icon', `
 display: flex;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('status-image', `
 font-size: var(--n-icon-size);
 width: 1em;
 height: 1em;
 `), (0, cssr_1.cB)('base-icon', `
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), (0, cssr_1.cB)('result-content', {
  marginTop: '24px'
}), (0, cssr_1.cB)('result-footer', `
 margin-top: 24px;
 text-align: center;
 `), (0, cssr_1.cB)('result-header', [(0, cssr_1.cE)('title', `
 margin-top: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 text-align: center;
 color: var(--n-title-text-color);
 font-size: var(--n-title-font-size);
 `), (0, cssr_1.cE)('description', `
 margin-top: 4px;
 text-align: center;
 font-size: var(--n-font-size);
 `)])]);