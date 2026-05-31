"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-label-font-size
// --n-label-font-weight
// --n-label-text-color
// --n-value-font-weight
// --n-value-font-size
// --n-value-prefix-text-color
// --n-value-suffix-text-color
// --n-value-text-color
exports.default = (0, cssr_1.cB)('statistic', [(0, cssr_1.cE)('label', `
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `), (0, cssr_1.cB)('statistic-value', `
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `, [(0, cssr_1.cE)('prefix', `
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `, [(0, cssr_1.cB)('icon', {
  verticalAlign: '-0.125em'
})]), (0, cssr_1.cE)('content', `
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `), (0, cssr_1.cE)('suffix', `
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `, [(0, cssr_1.cB)('icon', {
  verticalAlign: '-0.125em'
})])])]);