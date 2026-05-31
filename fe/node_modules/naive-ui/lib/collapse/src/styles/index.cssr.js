"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-divider-color
// --n-title-padding
// --n-title-font-size
// --n-title-text-color
// --n-title-font-weight
// --n-arrow-color
// --n-arrow-color-disabled
// --n-title-text-color-disabled
// --n-item-margin
exports.default = (0, cssr_1.cB)('collapse', 'width: 100%;', [(0, cssr_1.cB)('collapse-item', `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: var(--n-item-margin);
 `, [(0, cssr_1.cM)('disabled', [(0, cssr_1.cE)('header', 'cursor: not-allowed;', [(0, cssr_1.cE)('header-main', `
 color: var(--n-title-text-color-disabled);
 `), (0, cssr_1.cB)('collapse-item-arrow', `
 color: var(--n-arrow-color-disabled);
 `)])]), (0, cssr_1.cB)('collapse-item', 'margin-left: 32px;'), (0, cssr_1.c)('&:first-child', 'margin-top: 0;'), (0, cssr_1.c)('&:first-child >', [(0, cssr_1.cE)('header', 'padding-top: 0;')]), (0, cssr_1.cM)('left-arrow-placement', [(0, cssr_1.cE)('header', [(0, cssr_1.cB)('collapse-item-arrow', 'margin-right: 4px;')])]), (0, cssr_1.cM)('right-arrow-placement', [(0, cssr_1.cE)('header', [(0, cssr_1.cB)('collapse-item-arrow', 'margin-left: 4px;')])]), (0, cssr_1.cE)('content-wrapper', [(0, cssr_1.cE)('content-inner', 'padding-top: 16px;'), (0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  duration: '0.15s'
})]), (0, cssr_1.cM)('active', [(0, cssr_1.cE)('header', [(0, cssr_1.cM)('active', [(0, cssr_1.cB)('collapse-item-arrow', 'transform: rotate(90deg);')])])]), (0, cssr_1.c)('&:not(:first-child)', 'border-top: 1px solid var(--n-divider-color);'), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.cM)('trigger-area-main', [(0, cssr_1.cE)('header', [(0, cssr_1.cE)('header-main', 'cursor: pointer;'), (0, cssr_1.cB)('collapse-item-arrow', 'cursor: default;')])]), (0, cssr_1.cM)('trigger-area-arrow', [(0, cssr_1.cE)('header', [(0, cssr_1.cB)('collapse-item-arrow', 'cursor: pointer;')])]), (0, cssr_1.cM)('trigger-area-extra', [(0, cssr_1.cE)('header', [(0, cssr_1.cE)('header-extra', 'cursor: pointer;')])])]), (0, cssr_1.cE)('header', `
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: var(--n-title-padding);
 color: var(--n-title-text-color);
 `, [(0, cssr_1.cE)('header-main', `
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `), (0, cssr_1.cE)('header-extra', `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), (0, cssr_1.cB)('collapse-item-arrow', `
 display: flex;
 transition:
 transform .15s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: 18px;
 color: var(--n-arrow-color);
 `)])])]);