"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const fade_in_cssr_1 = require("../../../_styles/transitions/fade-in.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-toolbar-icon-color
// --n-toolbar-color
// --n-toolbar-border-radius
// --n-toolbar-box-shadow
// --n-bezier
exports.default = (0, cssr_1.c)([(0, cssr_1.c)('body >', [(0, cssr_1.cB)('image-container', 'position: fixed;')]), (0, cssr_1.cB)('image-preview-container', `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 `), (0, cssr_1.cB)('image-preview-overlay', `
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0, 0, 0, .3);
 `, [(0, fade_in_cssr_1.fadeInTransition)()]), (0, cssr_1.cB)('image-preview-toolbar', `
 z-index: 1;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);
 border-radius: var(--n-toolbar-border-radius);
 height: 48px;
 bottom: 40px;
 padding: 0 12px;
 background: var(--n-toolbar-color);
 box-shadow: var(--n-toolbar-box-shadow);
 color: var(--n-toolbar-icon-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [(0, cssr_1.cB)('base-icon', `
 padding: 0 8px;
 font-size: 28px;
 cursor: pointer;
 `), (0, fade_in_cssr_1.fadeInTransition)()]), (0, cssr_1.cB)('image-preview-wrapper', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 pointer-events: none;
 `, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)()]), (0, cssr_1.cB)('image-preview', `
 user-select: none;
 -webkit-user-select: none;
 pointer-events: all;
 margin: auto;
 max-height: calc(100vh - 32px);
 max-width: calc(100vw - 32px);
 transition: transform .3s var(--n-bezier);
 `), (0, cssr_1.cB)('image', `
 display: inline-flex;
 max-height: 100%;
 max-width: 100%;
 `, [(0, cssr_1.cNotM)('preview-disabled', `
 cursor: pointer;
 `), (0, cssr_1.c)('img', `
 border-radius: inherit;
 `)])]);