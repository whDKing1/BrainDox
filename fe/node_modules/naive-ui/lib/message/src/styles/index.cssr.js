"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-margin
// --n-bezier
// --n-padding
// --n-max-width
// --n-font-size
// --n-icon-margin
// --n-icon-size
// --n-text-color
// --n-color
// --n-box-shadow
// --n-icon-color-default
// --n-icon-color-info
// --n-icon-color-success
// --n-icon-color-warning
// --n-icon-color-error
// --n-icon-color-loading
// --n-close-size
// --n-close-icon-size
// --n-close-margin
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-border-radius
// --n-close-icon-color
// --n-close-icon-color-pressed
// --n-close-icon-color-hover
// --n-border-radius
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('message-wrapper', `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  overflow: 'visible',
  originalTransition: 'transform .3s var(--n-bezier)',
  enterToProps: {
    transform: 'scale(1)'
  },
  leaveToProps: {
    transform: 'scale(0.85)'
  }
})]), (0, cssr_1.cB)('message', `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 border: var(--n-border);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `, [(0, cssr_1.cE)('content', `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `), (0, cssr_1.cE)('icon', `
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `, [['default', 'info', 'success', 'warning', 'error', 'loading'].map(type => (0, cssr_1.cM)(`${type}-type`, [(0, cssr_1.c)('> *', `
 color: var(--n-icon-color-${type});
 transition: color .3s var(--n-bezier);
 `)])), (0, cssr_1.c)('> *', `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [(0, icon_switch_cssr_1.iconSwitchTransition)()])]), (0, cssr_1.cE)('close', `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [(0, cssr_1.c)('&:hover', `
 color: var(--n-close-icon-color-hover);
 `), (0, cssr_1.c)('&:active', `
 color: var(--n-close-icon-color-pressed);
 `)])]), (0, cssr_1.cB)('message-container', `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [(0, cssr_1.cM)('top', `
 top: 12px;
 left: 0;
 right: 0;
 `), (0, cssr_1.cM)('top-left', `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `), (0, cssr_1.cM)('top-right', `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `), (0, cssr_1.cM)('bottom', `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `), (0, cssr_1.cM)('bottom-left', `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `), (0, cssr_1.cM)('bottom-right', `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)])]);