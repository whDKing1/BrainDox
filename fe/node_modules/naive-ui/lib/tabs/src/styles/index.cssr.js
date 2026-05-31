"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-close-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-size
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-bar-color
// --n-tab-font-size
// --n-tab-text-color
// --n-tab-text-color-active
// --n-tab-text-color-disabled
// --n-tab-text-color-hover
// --n-pane-text-color
// --n-tab-border-color
// --n-tab-border-radius
// --n-tab-color
// --n-tab-font-weight
// --n-tab-font-weight-active
// --n-tab-gap
// --n-tab-gap-vertical
// --n-tab-padding
// --n-pane-padding-left
// --n-pane-padding-right
// --n-pane-padding-top
// --n-pane-padding-bottom
// --n-color-segment
// --n-font-weight-strong
// --n-tab-color-segment
exports.default = (0, cssr_1.cB)('tabs', `
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`, [(0, cssr_1.cM)('segment-type', [(0, cssr_1.cB)('tabs-rail', [(0, cssr_1.c)('&.transition-disabled', [(0, cssr_1.cB)('tabs-capsule', `
 transition: none;
 `)])])]), (0, cssr_1.cM)('top', [(0, cssr_1.cB)('tab-pane', `
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]), (0, cssr_1.cM)('left', [(0, cssr_1.cB)('tab-pane', `
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]), (0, cssr_1.cM)('left, right', `
 flex-direction: row;
 `, [(0, cssr_1.cB)('tabs-bar', `
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-tab', `
 padding: var(--n-tab-padding-vertical); 
 `)]), (0, cssr_1.cM)('right', `
 flex-direction: row-reverse;
 `, [(0, cssr_1.cB)('tab-pane', `
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `), (0, cssr_1.cB)('tabs-bar', `
 left: 0;
 `)]), (0, cssr_1.cM)('bottom', `
 flex-direction: column-reverse;
 justify-content: flex-end;
 `, [(0, cssr_1.cB)('tab-pane', `
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `), (0, cssr_1.cB)('tabs-bar', `
 top: 0;
 `)]), (0, cssr_1.cB)('tabs-rail', `
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [(0, cssr_1.cB)('tabs-capsule', `
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-tab-wrapper', `
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [(0, cssr_1.cB)('tabs-tab', `
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [(0, cssr_1.cM)('active', `
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `), (0, cssr_1.c)('&:hover', `
 color: var(--n-tab-text-color-hover);
 `)])])]), (0, cssr_1.cM)('flex', [(0, cssr_1.cB)('tabs-nav', `
 width: 100%;
 position: relative;
 `, [(0, cssr_1.cB)('tabs-wrapper', `
 width: 100%;
 `, [(0, cssr_1.cB)('tabs-tab', `
 margin-right: 0;
 `)])])]), (0, cssr_1.cB)('tabs-nav', `
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('prefix, suffix', `
 display: flex;
 align-items: center;
 `), (0, cssr_1.cE)('prefix', 'padding-right: 16px;'), (0, cssr_1.cE)('suffix', 'padding-left: 16px;')]), (0, cssr_1.cM)('top, bottom', [(0, cssr_1.c)('>', [(0, cssr_1.cB)('tabs-nav', [(0, cssr_1.cB)('tabs-nav-scroll-wrapper', [(0, cssr_1.c)('&::before', `
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `), (0, cssr_1.c)('&::after', `
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `), (0, cssr_1.cM)('shadow-start', [(0, cssr_1.c)('&::before', `
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]), (0, cssr_1.cM)('shadow-end', [(0, cssr_1.c)('&::after', `
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), (0, cssr_1.cM)('left, right', [(0, cssr_1.cB)('tabs-nav-scroll-content', `
 flex-direction: column;
 `), (0, cssr_1.c)('>', [(0, cssr_1.cB)('tabs-nav', [(0, cssr_1.cB)('tabs-nav-scroll-wrapper', [(0, cssr_1.c)('&::before', `
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), (0, cssr_1.c)('&::after', `
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), (0, cssr_1.cM)('shadow-start', [(0, cssr_1.c)('&::before', `
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]), (0, cssr_1.cM)('shadow-end', [(0, cssr_1.c)('&::after', `
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), (0, cssr_1.cB)('tabs-nav-scroll-wrapper', `
 flex: 1;
 position: relative;
 overflow: hidden;
 `, [(0, cssr_1.cB)('tabs-nav-y-scroll', `
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `, [(0, cssr_1.c)('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
 width: 0;
 height: 0;
 display: none;
 `)]), (0, cssr_1.c)('&::before, &::after', `
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `), (0, cssr_1.cB)('tabs-wrapper', `
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `), (0, cssr_1.cB)('tabs-tab-wrapper', `
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `), (0, cssr_1.cB)('tabs-tab', `
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cM)('disabled', {
  cursor: 'not-allowed'
}), (0, cssr_1.cE)('close', `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('label', `
 display: flex;
 align-items: center;
 z-index: 1;
 `)]), (0, cssr_1.cB)('tabs-bar', `
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('&.transition-disabled', `
 transition: none;
 `), (0, cssr_1.cM)('disabled', `
 background-color: var(--n-tab-text-color-disabled)
 `)]), (0, cssr_1.cB)('tabs-pane-wrapper', `
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `), (0, cssr_1.cB)('tab-pane', `
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `, [(0, cssr_1.c)('&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active', `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `), (0, cssr_1.c)('&.next-transition-leave-active, &.prev-transition-leave-active', `
 position: absolute;
 `), (0, cssr_1.c)('&.next-transition-enter-from, &.prev-transition-leave-to', `
 transform: translateX(32px);
 opacity: 0;
 `), (0, cssr_1.c)('&.next-transition-leave-to, &.prev-transition-enter-from', `
 transform: translateX(-32px);
 opacity: 0;
 `), (0, cssr_1.c)('&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to', `
 transform: translateX(0);
 opacity: 1;
 `)]), (0, cssr_1.cB)('tabs-tab-pad', `
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `), (0, cssr_1.cM)('line-type, bar-type', [(0, cssr_1.cB)('tabs-tab', `
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `, [(0, cssr_1.c)('&:hover', {
  color: 'var(--n-tab-text-color-hover)'
}), (0, cssr_1.cM)('active', `
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `), (0, cssr_1.cM)('disabled', {
  color: 'var(--n-tab-text-color-disabled)'
})])]), (0, cssr_1.cB)('tabs-nav', [(0, cssr_1.cM)('line-type', [(0, cssr_1.cM)('top', [(0, cssr_1.cE)('prefix, suffix', `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-bar', `
 bottom: -1px;
 `)]), (0, cssr_1.cM)('left', [(0, cssr_1.cE)('prefix, suffix', `
 border-right: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 border-right: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-bar', `
 right: -1px;
 `)]), (0, cssr_1.cM)('right', [(0, cssr_1.cE)('prefix, suffix', `
 border-left: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 border-left: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-bar', `
 left: -1px;
 `)]), (0, cssr_1.cM)('bottom', [(0, cssr_1.cE)('prefix, suffix', `
 border-top: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 border-top: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-bar', `
 top: -1px;
 `)]), (0, cssr_1.cE)('prefix, suffix', `
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-nav-scroll-content', `
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-bar', `
 border-radius: 0;
 `)]), (0, cssr_1.cM)('card-type', [(0, cssr_1.cE)('prefix, suffix', `
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-pad', `
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-tab-pad', `
 transition: border-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('tabs-tab', `
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `, [(0, cssr_1.cM)('addable', `
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `, [(0, cssr_1.cE)('height-placeholder', `
 width: 0;
 font-size: var(--n-tab-font-size);
 `), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', `
 color: var(--n-tab-text-color-hover);
 `)])]), (0, cssr_1.cM)('closable', 'padding-right: 8px;'), (0, cssr_1.cM)('active', `
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `), (0, cssr_1.cM)('disabled', 'color: var(--n-tab-text-color-disabled);')])]), (0, cssr_1.cM)('left, right', `
 flex-direction: column; 
 `, [(0, cssr_1.cE)('prefix, suffix', `
 padding: var(--n-tab-padding-vertical);
 `), (0, cssr_1.cB)('tabs-wrapper', `
 flex-direction: column;
 `), (0, cssr_1.cB)('tabs-tab-wrapper', `
 flex-direction: column;
 `, [(0, cssr_1.cB)('tabs-tab-pad', `
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]), (0, cssr_1.cM)('top', [(0, cssr_1.cM)('card-type', [(0, cssr_1.cB)('tabs-scroll-padding', 'border-bottom: 1px solid var(--n-tab-border-color);'), (0, cssr_1.cE)('prefix, suffix', `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-tab', `
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `, [(0, cssr_1.cM)('active', `
 border-bottom: 1px solid #0000;
 `)]), (0, cssr_1.cB)('tabs-tab-pad', `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-pad', `
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]), (0, cssr_1.cM)('left', [(0, cssr_1.cM)('card-type', [(0, cssr_1.cB)('tabs-scroll-padding', 'border-right: 1px solid var(--n-tab-border-color);'), (0, cssr_1.cE)('prefix, suffix', `
 border-right: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-tab', `
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `, [(0, cssr_1.cM)('active', `
 border-right: 1px solid #0000;
 `)]), (0, cssr_1.cB)('tabs-tab-pad', `
 border-right: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-pad', `
 border-right: 1px solid var(--n-tab-border-color);
 `)])]), (0, cssr_1.cM)('right', [(0, cssr_1.cM)('card-type', [(0, cssr_1.cB)('tabs-scroll-padding', 'border-left: 1px solid var(--n-tab-border-color);'), (0, cssr_1.cE)('prefix, suffix', `
 border-left: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-tab', `
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [(0, cssr_1.cM)('active', `
 border-left: 1px solid #0000;
 `)]), (0, cssr_1.cB)('tabs-tab-pad', `
 border-left: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-pad', `
 border-left: 1px solid var(--n-tab-border-color);
 `)])]), (0, cssr_1.cM)('bottom', [(0, cssr_1.cM)('card-type', [(0, cssr_1.cB)('tabs-scroll-padding', 'border-top: 1px solid var(--n-tab-border-color);'), (0, cssr_1.cE)('prefix, suffix', `
 border-top: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-tab', `
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [(0, cssr_1.cM)('active', `
 border-top: 1px solid #0000;
 `)]), (0, cssr_1.cB)('tabs-tab-pad', `
 border-top: 1px solid var(--n-tab-border-color);
 `), (0, cssr_1.cB)('tabs-pad', `
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]);