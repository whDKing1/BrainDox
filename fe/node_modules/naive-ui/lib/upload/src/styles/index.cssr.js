"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const icon_switch_cssr_1 = require("../../../_styles/transitions/icon-switch.cssr");
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('upload', 'width: 100%;', [(0, cssr_1.cM)('dragger-inside', [(0, cssr_1.cB)('upload-trigger', `
 display: block;
 `)]), (0, cssr_1.cM)('drag-over', [(0, cssr_1.cB)('upload-dragger', `
 border: var(--n-dragger-border-hover);
 `)])]), (0, cssr_1.cB)('upload-dragger', `
 cursor: pointer;
 box-sizing: border-box;
 width: 100%;
 text-align: center;
 border-radius: var(--n-border-radius);
 padding: 24px;
 opacity: 1;
 transition:
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-dragger-color);
 border: var(--n-dragger-border);
 `, [(0, cssr_1.c)('&:hover', `
 border: var(--n-dragger-border-hover);
 `), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 `)]), (0, cssr_1.cB)('upload-trigger', `
 display: inline-block;
 box-sizing: border-box;
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `, [(0, cssr_1.c)('+', [(0, cssr_1.cB)('upload-file-list', 'margin-top: 8px;')]), (0, cssr_1.cM)('disabled', `
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `), (0, cssr_1.cM)('image-card', `
 width: 96px;
 height: 96px;
 `, [(0, cssr_1.cB)('base-icon', `
 font-size: 24px;
 `), (0, cssr_1.cB)('upload-dragger', `
 padding: 0;
 height: 100%;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `)])]), (0, cssr_1.cB)('upload-file-list', `
 line-height: var(--n-line-height);
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `, [(0, cssr_1.c)('a, img', 'outline: none;'), (0, cssr_1.cM)('disabled', `
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `, [(0, cssr_1.cB)('upload-file', 'cursor: not-allowed;')]), (0, cssr_1.cM)('grid', `
 display: grid;
 grid-template-columns: repeat(auto-fill, 96px);
 grid-gap: 8px;
 margin-top: 0;
 `), (0, cssr_1.cB)('upload-file', `
 display: block;
 box-sizing: border-box;
 cursor: default;
 padding: 0px 12px 0 6px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `, [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)(), (0, cssr_1.cB)('progress', [(0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  foldPadding: true
})]), (0, cssr_1.c)('&:hover', `
 background-color: var(--n-item-color-hover);
 `, [(0, cssr_1.cB)('upload-file-info', [(0, cssr_1.cE)('action', `
 opacity: 1;
 `)])]), (0, cssr_1.cM)('image-type', `
 border-radius: var(--n-border-radius);
 text-decoration: underline;
 text-decoration-color: #0000;
 `, [(0, cssr_1.cB)('upload-file-info', `
 padding-top: 0px;
 padding-bottom: 0px;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 6px 0;
 `, [(0, cssr_1.cB)('progress', `
 padding: 2px 0;
 margin-bottom: 0;
 `), (0, cssr_1.cE)('name', `
 padding: 0 8px;
 `), (0, cssr_1.cE)('thumbnail', `
 width: 32px;
 height: 32px;
 font-size: 28px;
 display: flex;
 justify-content: center;
 align-items: center;
 `, [(0, cssr_1.c)('img', `
 width: 100%;
 `)])])]), (0, cssr_1.cM)('text-type', [(0, cssr_1.cB)('progress', `
 box-sizing: border-box;
 padding-bottom: 6px;
 margin-bottom: 6px;
 `)]), (0, cssr_1.cM)('image-card-type', `
 position: relative;
 width: 96px;
 height: 96px;
 border: var(--n-item-border-image-card);
 border-radius: var(--n-border-radius);
 padding: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 overflow: hidden;
 `, [(0, cssr_1.cB)('progress', `
 position: absolute;
 left: 8px;
 bottom: 8px;
 right: 8px;
 width: unset;
 `), (0, cssr_1.cB)('upload-file-info', `
 padding: 0;
 width: 100%;
 height: 100%;
 `, [(0, cssr_1.cE)('thumbnail', `
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 font-size: 36px;
 `, [(0, cssr_1.c)('img', `
 width: 100%;
 `)])]), (0, cssr_1.c)('&::before', `
 position: absolute;
 z-index: 1;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 opacity: 0;
 transition: opacity .2s var(--n-bezier);
 content: "";
 `), (0, cssr_1.c)('&:hover', [(0, cssr_1.c)('&::before', 'opacity: 1;'), (0, cssr_1.cB)('upload-file-info', [(0, cssr_1.cE)('thumbnail', 'opacity: .12;')])])]), (0, cssr_1.cM)('error-status', [(0, cssr_1.c)('&:hover', `
 background-color: var(--n-item-color-hover-error);
 `), (0, cssr_1.cB)('upload-file-info', [(0, cssr_1.cE)('name', 'color: var(--n-item-text-color-error);'), (0, cssr_1.cE)('thumbnail', 'color: var(--n-item-text-color-error);')]), (0, cssr_1.cM)('image-card-type', `
 border: var(--n-item-border-image-card-error);
 `)]), (0, cssr_1.cM)('with-url', `
 cursor: pointer;
 `, [(0, cssr_1.cB)('upload-file-info', [(0, cssr_1.cE)('name', `
 color: var(--n-item-text-color-success);
 text-decoration-color: var(--n-item-text-color-success);
 `, [(0, cssr_1.c)('a', `
 text-decoration: underline;
 `)])])]), (0, cssr_1.cB)('upload-file-info', `
 position: relative;
 padding-top: 6px;
 padding-bottom: 6px;
 display: flex;
 flex-wrap: nowrap;
 `, [(0, cssr_1.cE)('thumbnail', `
 font-size: 18px;
 opacity: 1;
 transition: opacity .2s var(--n-bezier);
 color: var(--n-item-icon-color);
 `, [(0, cssr_1.cB)('base-icon', `
 margin-right: 2px;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `)]), (0, cssr_1.cE)('action', `
 padding-top: inherit;
 padding-bottom: inherit;
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: 80px;
 display: flex;
 align-items: center;
 transition: opacity .2s var(--n-bezier);
 justify-content: flex-end;
 opacity: 0;
 `, [(0, cssr_1.cB)('button', [(0, cssr_1.c)('&:not(:last-child)', {
  marginRight: '4px'
}), (0, cssr_1.cB)('base-icon', [(0, cssr_1.c)('svg', [(0, icon_switch_cssr_1.iconSwitchTransition)()])])]), (0, cssr_1.cM)('image-type', `
 position: relative;
 max-width: 80px;
 width: auto;
 `), (0, cssr_1.cM)('image-card-type', `
 z-index: 2;
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 right: 0;
 bottom: 0;
 top: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 `)]), (0, cssr_1.cE)('name', `
 color: var(--n-item-text-color);
 flex: 1;
 display: flex;
 justify-content: center;
 text-overflow: ellipsis;
 overflow: hidden;
 flex-direction: column;
 text-decoration-color: #0000;
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier); 
 `, [(0, cssr_1.c)('a', `
 color: inherit;
 text-decoration: underline;
 `)])])])]), (0, cssr_1.cB)('upload-file-input', `
 display: none;
 width: 0;
 height: 0;
 opacity: 0;
 `)]);