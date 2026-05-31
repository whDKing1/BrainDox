"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-dot-color
// --n-dot-color-focus
// --n-dot-color-active
// --n-dot-size
// --n-dot-line-width
// --n-dot-line-width-active
// --n-arrow-color
exports.default = (0, cssr_1.cB)('carousel', `
 position: relative;
 width: 100%;
 height: 100%;
 touch-action: pan-y;
 overflow: hidden;
`, [(0, cssr_1.cE)('slides', `
 display: flex;
 width: 100%;
 height: 100%;
 transition-timing-function: var(--n-bezier);
 transition-property: transform;
 `, [(0, cssr_1.cE)('slide', `
 flex-shrink: 0;
 position: relative;
 width: 100%;
 height: 100%;
 outline: none;
 overflow: hidden;
 `, [(0, cssr_1.c)('> img', `
 display: block;
 `)])]), (0, cssr_1.cE)('dots', `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `, [(0, cssr_1.cM)('dot', [(0, cssr_1.cE)('dot', `
 height: var(--n-dot-size);
 width: var(--n-dot-size);
 background-color: var(--n-dot-color);
 border-radius: 50%;
 cursor: pointer;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [(0, cssr_1.c)('&:focus', `
 background-color: var(--n-dot-color-focus);
 `), (0, cssr_1.cM)('active', `
 background-color: var(--n-dot-color-active);
 `)])]), (0, cssr_1.cM)('line', [(0, cssr_1.cE)('dot', `
 border-radius: 9999px;
 width: var(--n-dot-line-width);
 height: 4px;
 background-color: var(--n-dot-color);
 cursor: pointer;
 transition:
 width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [(0, cssr_1.c)('&:focus', `
 background-color: var(--n-dot-color-focus);
 `), (0, cssr_1.cM)('active', `
 width: var(--n-dot-line-width-active);
 background-color: var(--n-dot-color-active);
 `)])])]), (0, cssr_1.cE)('arrow', `
 transition: background-color .3s var(--n-bezier);
 cursor: pointer;
 height: 28px;
 width: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: rgba(255, 255, 255, .2);
 color: var(--n-arrow-color);
 border-radius: 8px;
 user-select: none;
 -webkit-user-select: none;
 font-size: 18px;
 `, [(0, cssr_1.c)('svg', `
 height: 1em;
 width: 1em;
 `), (0, cssr_1.c)('&:hover', `
 background-color: rgba(255, 255, 255, .3);
 `)]), (0, cssr_1.cM)('vertical', `
 touch-action: pan-x;
 `, [(0, cssr_1.cE)('slides', `
 flex-direction: column;
 `), (0, cssr_1.cM)('fade', [(0, cssr_1.cE)('slide', `
 top: 50%;
 left: unset;
 transform: translateY(-50%);
 `)]), (0, cssr_1.cM)('card', [(0, cssr_1.cE)('slide', `
 top: 50%;
 left: unset;
 transform: translateY(-50%) translateZ(-400px);
 `, [(0, cssr_1.cM)('current', `
 transform: translateY(-50%) translateZ(0);
 `), (0, cssr_1.cM)('prev', `
 transform: translateY(-100%) translateZ(-200px);
 `), (0, cssr_1.cM)('next', `
 transform: translateY(0%) translateZ(-200px);
 `)])])]), (0, cssr_1.cM)('usercontrol', [(0, cssr_1.cE)('slides', [(0, cssr_1.c)('>', [(0, cssr_1.c)('div', `
 position: absolute;
 top: 50%;
 left: 50%;
 width: 100%;
 height: 100%;
 transform: translate(-50%, -50%);
 `)])])]), (0, cssr_1.cM)('left', [(0, cssr_1.cE)('dots', `
 transform: translateY(-50%);
 top: 50%;
 left: 12px;
 flex-direction: column;
 `, [(0, cssr_1.cM)('line', [(0, cssr_1.cE)('dot', `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [(0, cssr_1.cM)('active', `
 height: var(--n-dot-line-width-active);
 `)])])]), (0, cssr_1.cE)('dot', `
 margin: 4px 0;
 `)]), (0, cssr_1.cE)('arrow-group', `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `), (0, cssr_1.cM)('vertical', [(0, cssr_1.cE)('arrow', `
 transform: rotate(90deg);
 `)]), (0, cssr_1.cM)('show-arrow', [(0, cssr_1.cM)('bottom', [(0, cssr_1.cE)('dots', `
 transform: translateX(0);
 bottom: 18px;
 left: 18px;
 `)]), (0, cssr_1.cM)('top', [(0, cssr_1.cE)('dots', `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), (0, cssr_1.cM)('left', [(0, cssr_1.cE)('dots', `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), (0, cssr_1.cM)('right', [(0, cssr_1.cE)('dots', `
 transform: translateX(0);
 top: 18px;
 right: 18px;
 `)])]), (0, cssr_1.cM)('left', [(0, cssr_1.cE)('arrow-group', `
 bottom: 12px;
 left: 12px;
 flex-direction: column;
 `, [(0, cssr_1.c)('> *:first-child', `
 margin-bottom: 12px;
 `)])]), (0, cssr_1.cM)('right', [(0, cssr_1.cE)('dots', `
 transform: translateY(-50%);
 top: 50%;
 right: 12px;
 flex-direction: column;
 `, [(0, cssr_1.cM)('line', [(0, cssr_1.cE)('dot', `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [(0, cssr_1.cM)('active', `
 height: var(--n-dot-line-width-active);
 `)])])]), (0, cssr_1.cE)('dot', `
 margin: 4px 0;
 `), (0, cssr_1.cE)('arrow-group', `
 bottom: 12px;
 right: 12px;
 flex-direction: column;
 `, [(0, cssr_1.c)('> *:first-child', `
 margin-bottom: 12px;
 `)])]), (0, cssr_1.cM)('top', [(0, cssr_1.cE)('dots', `
 transform: translateX(-50%);
 top: 12px;
 left: 50%;
 `, [(0, cssr_1.cM)('line', [(0, cssr_1.cE)('dot', `
 margin: 0 4px;
 `)])]), (0, cssr_1.cE)('dot', `
 margin: 0 4px;
 `), (0, cssr_1.cE)('arrow-group', `
 top: 12px;
 right: 12px;
 `, [(0, cssr_1.c)('> *:first-child', `
 margin-right: 12px;
 `)])]), (0, cssr_1.cM)('bottom', [(0, cssr_1.cE)('dots', `
 transform: translateX(-50%);
 bottom: 12px;
 left: 50%;
 `, [(0, cssr_1.cM)('line', [(0, cssr_1.cE)('dot', `
 margin: 0 4px;
 `)])]), (0, cssr_1.cE)('dot', `
 margin: 0 4px;
 `), (0, cssr_1.cE)('arrow-group', `
 bottom: 12px;
 right: 12px;
 `, [(0, cssr_1.c)('> *:first-child', `
 margin-right: 12px;
 `)])]), (0, cssr_1.cM)('fade', [(0, cssr_1.cE)('slide', `
 position: absolute;
 opacity: 0;
 transition-property: opacity;
 pointer-events: none;
 `, [(0, cssr_1.cM)('current', `
 opacity: 1;
 pointer-events: auto;
 `)])]), (0, cssr_1.cM)('card', [(0, cssr_1.cE)('slides', `
 perspective: 1000px;
 `), (0, cssr_1.cE)('slide', `
 position: absolute;
 left: 50%;
 opacity: 0;
 transform: translateX(-50%) translateZ(-400px);
 transition-property: opacity, transform;
 `, [(0, cssr_1.cM)('current', `
 opacity: 1;
 transform: translateX(-50%) translateZ(0);
 z-index: 1;
 `), (0, cssr_1.cM)('prev', `
 opacity: 0.4;
 transform: translateX(-100%) translateZ(-200px);
 `), (0, cssr_1.cM)('next', `
 opacity: 0.4;
 transform: translateX(0%) translateZ(-200px);
 `)])])]);