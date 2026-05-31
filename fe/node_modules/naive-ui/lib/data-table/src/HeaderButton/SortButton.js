"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../../_internal");
const icons_1 = require("../../../_internal/icons");
const _mixins_1 = require("../../../_mixins");
const interface_1 = require("../interface");
const RenderSorter_1 = __importDefault(require("./RenderSorter"));
exports.default = (0, vue_1.defineComponent)({
    name: 'SortIcon',
    props: {
        column: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { mergedComponentPropsRef } = (0, _mixins_1.useConfig)();
        const { mergedSortStateRef, mergedClsPrefixRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        const sortStateRef = (0, vue_1.computed)(() => mergedSortStateRef.value.find(state => state.columnKey === props.column.key));
        const activeRef = (0, vue_1.computed)(() => {
            return sortStateRef.value !== undefined;
        });
        const mergedSortOrderRef = (0, vue_1.computed)(() => {
            const { value: sortState } = sortStateRef;
            if (sortState && activeRef.value) {
                return sortState.order;
            }
            return false;
        });
        const mergedRenderSorterRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderSorter)
                || props.column.renderSorter);
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            active: activeRef,
            mergedSortOrder: mergedSortOrderRef,
            mergedRenderSorter: mergedRenderSorterRef
        };
    },
    render() {
        const { mergedRenderSorter, mergedSortOrder, mergedClsPrefix } = this;
        const { renderSorterIcon } = this.column;
        return mergedRenderSorter ? ((0, vue_1.h)(RenderSorter_1.default, { render: mergedRenderSorter, order: mergedSortOrder })) : ((0, vue_1.h)("span", { class: [
                `${mergedClsPrefix}-data-table-sorter`,
                mergedSortOrder === 'ascend'
                    && `${mergedClsPrefix}-data-table-sorter--asc`,
                mergedSortOrder === 'descend'
                    && `${mergedClsPrefix}-data-table-sorter--desc`
            ] }, renderSorterIcon ? (renderSorterIcon({ order: mergedSortOrder })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.ArrowDownIcon, null) }))));
    }
});
