"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
const fixedColumnStyle = createFixedColumnStyle();
// vars:
// --n-font-size
// --n-th-padding
// --n-td-padding
// --n-bezier
// --n-border-radius
// --n-line-height
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-th-color
// --n-th-color-hover
// --n-th-color-sorting
// --n-th-color-modal
// --n-th-color-hover-modal
// --n-th-color-sorting-modal
// --n-th-color-popover
// --n-th-color-hover-popover
// --n-th-color-sorting-popover
// --n-td-color
// --n-td-color-hover
// --n-td-color-sorting
// --n-td-color-modal
// --n-td-color-hover-modal
// --n-td-color-sorting-modal
// --n-td-color-popover
// --n-td-color-hover-popover
// --n-td-color-sorting-popover
// --n-th-text-color
// --n-td-text-color
// --n-th-font-weight
// --n-th-button-color-hover
// --n-th-icon-color
// --n-th-icon-color-active
// --n-filter-size
// --n-action-divider-color
// --n-action-padding
// --n-action-button-margin
// --n-pagination-margin
// --n-empty-padding
// --n-sorter-size
// --n-resizable-container-size
// --n-resizable-size
// --n-loading-size
// --n-loading-color
// --n-opacity-loading
// --n-box-shadow-before used in Body.tsx
// --n-box-shadow-after used in Body.tsx
// --indent-offset for ellipsis & expand trigger
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('data-table', `
 width: 100%;
 font-size: var(--n-font-size);
 display: flex;
 flex-direction: column;
 position: relative;
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 --n-merged-th-color-hover: var(--n-th-color-hover);
 --n-merged-th-color-sorting: var(--n-th-color-sorting);
 --n-merged-td-color-hover: var(--n-td-color-hover);
 --n-merged-td-color-sorting: var(--n-td-color-sorting);
 --n-merged-td-color-striped: var(--n-td-color-striped);
 `, [(0, cssr_1.cB)('data-table-wrapper', `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), (0, cssr_1.cM)('flex-height', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('data-table-wrapper', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('data-table-base-table', `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('data-table-base-table-body', 'flex-basis: 0;', [
// last-child means there is no empty icon
// body is a scrollbar, we need to override height 100%
(0, cssr_1.c)('&:last-child', 'flex-grow: 1;')])])])])])])]), (0, cssr_1.c)('>', [(0, cssr_1.cB)('data-table-loading-wrapper', `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)({
  originalTransform: 'translateX(-50%) translateY(-50%)'
})])]), (0, cssr_1.cB)('data-table-expand-placeholder', `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), (0, cssr_1.cB)('data-table-indent', `
 display: inline-block;
 height: 1px;
 `), (0, cssr_1.cB)('data-table-expand-trigger', `
 display: inline-flex;
 margin-right: 8px;
 cursor: pointer;
 font-size: 16px;
 vertical-align: -0.2em;
 position: relative;
 width: 16px;
 height: 16px;
 color: var(--n-td-text-color);
 transition: color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('expanded', [(0, cssr_1.cB)('icon', 'transform: rotate(90deg);', [(0, icon_switch_cssr_1.iconSwitchTransition)({
  originalTransform: 'rotate(90deg)'
})]), (0, cssr_1.cB)('base-icon', 'transform: rotate(90deg);', [(0, icon_switch_cssr_1.iconSwitchTransition)({
  originalTransform: 'rotate(90deg)'
})])]), (0, cssr_1.cB)('base-loading', `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()]), (0, cssr_1.cB)('icon', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()]), (0, cssr_1.cB)('base-icon', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()])]), (0, cssr_1.cB)('data-table-thead', `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), (0, cssr_1.cB)('data-table-tr', `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cB)('data-table-expand', `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), (0, cssr_1.cM)('striped', 'background-color: var(--n-merged-td-color-striped);', [(0, cssr_1.cB)('data-table-td', 'background-color: var(--n-merged-td-color-striped);')]), (0, cssr_1.cNotM)('summary', [(0, cssr_1.c)('&:hover', 'background-color: var(--n-merged-td-color-hover);', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('data-table-td', 'background-color: var(--n-merged-td-color-hover);')])])])]), (0, cssr_1.cB)('data-table-th', `
 padding: var(--n-th-padding);
 position: relative;
 text-align: start;
 box-sizing: border-box;
 background-color: var(--n-merged-th-color);
 border-color: var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 color: var(--n-th-text-color);
 transition:
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 font-weight: var(--n-th-font-weight);
 `, [(0, cssr_1.cM)('filterable', `
 padding-right: 36px;
 `, [(0, cssr_1.cM)('sortable', `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), fixedColumnStyle, (0, cssr_1.cM)('selection', `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), (0, cssr_1.cE)('title-wrapper', `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [(0, cssr_1.cE)('title', `
 flex: 1;
 min-width: 0;
 `)]), (0, cssr_1.cE)('ellipsis', `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), (0, cssr_1.cM)('hover', `
 background-color: var(--n-merged-th-color-hover);
 `), (0, cssr_1.cM)('sorting', `
 background-color: var(--n-merged-th-color-sorting);
 `), (0, cssr_1.cM)('sortable', `
 cursor: pointer;
 `, [(0, cssr_1.cE)('ellipsis', `
 max-width: calc(100% - 18px);
 `), (0, cssr_1.c)('&:hover', `
 background-color: var(--n-merged-th-color-hover);
 `)]), (0, cssr_1.cB)('data-table-sorter', `
 height: var(--n-sorter-size);
 width: var(--n-sorter-size);
 margin-left: 4px;
 position: relative;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 vertical-align: -0.2em;
 color: var(--n-th-icon-color);
 transition: color .3s var(--n-bezier);
 `, [(0, cssr_1.cB)('base-icon', 'transition: transform .3s var(--n-bezier)'), (0, cssr_1.cM)('desc', [(0, cssr_1.cB)('base-icon', `
 transform: rotate(0deg);
 `)]), (0, cssr_1.cM)('asc', [(0, cssr_1.cB)('base-icon', `
 transform: rotate(-180deg);
 `)]), (0, cssr_1.cM)('asc, desc', `
 color: var(--n-th-icon-color-active);
 `)]), (0, cssr_1.cB)('data-table-resize-button', `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [(0, cssr_1.c)('&::after', `
 width: var(--n-resizable-size);
 height: 50%;
 position: absolute;
 top: 50%;
 left: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 background-color: var(--n-merged-border-color);
 transform: translateY(-50%);
 transition: background-color .3s var(--n-bezier);
 z-index: 1;
 content: '';
 `), (0, cssr_1.cM)('active', [(0, cssr_1.c)('&::after', ` 
 background-color: var(--n-th-icon-color-active);
 `)]), (0, cssr_1.c)('&:hover::after', `
 background-color: var(--n-th-icon-color-active);
 `)]), (0, cssr_1.cB)('data-table-filter', `
 position: absolute;
 z-index: auto;
 right: 0;
 width: 36px;
 top: 0;
 bottom: 0;
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: var(--n-filter-size);
 color: var(--n-th-icon-color);
 `, [(0, cssr_1.c)('&:hover', `
 background-color: var(--n-th-button-color-hover);
 `), (0, cssr_1.cM)('show', `
 background-color: var(--n-th-button-color-hover);
 `), (0, cssr_1.cM)('active', `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), (0, cssr_1.cB)('data-table-td', `
 padding: var(--n-td-padding);
 text-align: start;
 box-sizing: border-box;
 border: none;
 background-color: var(--n-merged-td-color);
 color: var(--n-td-text-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('expand', [(0, cssr_1.cB)('data-table-expand-trigger', `
 margin-right: 0;
 `)]), (0, cssr_1.cM)('last-row', `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
// make sure there is no overlap between bottom border and
// fixed column box shadow
(0, cssr_1.c)('&::after', `
 bottom: 0 !important;
 `), (0, cssr_1.c)('&::before', `
 bottom: 0 !important;
 `)]), (0, cssr_1.cM)('summary', `
 background-color: var(--n-merged-th-color);
 `), (0, cssr_1.cM)('hover', `
 background-color: var(--n-merged-td-color-hover);
 `), (0, cssr_1.cM)('sorting', `
 background-color: var(--n-merged-td-color-sorting);
 `), (0, cssr_1.cE)('ellipsis', `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), (0, cssr_1.cM)('selection, expand', `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), fixedColumnStyle]), (0, cssr_1.cB)('data-table-empty', `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('hide', `
 opacity: 0;
 `)]), (0, cssr_1.cE)('pagination', `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), (0, cssr_1.cB)('data-table-wrapper', `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), (0, cssr_1.cM)('loading', [(0, cssr_1.cB)('data-table-wrapper', `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), (0, cssr_1.cM)('single-column', [(0, cssr_1.cB)('data-table-td', `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [(0, cssr_1.c)('&::after, &::before', `
 bottom: 0 !important;
 `)])]), (0, cssr_1.cNotM)('single-line', [(0, cssr_1.cB)('data-table-th', `
 border-right: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.cM)('last', `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), (0, cssr_1.cB)('data-table-td', `
 border-right: 1px solid var(--n-merged-border-color);
 `, [(0, cssr_1.cM)('last-col', `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), (0, cssr_1.cM)('bordered', [(0, cssr_1.cB)('data-table-wrapper', `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), (0, cssr_1.cB)('data-table-base-table', [(0, cssr_1.cM)('transition-disabled', [(0, cssr_1.cB)('data-table-th', [(0, cssr_1.c)('&::after, &::before', 'transition: none;')]), (0, cssr_1.cB)('data-table-td', [(0, cssr_1.c)('&::after, &::before', 'transition: none;')])])]), (0, cssr_1.cM)('bottom-bordered', [(0, cssr_1.cB)('data-table-td', [(0, cssr_1.cM)('last-row', `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), (0, cssr_1.cB)('data-table-table', `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), (0, cssr_1.cB)('data-table-base-table-header', `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [(0, cssr_1.c)('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
 display: none;
 width: 0;
 height: 0;
 `)]), (0, cssr_1.cB)('data-table-check-extra', `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), (0, cssr_1.cB)('data-table-filter-menu', [(0, cssr_1.cB)('scrollbar', `
 max-height: 240px;
 `), (0, cssr_1.cE)('group', `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [(0, cssr_1.cB)('checkbox', `
 margin-bottom: 12px;
 margin-right: 0;
 `), (0, cssr_1.cB)('radio', `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), (0, cssr_1.cE)('action', `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [(0, cssr_1.cB)('button', [(0, cssr_1.c)('&:not(:last-child)', `
 margin: var(--n-action-button-margin);
 `), (0, cssr_1.c)('&:last-child', `
 margin-right: 0;
 `)])]), (0, cssr_1.cB)('divider', `
 margin: 0 !important;
 `)]), (0, cssr_1.insideModal)((0, cssr_1.cB)('data-table', `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), (0, cssr_1.insidePopover)((0, cssr_1.cB)('data-table', `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function createFixedColumnStyle() {
  return [(0, cssr_1.cM)('fixed-left', `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [(0, cssr_1.c)('&::after', `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), (0, cssr_1.cM)('fixed-right', `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [(0, cssr_1.c)('&::before', `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 left: -36px;
 `)])];
}