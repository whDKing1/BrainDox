"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-text-color
// --n-font-weight
exports.default = (0, cssr_1.cB)('divider', `
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`, [(0, cssr_1.cNotM)('vertical', `
 margin-top: 24px;
 margin-bottom: 24px;
 `, [(0, cssr_1.cNotM)('no-title', `
 display: flex;
 align-items: center;
 `)]), (0, cssr_1.cE)('title', `
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `), (0, cssr_1.cM)('title-position-left', [(0, cssr_1.cE)('line', [(0, cssr_1.cM)('left', {
  width: '28px'
})])]), (0, cssr_1.cM)('title-position-right', [(0, cssr_1.cE)('line', [(0, cssr_1.cM)('right', {
  width: '28px'
})])]), (0, cssr_1.cM)('dashed', [(0, cssr_1.cE)('line', `
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]), (0, cssr_1.cM)('vertical', `
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `), (0, cssr_1.cE)('line', `
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `), (0, cssr_1.cNotM)('dashed', [(0, cssr_1.cE)('line', {
  backgroundColor: 'var(--n-color)'
})]), (0, cssr_1.cM)('dashed', [(0, cssr_1.cE)('line', {
  borderColor: 'var(--n-color)'
})]), (0, cssr_1.cM)('vertical', {
  backgroundColor: 'var(--n-color)'
})]);