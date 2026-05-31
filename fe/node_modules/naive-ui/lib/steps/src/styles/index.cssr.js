"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-description-text-color
// --n-header-text-color
// --n-indicator-border-color
// --n-indicator-color
// --n-indicator-icon-size
// --n-indicator-index-font-size
// --n-indicator-size
// --n-indicator-text-color
// --n-splitor-color
// --n-step-header-font-size
// --n-step-header-font-weight
exports.default = (0, cssr_1.cB)('steps', `
 width: 100%;
 display: flex;
`, [(0, cssr_1.cB)('step', `
 position: relative;
 display: flex;
 flex: 1;
 `, [(0, cssr_1.cM)('disabled', 'cursor: not-allowed'), (0, cssr_1.cM)('clickable', `
 cursor: pointer;
 `), (0, cssr_1.c)('&:last-child', [(0, cssr_1.cB)('step-splitor', 'display: none;')])]), (0, cssr_1.cB)('step-splitor', `
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('step-content', 'flex: 1;', [(0, cssr_1.cB)('step-content-header', `
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('title', `
 white-space: nowrap;
 flex: 0;
 `)]), (0, cssr_1.cE)('description', `
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), (0, cssr_1.cB)('step-indicator', `
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `, [(0, cssr_1.cB)('step-indicator-slot', `
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `, [(0, cssr_1.cE)('index', `
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 white-space: nowrap;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()]), (0, cssr_1.cB)('icon', `
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()]), (0, cssr_1.cB)('base-icon', `
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()])])]), (0, cssr_1.cM)('vertical', 'flex-direction: column;', [(0, cssr_1.cNotM)('show-description', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('step', 'padding-bottom: 8px;')])]), (0, cssr_1.c)('>', [(0, cssr_1.cB)('step', 'margin-bottom: 16px;', [(0, cssr_1.c)('&:last-child', 'margin-bottom: 0;'), (0, cssr_1.c)('>', [(0, cssr_1.cB)('step-indicator', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('step-splitor', `
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]), (0, cssr_1.cB)('step-content', [(0, cssr_1.cE)('description', 'margin-top: 8px;')])])])])]), (0, cssr_1.cM)('content-bottom', [(0, cssr_1.cNotM)('vertical', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('step', 'flex-direction: column', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('step-line', 'display: flex;', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('step-splitor', `
 margin-top: 0;
 align-self: center;
 `)])])]), (0, cssr_1.c)('>', [(0, cssr_1.cB)('step-content', 'margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);', [(0, cssr_1.cB)('step-content-header', `
 margin-left: 0;
 `), (0, cssr_1.cB)('step-content__description', `
 margin-left: 0;
 `)])])])])])])]);