"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_cssr_1 = require("../../../_styles/transitions/fade-in.cssr");
const slide_in_from_bottom_1 = require("../../../_styles/transitions/slide-in-from-bottom");
const slide_in_from_left_1 = require("../../../_styles/transitions/slide-in-from-left");
const slide_in_from_right_1 = require("../../../_styles/transitions/slide-in-from-right");
const slide_in_from_top_1 = require("../../../_styles/transitions/slide-in-from-top");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-line-height
// --n-color
// --n-border-radius
// --n-text-color
// --n-box-shadow
// --n-bezier
// --n-bezier-out
// --n-bezier-in
// --n-body-padding
// --n-header-padding
// --n-footer-padding
// --n-title-font-size
// --n-title-text-color
// --n-title-font-weight
// --n-header-border-bottom
// --n-footer-border-top
// --n-close-border-radius
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-close-size
// --n-close-icon-size
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('drawer', `
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `, [(0, slide_in_from_right_1.slideInFromRightTransition)(), (0, slide_in_from_left_1.slideInFromLeftTransition)(), (0, slide_in_from_top_1.slideInFromTopTransition)(), (0, slide_in_from_bottom_1.slideInFromBottomTransition)(), (0, cssr_1.cM)('unselectable', `
 user-select: none; 
 -webkit-user-select: none;
 `), (0, cssr_1.cM)('native-scrollbar', [(0, cssr_1.cB)('drawer-content-wrapper', `
 overflow: auto;
 height: 100%;
 `)]), (0, cssr_1.cE)('resize-trigger', `
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('hover', `
 background-color: var(--n-resize-trigger-color-hover);
 `)]), (0, cssr_1.cB)('drawer-content-wrapper', `
 box-sizing: border-box;
 `), (0, cssr_1.cB)('drawer-content', `
 height: 100%;
 display: flex;
 flex-direction: column;
 `, [(0, cssr_1.cM)('native-scrollbar', [(0, cssr_1.cB)('drawer-body-content-wrapper', `
 height: 100%;
 overflow: auto;
 `)]), (0, cssr_1.cB)('drawer-body', `
 flex: 1 0 0;
 overflow: hidden;
 `), (0, cssr_1.cB)('drawer-body-content-wrapper', `
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `), (0, cssr_1.cB)('drawer-header', `
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `, [(0, cssr_1.cE)('main', `
 flex: 1;
 `), (0, cssr_1.cE)('close', `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), (0, cssr_1.cB)('drawer-footer', `
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]), (0, cssr_1.cM)('right-placement', `
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('resize-trigger', `
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]), (0, cssr_1.cM)('left-placement', `
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('resize-trigger', `
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]), (0, cssr_1.cM)('top-placement', `
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('resize-trigger', `
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]), (0, cssr_1.cM)('bottom-placement', `
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('resize-trigger', `
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]), (0, cssr_1.c)('body', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('drawer-container', `
 position: fixed;
 `)])]), (0, cssr_1.cB)('drawer-container', `
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `, [(0, cssr_1.c)('> *', `
 pointer-events: all;
 `)]), (0, cssr_1.cB)('drawer-mask', `
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [(0, cssr_1.cM)('invisible', `
 background-color: rgba(0, 0, 0, 0)
 `), (0, fade_in_cssr_1.fadeInTransition)({
  enterDuration: '0.2s',
  leaveDuration: '0.2s',
  enterCubicBezier: 'var(--n-bezier-in)',
  leaveCubicBezier: 'var(--n-bezier-out)'
})])]);