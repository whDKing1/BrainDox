"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('data-table', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `, [(0, cssr_1.cB)('data-table-th', [(0, cssr_1.cM)('filterable', `
 padding-left: 36px;
 padding-right: var(--n-th-padding);
 `, [(0, cssr_1.cM)('sortable', `
 padding-right: var(--n-th-padding);
 padding-left: calc(var(--n-th-padding) + 36px);
 `)]), (0, cssr_1.cB)('data-table-sorter', `
 margin-left: 0;
 margin-right: 4px;
 `), (0, cssr_1.cB)('data-table-filter', `
 right: unset;
 left: 0;
 `)])])]), (0, cssr_1.cB)('data-table-filter-menu', [(0, cssr_1.cM)('rtl', `
 direction: rtl;
 `)])]);