"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
const iconSwitchTransitionNode = (0, icon_switch_cssr_1.iconSwitchTransition)();
// vars:
// --n-arrow-color
// --n-bezier
// --n-font-size
// --n-node-border-radius
// --n-node-color-active
// --n-node-color-hover
// --n-node-color-pressed
// --n-node-text-color
// --n-node-text-color-disabled
// --n-node-wrapper-padding
// --n-line-offset-top
// --n-line-offset-bottom
// --n-node-content-height
// --n-line-height
// --n-line-color
exports.default = (0, cssr_1.cB)('tree', `
 font-size: var(--n-font-size);
 outline: none;
`, [(0, cssr_1.c)('ul, li', `
 margin: 0;
 padding: 0;
 list-style: none;
 `), (0, cssr_1.c)('>', [(0, cssr_1.cB)('tree-node', [(0, cssr_1.c)('&:first-child', 'margin-top: 0;')])]), (0, cssr_1.cB)('tree-motion-wrapper', [(0, cssr_1.cM)('expand', [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  duration: '0.2s'
})]), (0, cssr_1.cM)('collapse', [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  duration: '0.2s',
  reverse: true
})])]), (0, cssr_1.cB)('tree-node-wrapper', `
 box-sizing: border-box;
 padding: var(--n-node-wrapper-padding);
 `), (0, cssr_1.cB)('tree-node', `
 position: relative;
 display: flex;
 border-radius: var(--n-node-border-radius);
 transition: background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('highlight', [(0, cssr_1.cB)('tree-node-content', [(0, cssr_1.cE)('text', 'border-bottom-color: var(--n-node-text-color-disabled);')])]), (0, cssr_1.cM)('disabled', [(0, cssr_1.cB)('tree-node-content', `
 color: var(--n-node-text-color-disabled);
 cursor: not-allowed;
 `)]), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cM)('clickable', [(0, cssr_1.cB)('tree-node-content', `
 cursor: pointer;
 `)])])]), (0, cssr_1.cM)('block-node', [(0, cssr_1.cB)('tree-node-content', `
 flex: 1;
 min-width: 0;
 `)]), (0, cssr_1.cNotM)('block-line', [(0, cssr_1.cB)('tree-node', [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.cB)('tree-node-content', [(0, cssr_1.c)('&:hover', 'background: var(--n-node-color-hover);')]), (0, cssr_1.cM)('selectable', [(0, cssr_1.cB)('tree-node-content', [(0, cssr_1.c)('&:active', 'background: var(--n-node-color-pressed);')])]), (0, cssr_1.cM)('pending', [(0, cssr_1.cB)('tree-node-content', `
 background: var(--n-node-color-hover);
 `)]), (0, cssr_1.cM)('selected', [(0, cssr_1.cB)('tree-node-content', 'background: var(--n-node-color-active);')])]), (0, cssr_1.cM)('selected', [(0, cssr_1.cB)('tree-node-content', 'background: var(--n-node-color-active);')])])]), (0, cssr_1.cM)('block-line', [(0, cssr_1.cB)('tree-node', [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', 'background: var(--n-node-color-hover);'), (0, cssr_1.cM)('pending', `
 background: var(--n-node-color-hover);
 `), (0, cssr_1.cM)('selectable', [(0, cssr_1.cNotM)('selected', [(0, cssr_1.c)('&:active', 'background: var(--n-node-color-pressed);')])]), (0, cssr_1.cM)('selected', 'background: var(--n-node-color-active);')]), (0, cssr_1.cM)('selected', 'background: var(--n-node-color-active);'), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 `)])]), (0, cssr_1.cM)('ellipsis', [(0, cssr_1.cB)('tree-node', [(0, cssr_1.cB)('tree-node-content', `
 overflow: hidden;
 `, [(0, cssr_1.cE)('text', `
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
 `)])])]), (0, cssr_1.cB)('tree-node-indent', `
 flex-grow: 0;
 flex-shrink: 0;
 `, [(0, cssr_1.cM)('show-line', 'position: relative', [(0, cssr_1.c)('&::before', `
 position: absolute;
 left: 50%;
 border-left: 1px solid var(--n-line-color);
 transition: border-color .3s var(--n-bezier);
 transform: translate(-50%);
 content: "";
 top: var(--n-line-offset-top);
 bottom: var(--n-line-offset-bottom);
 `), (0, cssr_1.cM)('last-child', [(0, cssr_1.c)('&::before', `
 bottom: 50%;
 `)]), (0, cssr_1.cM)('is-leaf', [(0, cssr_1.c)('&::after', `
 position: absolute;
 content: "";
 left: calc(50% + 0.5px);
 right: 0;
 bottom: 50%;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-line-color);
 `)])]), (0, cssr_1.cNotM)('show-line', 'height: 0;')]), (0, cssr_1.cB)('tree-node-switcher', `
 cursor: pointer;
 display: inline-flex;
 flex-shrink: 0;
 height: var(--n-node-content-height);
 align-items: center;
 justify-content: center;
 transition: transform .15s var(--n-bezier);
 vertical-align: bottom;
 `, [(0, cssr_1.cE)('icon', `
 position: relative;
 height: 14px;
 width: 14px;
 display: flex;
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 font-size: 14px;
 `, [(0, cssr_1.cB)('icon', [iconSwitchTransitionNode]), (0, cssr_1.cB)('base-loading', `
 color: var(--n-loading-color);
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [iconSwitchTransitionNode]), (0, cssr_1.cB)('base-icon', [iconSwitchTransitionNode])]), (0, cssr_1.cM)('hide', 'visibility: hidden;'), (0, cssr_1.cM)('expanded', 'transform: rotate(90deg);')]), (0, cssr_1.cB)('tree-node-checkbox', `
 display: inline-flex;
 height: var(--n-node-content-height);
 vertical-align: bottom;
 align-items: center;
 justify-content: center;
 `), (0, cssr_1.cB)('tree-node-content', `
 user-select: none;
 position: relative;
 display: inline-flex;
 align-items: center;
 min-height: var(--n-node-content-height);
 box-sizing: border-box;
 line-height: var(--n-line-height);
 vertical-align: bottom;
 padding: 0 6px 0 4px;
 cursor: default;
 border-radius: var(--n-node-border-radius);
 color: var(--n-node-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('&:last-child', 'margin-bottom: 0;'), (0, cssr_1.cE)('prefix', `
 display: inline-flex;
 margin-right: 8px;
 `), (0, cssr_1.cE)('text', `
 border-bottom: 1px solid #0000;
 transition: border-color .3s var(--n-bezier);
 flex-grow: 1;
 max-width: 100%;
 `), (0, cssr_1.cE)('suffix', `
 display: inline-flex;
 `)]), (0, cssr_1.cE)('empty', 'margin: auto;')]);