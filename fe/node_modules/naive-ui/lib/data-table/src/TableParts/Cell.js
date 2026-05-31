"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const Ellipsis_1 = __importDefault(require("../../../ellipsis/src/Ellipsis"));
const PerformantEllipsis_1 = require("../../../ellipsis/src/PerformantEllipsis");
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableCell',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        column: {
            type: Object,
            required: true
        },
        isSummary: Boolean,
        mergedTheme: {
            type: Object,
            required: true
        },
        renderCell: Function
    },
    render() {
        var _a;
        const { isSummary, column, row, renderCell } = this;
        let cell;
        const { render, key, ellipsis } = column;
        if (render && !isSummary) {
            cell = render(row, this.index);
        }
        else {
            if (isSummary) {
                cell = (_a = row[key]) === null || _a === void 0 ? void 0 : _a.value;
            }
            else {
                cell = renderCell
                    ? renderCell((0, lodash_1.get)(row, key), row, column)
                    : (0, lodash_1.get)(row, key);
            }
        }
        if (ellipsis) {
            if (typeof ellipsis === 'object') {
                const { mergedTheme } = this;
                if (column.ellipsisComponent === 'performant-ellipsis') {
                    return ((0, vue_1.h)(PerformantEllipsis_1.NPerformantEllipsis, Object.assign({}, ellipsis, { theme: mergedTheme.peers.Ellipsis, themeOverrides: mergedTheme.peerOverrides.Ellipsis }), { default: () => cell }));
                }
                return ((0, vue_1.h)(Ellipsis_1.default, Object.assign({}, ellipsis, { theme: mergedTheme.peers.Ellipsis, themeOverrides: mergedTheme.peerOverrides.Ellipsis }), { default: () => cell }));
            }
            else {
                return ((0, vue_1.h)("span", { class: `${this.clsPrefix}-data-table-td__ellipsis` }, cell));
            }
        }
        return cell;
    }
});
