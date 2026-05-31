"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-label-line-height
// --n-bezier
// --n-size
// --n-border
// --n-border-focus
// --n-border-checked
// --n-border-disabled
// --n-border-disabled-checked
// --n-box-shadow-focus
// --n-color
// --n-color-checked
// --n-color-table
// --n-color-table-modal
// --n-color-disabled
// --n-color-disabled-checked
// --n-text-color
// --n-text-color-disabled
// --n-check-mark-color
// --n-check-mark-color-disabled
// --n-check-mark-color-disabled-checked
// --n-border-radius
// --n-font-size
// --n-label-padding
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('checkbox', `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [(0, cssr_1.cM)('show-label', 'line-height: var(--n-label-line-height);'), (0, cssr_1.c)('&:hover', [(0, cssr_1.cB)('checkbox-box', [(0, cssr_1.cE)('border', 'border: var(--n-border-checked);')])]), (0, cssr_1.c)('&:focus:not(:active)', [(0, cssr_1.cB)('checkbox-box', [(0, cssr_1.cE)('border', `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), (0, cssr_1.cM)('inside-table', [(0, cssr_1.cB)('checkbox-box', `
 background-color: var(--n-merged-color-table);
 `)]), (0, cssr_1.cM)('checked', [(0, cssr_1.cB)('checkbox-box', `
 background-color: var(--n-color-checked);
 `, [(0, cssr_1.cB)('checkbox-icon', [
// if not set width to 100%, safari & old chrome won't display the icon
(0, cssr_1.c)('.check-icon', `
 opacity: 1;
 transform: scale(1);
 `)])])]), (0, cssr_1.cM)('indeterminate', [(0, cssr_1.cB)('checkbox-box', [(0, cssr_1.cB)('checkbox-icon', [(0, cssr_1.c)('.check-icon', `
 opacity: 0;
 transform: scale(.5);
 `), (0, cssr_1.c)('.line-icon', `
 opacity: 1;
 transform: scale(1);
 `)])])]), (0, cssr_1.cM)('checked, indeterminate', [(0, cssr_1.c)('&:focus:not(:active)', [(0, cssr_1.cB)('checkbox-box', [(0, cssr_1.cE)('border', `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), (0, cssr_1.cB)('checkbox-box', `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [(0, cssr_1.cE)('border', {
  border: 'var(--n-border-checked)'
})])]), (0, cssr_1.cM)('disabled', {
  cursor: 'not-allowed'
}, [(0, cssr_1.cM)('checked', [(0, cssr_1.cB)('checkbox-box', `
 background-color: var(--n-color-disabled-checked);
 `, [(0, cssr_1.cE)('border', {
  border: 'var(--n-border-disabled-checked)'
}), (0, cssr_1.cB)('checkbox-icon', [(0, cssr_1.c)('.check-icon, .line-icon', {
  fill: 'var(--n-check-mark-color-disabled-checked)'
})])])]), (0, cssr_1.cB)('checkbox-box', `
 background-color: var(--n-color-disabled);
 `, [(0, cssr_1.cE)('border', `
 border: var(--n-border-disabled);
 `), (0, cssr_1.cB)('checkbox-icon', [(0, cssr_1.c)('.check-icon, .line-icon', `
 fill: var(--n-check-mark-color-disabled);
 `)])]), (0, cssr_1.cE)('label', `
 color: var(--n-text-color-disabled);
 `)]), (0, cssr_1.cB)('checkbox-box-wrapper', `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), (0, cssr_1.cB)('checkbox-box', `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [(0, cssr_1.cE)('border', `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), (0, cssr_1.cB)('checkbox-icon', `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [(0, cssr_1.c)('.check-icon, .line-icon', `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), (0, icon_switch_cssr_1.iconSwitchTransition)({
  left: '1px',
  top: '1px'
})])]), (0, cssr_1.cE)('label', `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [(0, cssr_1.c)('&:empty', {
  display: 'none'
})])]),
// modal table header checkbox
(0, cssr_1.insideModal)((0, cssr_1.cB)('checkbox', `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
// popover table header checkbox
(0, cssr_1.insidePopover)((0, cssr_1.cB)('checkbox', `
 --n-merged-color-table: var(--n-color-table-popover);
 `))]);