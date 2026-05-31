"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-th-padding
// --n-td-padding
// --n-font-size
// --n-bezier
// --n-th-font-weight
// --n-line-height
// --n-th-text-color
// --n-td-text-color
// --n-th-color
// --n-th-color-modal
// --n-th-color-popover
// --n-td-color
// --n-td-color-modal
// --n-td-color-popover
// --n-border-radius
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-title-text-color
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('descriptions', {
  fontSize: 'var(--n-font-size)'
}, [(0, cssr_1.cB)('descriptions-separator', `
 display: inline-block;
 margin: 0 8px 0 2px;
 `), (0, cssr_1.cB)('descriptions-table-wrapper', [(0, cssr_1.cB)('descriptions-table', [(0, cssr_1.cB)('descriptions-table-row', [(0, cssr_1.cB)('descriptions-table-header', {
  padding: 'var(--n-th-padding)'
}), (0, cssr_1.cB)('descriptions-table-content', {
  padding: 'var(--n-td-padding)'
})])])]), (0, cssr_1.cNotM)('bordered', [(0, cssr_1.cB)('descriptions-table-wrapper', [(0, cssr_1.cB)('descriptions-table', [(0, cssr_1.cB)('descriptions-table-row', [(0, cssr_1.c)('&:last-child', [(0, cssr_1.cB)('descriptions-table-content', {
  paddingBottom: 0
})])])])])]), (0, cssr_1.cM)('left-label-placement', [(0, cssr_1.cB)('descriptions-table-content', [(0, cssr_1.c)('> *', {
  verticalAlign: 'top'
})])]), (0, cssr_1.cM)('left-label-align', [(0, cssr_1.c)('th', {
  textAlign: 'left'
})]), (0, cssr_1.cM)('center-label-align', [(0, cssr_1.c)('th', {
  textAlign: 'center'
})]), (0, cssr_1.cM)('right-label-align', [(0, cssr_1.c)('th', {
  textAlign: 'right'
})]), (0, cssr_1.cM)('bordered', [(0, cssr_1.cB)('descriptions-table-wrapper', `
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.cB)('descriptions-table', [(0, cssr_1.cB)('descriptions-table-row', [(0, cssr_1.c)('&:not(:last-child)', [(0, cssr_1.cB)('descriptions-table-content', {
  borderBottom: '1px solid var(--n-merged-border-color)'
}), (0, cssr_1.cB)('descriptions-table-header', {
  borderBottom: '1px solid var(--n-merged-border-color)'
})]), (0, cssr_1.cB)('descriptions-table-header', `
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `, [(0, cssr_1.c)('&:not(:last-child)', {
  borderRight: '1px solid var(--n-merged-border-color)'
})]), (0, cssr_1.cB)('descriptions-table-content', [(0, cssr_1.c)('&:not(:last-child)', {
  borderRight: '1px solid var(--n-merged-border-color)'
})])])])])]), (0, cssr_1.cB)('descriptions-header', `
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `), (0, cssr_1.cB)('descriptions-table-wrapper', `
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cB)('descriptions-table', `
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `, [(0, cssr_1.cB)('descriptions-table-row', `
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cB)('descriptions-table-header', `
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('descriptions-table-content', `
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('content', `
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]), (0, cssr_1.cE)('label', `
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]), (0, cssr_1.cB)('descriptions-table-wrapper', `
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `), (0, cssr_1.insideModal)((0, cssr_1.cB)('descriptions-table-wrapper', `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)), (0, cssr_1.insidePopover)((0, cssr_1.cB)('descriptions-table-wrapper', `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]);