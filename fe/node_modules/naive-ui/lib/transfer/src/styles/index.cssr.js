"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// --n-close-size
// --n-close-icon-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
exports.default = (0, cssr_1.cB)('transfer', `
 width: 100%;
 font-size: var(--n-font-size);
 height: 300px;
 display: flex;
 flex-wrap: nowrap;
 word-break: break-word;
`, [(0, cssr_1.cM)('disabled', [(0, cssr_1.cB)('transfer-list', [(0, cssr_1.cB)('transfer-list-header', [(0, cssr_1.cE)('title', `
 color: var(--n-header-text-color-disabled);
 `), (0, cssr_1.cE)('extra', `
 color: var(--n-header-extra-text-color-disabled);
 `)])])]), (0, cssr_1.cB)('transfer-list', `
 flex: 1;
 min-width: 0;
 height: inherit;
 display: flex;
 flex-direction: column;
 background-clip: padding-box;
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-list-color);
 `, [(0, cssr_1.cM)('source', `
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('border', 'border-right: 1px solid var(--n-divider-color);')]), (0, cssr_1.cM)('target', `
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [(0, cssr_1.cE)('border', 'border-left: none;')]), (0, cssr_1.cE)('border', `
 padding: 0 12px;
 border: 1px solid var(--n-border-color);
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `), (0, cssr_1.cB)('transfer-list-header', `
 min-height: var(--n-header-height);
 box-sizing: border-box;
 display: flex;
 padding: 12px 12px 10px 12px;
 align-items: center;
 background-clip: padding-box;
 border-radius: inherit;
 border-bottom-left-radius: 0;
 border-bottom-right-radius: 0;
 line-height: 1.5;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [(0, cssr_1.c)('> *:not(:first-child)', `
 margin-left: 8px;
 `), (0, cssr_1.cE)('title', `
 flex: 1;
 min-width: 0;
 line-height: 1.5;
 font-size: var(--n-header-font-size);
 font-weight: var(--n-header-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-header-text-color);
 `), (0, cssr_1.cE)('button', `
 position: relative;
 `), (0, cssr_1.cE)('extra', `
 transition: color .3s var(--n-bezier);
 font-size: var(--n-extra-font-size);
 margin-right: 0;
 white-space: nowrap;
 color: var(--n-header-extra-text-color);
 `)]), (0, cssr_1.cB)('transfer-list-body', `
 flex-basis: 0;
 flex-grow: 1;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 border-radius: inherit;
 border-top-left-radius: 0;
 border-top-right-radius: 0;
 `, [(0, cssr_1.cB)('transfer-filter', `
 padding: 4px 12px 8px 12px;
 box-sizing: border-box;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('transfer-list-flex-container', `
 flex: 1;
 position: relative;
 `, [(0, cssr_1.cB)('scrollbar', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 height: unset;
 `), (0, cssr_1.cB)('empty', `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 `), (0, cssr_1.cB)('transfer-list-content', `
 padding: 0;
 margin: 0;
 position: relative;
 `, [(0, cssr_1.cB)('transfer-list-item', `
 padding: 0 12px;
 min-height: var(--n-item-height);
 display: flex;
 align-items: center;
 color: var(--n-item-text-color);
 position: relative;
 transition: color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('background', `
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('checkbox', `
 position: relative;
 margin-right: 8px;
 `), (0, cssr_1.cE)('close', `
 opacity: 0;
 pointer-events: none;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), (0, cssr_1.cE)('label', `
 position: relative;
 min-width: 0;
 flex-grow: 1;
 `), (0, cssr_1.cM)('source', 'cursor: pointer;'), (0, cssr_1.cM)('disabled', `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover', [(0, cssr_1.cE)('background', 'background-color: var(--n-item-color-pending);'), (0, cssr_1.cE)('close', `
 opacity: 1;
 pointer-events: all;
 `)])])])])])])])]);