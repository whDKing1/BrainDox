"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-text-color
// --n-border-color
// --n-toggle-button-color
// --n-toggle-bar-color
// --n-toggle-bar-color-hover
exports.default = (0, cssr_1.cB)('layout-sider', `
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`, [(0, cssr_1.cM)('bordered', [(0, cssr_1.cE)('border', `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]), (0, cssr_1.cE)('left-placement', [(0, cssr_1.cM)('bordered', [(0, cssr_1.cE)('border', `
 right: 0;
 `)])]), (0, cssr_1.cM)('right-placement', `
 justify-content: flex-start;
 `, [(0, cssr_1.cM)('bordered', [(0, cssr_1.cE)('border', `
 left: 0;
 `)]), (0, cssr_1.cM)('collapsed', [(0, cssr_1.cB)('layout-toggle-button', [(0, cssr_1.cB)('base-icon', `
 transform: rotate(180deg);
 `)]), (0, cssr_1.cB)('layout-toggle-bar', [(0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('top', {
  transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
}), (0, cssr_1.cE)('bottom', {
  transform: 'rotate(12deg) scale(1.15) translateY(2px)'
})])])]), (0, cssr_1.cB)('layout-toggle-button', `
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `, [(0, cssr_1.cB)('base-icon', `
 transform: rotate(0);
 `)]), (0, cssr_1.cB)('layout-toggle-bar', `
 left: -28px;
 transform: rotate(180deg);
 `, [(0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('top', {
  transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
}), (0, cssr_1.cE)('bottom', {
  transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
})])])]), (0, cssr_1.cM)('collapsed', [(0, cssr_1.cB)('layout-toggle-bar', [(0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('top', {
  transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
}), (0, cssr_1.cE)('bottom', {
  transform: 'rotate(12deg) scale(1.15) translateY(2px)'
})])]), (0, cssr_1.cB)('layout-toggle-button', [(0, cssr_1.cB)('base-icon', `
 transform: rotate(0);
 `)])]), (0, cssr_1.cB)('layout-toggle-button', `
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `, [(0, cssr_1.cB)('base-icon', `
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]), (0, cssr_1.cB)('layout-toggle-bar', `
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `, [(0, cssr_1.cE)('top, bottom', `
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), (0, cssr_1.cE)('bottom', `
 position: absolute;
 top: 34px;
 `), (0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('top', {
  transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
}), (0, cssr_1.cE)('bottom', {
  transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
})]), (0, cssr_1.cE)('top, bottom', {
  backgroundColor: 'var(--n-toggle-bar-color)'
}), (0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('top, bottom', {
  backgroundColor: 'var(--n-toggle-bar-color-hover)'
})])]), (0, cssr_1.cE)('border', `
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('layout-sider-scroll-container', `
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `), (0, cssr_1.cM)('show-content', [(0, cssr_1.cB)('layout-sider-scroll-container', {
  opacity: 1
})]), (0, cssr_1.cM)('absolute-positioned', `
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]);