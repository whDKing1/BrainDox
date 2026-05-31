"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.n1 = exports.zero = void 0;
const index_1 = require("../../../_utils/cssr/index");
exports.zero = '0!important';
exports.n1 = '-1px!important';
function createLeftBorderStyle(type) {
  return (0, index_1.cM)(`${type}-type`, [(0, index_1.c)('& +', [(0, index_1.cB)('button', {}, [(0, index_1.cM)(`${type}-type`, [(0, index_1.cE)('border', {
    borderLeftWidth: exports.zero
  }), (0, index_1.cE)('state-border', {
    left: exports.n1
  })])])])]);
}
function createTopBorderStyle(type) {
  return (0, index_1.cM)(`${type}-type`, [(0, index_1.c)('& +', [(0, index_1.cB)('button', [(0, index_1.cM)(`${type}-type`, [(0, index_1.cE)('border', {
    borderTopWidth: exports.zero
  }), (0, index_1.cE)('state-border', {
    top: exports.n1
  })])])])]);
}
exports.default = (0, index_1.cB)('button-group', `
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`, [(0, index_1.cNotM)('vertical', {
  flexDirection: 'row'
}, [(0, index_1.cNotM)('rtl', [(0, index_1.cB)('button', [(0, index_1.c)('&:first-child:not(:last-child)', `
 margin-right: ${exports.zero};
 border-top-right-radius: ${exports.zero};
 border-bottom-right-radius: ${exports.zero};
 `), (0, index_1.c)('&:last-child:not(:first-child)', `
 margin-left: ${exports.zero};
 border-top-left-radius: ${exports.zero};
 border-bottom-left-radius: ${exports.zero};
 `), (0, index_1.c)('&:not(:first-child):not(:last-child)', `
 margin-left: ${exports.zero};
 margin-right: ${exports.zero};
 border-radius: ${exports.zero};
 `), createLeftBorderStyle('default'), (0, index_1.cM)('ghost', [createLeftBorderStyle('primary'), createLeftBorderStyle('info'), createLeftBorderStyle('success'), createLeftBorderStyle('warning'), createLeftBorderStyle('error')])])])]), (0, index_1.cM)('vertical', {
  flexDirection: 'column'
}, [(0, index_1.cB)('button', [(0, index_1.c)('&:first-child:not(:last-child)', `
 margin-bottom: ${exports.zero};
 margin-left: ${exports.zero};
 margin-right: ${exports.zero};
 border-bottom-left-radius: ${exports.zero};
 border-bottom-right-radius: ${exports.zero};
 `), (0, index_1.c)('&:last-child:not(:first-child)', `
 margin-top: ${exports.zero};
 margin-left: ${exports.zero};
 margin-right: ${exports.zero};
 border-top-left-radius: ${exports.zero};
 border-top-right-radius: ${exports.zero};
 `), (0, index_1.c)('&:not(:first-child):not(:last-child)', `
 margin: ${exports.zero};
 border-radius: ${exports.zero};
 `), createTopBorderStyle('default'), (0, index_1.cM)('ghost', [createTopBorderStyle('primary'), createTopBorderStyle('info'), createTopBorderStyle('success'), createTopBorderStyle('warning'), createTopBorderStyle('error')])])])]);