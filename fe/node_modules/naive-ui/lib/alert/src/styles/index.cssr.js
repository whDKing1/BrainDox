"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_height_expand_cssr_1 = require("../../../_styles/transitions/fade-in-height-expand.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-color
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-icon-color
// --n-border
// --n-title-text-color
// --n-content-text-color
// --n-line-height
// --n-border-radius
// --n-font-size
// --n-title-font-weight
// --n-icon-size
// --n-icon-margin
// --n-close-size
// --n-close-icon-size
// --n-close-margin
// --n-padding
// --n-icon-margin-left
// --n-icon-margin-right
exports.default = (0, cssr_1.cB)('alert', `
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`, [(0, cssr_1.cE)('border', `
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `), (0, cssr_1.cM)('closable', [(0, cssr_1.cB)('alert-body', [(0, cssr_1.cE)('title', `
 padding-right: 24px;
 `)])]), (0, cssr_1.cE)('icon', {
  color: 'var(--n-icon-color)'
}), (0, cssr_1.cB)('alert-body', {
  padding: 'var(--n-padding)'
}, [(0, cssr_1.cE)('title', {
  color: 'var(--n-title-text-color)'
}), (0, cssr_1.cE)('content', {
  color: 'var(--n-content-text-color)'
})]), (0, fade_in_height_expand_cssr_1.fadeInHeightExpandTransition)({
  originalTransition: 'transform .3s var(--n-bezier)',
  enterToProps: {
    transform: 'scale(1)'
  },
  leaveToProps: {
    transform: 'scale(0.9)'
  }
}), (0, cssr_1.cE)('icon', `
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `), (0, cssr_1.cE)('close', `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `), (0, cssr_1.cM)('show-icon', [(0, cssr_1.cB)('alert-body', {
  paddingLeft: 'calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))'
})]),
// fix: https://github.com/tusen-ai/naive-ui/issues/4588
(0, cssr_1.cM)('right-adjust', [(0, cssr_1.cB)('alert-body', {
  paddingRight: 'calc(var(--n-close-size) + var(--n-padding) + 2px)'
})]), (0, cssr_1.cB)('alert-body', `
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `, [(0, cssr_1.cE)('title', `
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `, [(0, cssr_1.c)('& +', [(0, cssr_1.cE)('content', {
  marginTop: '9px'
})])]), (0, cssr_1.cE)('content', {
  transition: 'color .3s var(--n-bezier)',
  fontSize: 'var(--n-font-size)'
})]), (0, cssr_1.cE)('icon', {
  transition: 'color .3s var(--n-bezier)'
})]);