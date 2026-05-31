"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('input-group', `
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('input', [(0, cssr_1.c)('&:not(:last-child)', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), (0, cssr_1.c)('&:not(:first-child)', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]), (0, cssr_1.cB)('button', [(0, cssr_1.c)('&:not(:last-child)', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `, [(0, cssr_1.cE)('state-border, border', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]), (0, cssr_1.c)('&:not(:first-child)', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `, [(0, cssr_1.cE)('state-border, border', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]), (0, cssr_1.c)('*', [(0, cssr_1.c)('&:not(:last-child)', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('input', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), (0, cssr_1.cB)('base-selection', [(0, cssr_1.cB)('base-selection-label', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), (0, cssr_1.cB)('base-selection-tags', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `), (0, cssr_1.cE)('box-shadow, border, state-border', `
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]), (0, cssr_1.c)('&:not(:first-child)', `
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('input', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), (0, cssr_1.cB)('base-selection', [(0, cssr_1.cB)('base-selection-label', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), (0, cssr_1.cB)('base-selection-tags', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `), (0, cssr_1.cE)('box-shadow, border, state-border', `
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]);