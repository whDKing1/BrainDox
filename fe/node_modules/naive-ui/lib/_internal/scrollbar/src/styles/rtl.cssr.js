"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../../_utils/cssr");
exports.default = (0, cssr_1.cB)('scrollbar', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.c)('>', [(0, cssr_1.cB)('scrollbar-rail', [(0, cssr_1.cM)('horizontal', [(0, cssr_1.c)('>', [(0, cssr_1.cE)('scrollbar', `
 left: 0;
 right: unset;
 `)])])])])])]);