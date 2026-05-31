"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const cssr_1 = require("../../../_utils/cssr");
const hoverStyleChildren = [(0, cssr_1.c)('&::before', 'background-color: var(--n-item-color-hover);'), (0, cssr_1.cE)('arrow', `
 color: var(--n-arrow-color-hover);
 `), (0, cssr_1.cE)('icon', `
 color: var(--n-item-icon-color-hover);
 `), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-hover);
 `, [(0, cssr_1.c)('a', `
 color: var(--n-item-text-color-hover);
 `), (0, cssr_1.cE)('extra', `
 color: var(--n-item-text-color-hover);
 `)])];
const horizontalHoverStyleChildren = [(0, cssr_1.cE)('icon', `
 color: var(--n-item-icon-color-hover-horizontal);
 `), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-hover-horizontal);
 `, [(0, cssr_1.c)('a', `
 color: var(--n-item-text-color-hover-horizontal);
 `), (0, cssr_1.cE)('extra', `
 color: var(--n-item-text-color-hover-horizontal);
 `)])];
// vars:
// --n-color
// --n-group-text-color
// --n-bezier
// --n-font-size
// --n-border-color-horizontal
// --n-border-radius
// --n-item-color-hover
// --n-item-color-active
// --n-item-color-active-hover
// --n-item-color-active-collapsed
// --n-arrow-color
// --n-arrow-color-hover
// --n-arrow-color-active
// --n-arrow-color-active-hover
// --n-arrow-color-child-active
// --n-arrow-color-child-active-hover
// --n-item-text-color
// --n-item-text-color-hover
// --n-item-text-color-active
// --n-item-text-color-active-hover
// --n-item-text-color-child-active
// --n-item-text-color-child-active-hover
// --n-item-text-color-horizontal
// --n-item-text-color-hover-horizontal
// --n-item-text-color-active-horizontal
// --n-item-text-color-active-hover-horizontal
// --n-item-text-color-child-active-horizontal
// --n-item-text-color-child-active-hover-horizontal
// --n-item-icon-color
// --n-item-icon-color-hover
// --n-item-icon-color-active
// --n-item-icon-color-active-hover
// --n-item-icon-color-child-active
// --n-item-icon-color-child-active-hover
// --n-item-icon-color-collapsed
// --n-item-icon-color-horizontal
// --n-item-icon-color-hover-horizontal
// --n-item-icon-color-active-horizontal
// --n-item-icon-color-active-hover-horizontal
// --n-item-icon-color-child-active-horizontal
// --n-item-icon-color-child-active-hover-horizontal
// --n-item-height
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('menu', `
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `, [(0, cssr_1.cM)('horizontal', `
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `, [(0, cssr_1.cB)('submenu', 'margin: 0;'), (0, cssr_1.cB)('menu-item', 'margin: 0;'), (0, cssr_1.cB)('menu-item-content', `
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `, [(0, cssr_1.c)('&::before', 'display: none;'), (0, cssr_1.cM)('selected', 'border-bottom: 2px solid var(--n-border-color-horizontal)')]), (0, cssr_1.cB)('menu-item-content', [(0, cssr_1.cM)('selected', [(0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-active-horizontal);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-active-horizontal);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-active-horizontal);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-active-horizontal);')])]), (0, cssr_1.cM)('child-active', `
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `, [(0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-child-active-horizontal);
 `, [(0, cssr_1.c)('a', `
 color: var(--n-item-text-color-child-active-horizontal);
 `), (0, cssr_1.cE)('extra', `
 color: var(--n-item-text-color-child-active-horizontal);
 `)]), (0, cssr_1.cE)('icon', `
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cNotM)('selected, child-active', [(0, cssr_1.c)('&:focus-within', horizontalHoverStyleChildren)]), (0, cssr_1.cM)('selected', [hoverStyle(null, [(0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-active-hover-horizontal);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-active-hover-horizontal);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-active-hover-horizontal);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-active-hover-horizontal);')])])]), (0, cssr_1.cM)('child-active', [hoverStyle(null, [(0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-child-active-hover-horizontal);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-child-active-hover-horizontal);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-child-active-hover-horizontal);')])])]), hoverStyle('border-bottom: 2px solid var(--n-border-color-horizontal);', horizontalHoverStyleChildren)]), (0, cssr_1.cB)('menu-item-content-header', [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-horizontal);')])])]), (0, cssr_1.cNotM)('responsive', [(0, cssr_1.cB)('menu-item-content-header', `
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), (0, cssr_1.cM)('collapsed', [(0, cssr_1.cB)('menu-item-content', [(0, cssr_1.cM)('selected', [(0, cssr_1.c)('&::before', `
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]), (0, cssr_1.cB)('menu-item-content-header', 'opacity: 0;'), (0, cssr_1.cE)('arrow', 'opacity: 0;'), (0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-collapsed);')])]), (0, cssr_1.cB)('menu-item', `
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `), (0, cssr_1.cB)('menu-item-content', `
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('> *', 'z-index: 1;'), (0, cssr_1.c)('&::before', `
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), (0, cssr_1.cM)('disabled', `
 opacity: .45;
 cursor: not-allowed;
 `), (0, cssr_1.cM)('collapsed', [(0, cssr_1.cE)('arrow', 'transform: rotate(0);')]), (0, cssr_1.cM)('selected', [(0, cssr_1.c)('&::before', 'background-color: var(--n-item-color-active);'), (0, cssr_1.cE)('arrow', 'color: var(--n-arrow-color-active);'), (0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-active);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-active);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-active);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-active);')])]), (0, cssr_1.cM)('child-active', [(0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-child-active);
 `, [(0, cssr_1.c)('a', `
 color: var(--n-item-text-color-child-active);
 `), (0, cssr_1.cE)('extra', `
 color: var(--n-item-text-color-child-active);
 `)]), (0, cssr_1.cE)('arrow', `
 color: var(--n-arrow-color-child-active);
 `), (0, cssr_1.cE)('icon', `
 color: var(--n-item-icon-color-child-active);
 `)]), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cNotM)('selected, child-active', [(0, cssr_1.c)('&:focus-within', hoverStyleChildren)]), (0, cssr_1.cM)('selected', [hoverStyle(null, [(0, cssr_1.cE)('arrow', 'color: var(--n-arrow-color-active-hover);'), (0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-active-hover);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-active-hover);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-active-hover);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-active-hover);')])])]), (0, cssr_1.cM)('child-active', [hoverStyle(null, [(0, cssr_1.cE)('arrow', 'color: var(--n-arrow-color-child-active-hover);'), (0, cssr_1.cE)('icon', 'color: var(--n-item-icon-color-child-active-hover);'), (0, cssr_1.cB)('menu-item-content-header', `
 color: var(--n-item-text-color-child-active-hover);
 `, [(0, cssr_1.c)('a', 'color: var(--n-item-text-color-child-active-hover);'), (0, cssr_1.cE)('extra', 'color: var(--n-item-text-color-child-active-hover);')])])]), (0, cssr_1.cM)('selected', [hoverStyle(null, [(0, cssr_1.c)('&::before', 'background-color: var(--n-item-color-active-hover);')])]), hoverStyle(null, hoverStyleChildren)]), (0, cssr_1.cE)('icon', `
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `), (0, cssr_1.cE)('arrow', `
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `), (0, cssr_1.cB)('menu-item-content-header', `
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `, [(0, cssr_1.c)('a', `
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `, [(0, cssr_1.c)('&::before', `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), (0, cssr_1.cE)('extra', `
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]), (0, cssr_1.cB)('submenu', `
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `, [(0, cssr_1.cB)('menu-item-content', `
 height: var(--n-item-height);
 `), (0, cssr_1.cB)('submenu-children', `
 overflow: hidden;
 padding: 0;
 `, [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  duration: '.2s'
})])]), (0, cssr_1.cB)('menu-item-group', [(0, cssr_1.cB)('menu-item-group-title', `
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]), (0, cssr_1.cB)('menu-tooltip', [(0, cssr_1.c)('a', `
 color: inherit;
 text-decoration: none;
 `)]), (0, cssr_1.cB)('menu-divider', `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);
function hoverStyle(props, children) {
  return [(0, cssr_1.cM)('hover', props, children), (0, cssr_1.c)('&:hover', props, children)];
}