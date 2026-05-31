"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-font-weight
// --n-text-color
// --n-border-radius
// --n-x-gap
// --n-y-gap
// --n-rect-size
// --n-rect-color (for individual rect background color)
// --n-bezier
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('heatmap', `
 display: flex;
 flex-direction: column;
 max-width: fit-content;
 font-size: var(--n-font-size);
 `, [(0, cssr_1.cE)('content', `
 display: block;
 `), (0, cssr_1.cE)('calendar-table', `
 border-collapse: separate;
 border-spacing: var(--n-y-gap) var(--n-x-gap);
 font-size: var(--n-font-size);
 `), (0, cssr_1.cE)('week-header-cell', `
 width: 27px;
 padding: 0;
 border: none;
 font-size: var(--n-font-size);
 `), (0, cssr_1.cE)('month-label-cell', `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 text-align: left;
 height: 15px;
 line-height: 15px;
 font-weight: var(--n-font-weight);
 padding: 0 2px 8px;
 vertical-align: bottom;
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('week-label-cell', `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 text-align: right;
 width: 27px;
 height: 11px;
 line-height: 11px;
 padding: 0 4px 0 0;
 border: none;
 vertical-align: middle;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('day-cell', `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 padding: 0;
 border: none;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('empty-cell', `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 `), (0, cssr_1.cE)('footer', `
 display: flex;
 justify-content: space-between;
 margin-left: 17px;
 align-items: center;
 margin-top: 8px;
 &:has(> :only-child) {
 justify-content: flex-end;
 }
 `), (0, cssr_1.cE)('indicator', `
 display: flex;
 align-items: center;
 justify-content: flex-end;
 `)]), (0, cssr_1.cB)('heatmap-rect', `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 background-color: var(--n-rect-color);
 transition: background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('loading', `
 cursor: default;
 background: var(--n-loading-color-start);
 `)]), (0, cssr_1.cB)('heatmap-color-indicator', `
 display: flex;
 align-items: center;
 justify-content: flex-end;
 gap: 4px;
 font-size: var(--n-font-size);
 `, [(0, cssr_1.cE)('cells', `
 display: flex;
 gap: var(--n-x-gap);
 `), (0, cssr_1.cE)('cell', `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('label', `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 `)])]);