"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../../_internal");
const icons_1 = require("../../../_internal/icons");
const _mixins_1 = require("../../../_mixins");
const popover_1 = require("../../../popover");
const interface_1 = require("../interface");
const FilterMenu_1 = __importDefault(require("./FilterMenu"));
const RenderFilter_1 = __importDefault(require("./RenderFilter"));
function createFilterState(currentFilterState, columnKey, mergedFilterValue) {
    const nextFilterState = Object.assign({}, currentFilterState);
    nextFilterState[columnKey] = mergedFilterValue;
    return nextFilterState;
}
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableFilterButton',
    props: {
        column: {
            type: Object,
            required: true
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const { mergedComponentPropsRef } = (0, _mixins_1.useConfig)();
        const { mergedThemeRef, mergedClsPrefixRef, mergedFilterStateRef, filterMenuCssVarsRef, paginationBehaviorOnFilterRef, doUpdatePage, doUpdateFilters, filterIconPopoverPropsRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        const showPopoverRef = (0, vue_1.ref)(false);
        const filterStateRef = mergedFilterStateRef;
        const filterMultipleRef = (0, vue_1.computed)(() => {
            return props.column.filterMultiple !== false;
        });
        const mergedFilterValueRef = (0, vue_1.computed)(() => {
            const filterValue = filterStateRef.value[props.column.key];
            if (filterValue === undefined) {
                const { value: multiple } = filterMultipleRef;
                if (multiple)
                    return [];
                else
                    return null;
            }
            return filterValue;
        });
        const activeRef = (0, vue_1.computed)(() => {
            const { value: filterValue } = mergedFilterValueRef;
            if (Array.isArray(filterValue)) {
                return filterValue.length > 0;
            }
            return filterValue !== null;
        });
        const mergedRenderFilterRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderFilter)
                || props.column.renderFilter);
        });
        function handleFilterChange(mergedFilterValue) {
            const nextFilterState = createFilterState(filterStateRef.value, props.column.key, mergedFilterValue);
            doUpdateFilters(nextFilterState, props.column);
            if (paginationBehaviorOnFilterRef.value === 'first') {
                doUpdatePage(1);
            }
        }
        function handleFilterMenuCancel() {
            showPopoverRef.value = false;
        }
        function handleFilterMenuConfirm() {
            showPopoverRef.value = false;
        }
        return {
            mergedTheme: mergedThemeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            active: activeRef,
            showPopover: showPopoverRef,
            mergedRenderFilter: mergedRenderFilterRef,
            filterIconPopoverProps: filterIconPopoverPropsRef,
            filterMultiple: filterMultipleRef,
            mergedFilterValue: mergedFilterValueRef,
            filterMenuCssVars: filterMenuCssVarsRef,
            handleFilterChange,
            handleFilterMenuConfirm,
            handleFilterMenuCancel
        };
    },
    render() {
        const { mergedTheme, mergedClsPrefix, handleFilterMenuCancel, filterIconPopoverProps } = this;
        return ((0, vue_1.h)(popover_1.NPopover, Object.assign({ show: this.showPopover, onUpdateShow: v => (this.showPopover = v), trigger: "click", theme: mergedTheme.peers.Popover, themeOverrides: mergedTheme.peerOverrides.Popover, placement: "bottom" }, filterIconPopoverProps, { style: { padding: 0 } }), {
            trigger: () => {
                const { mergedRenderFilter } = this;
                if (mergedRenderFilter) {
                    return ((0, vue_1.h)(RenderFilter_1.default, { "data-data-table-filter": true, render: mergedRenderFilter, active: this.active, show: this.showPopover }));
                }
                const { renderFilterIcon } = this.column;
                return ((0, vue_1.h)("div", { "data-data-table-filter": true, class: [
                        `${mergedClsPrefix}-data-table-filter`,
                        {
                            [`${mergedClsPrefix}-data-table-filter--active`]: this.active,
                            [`${mergedClsPrefix}-data-table-filter--show`]: this.showPopover
                        }
                    ] }, renderFilterIcon ? (renderFilterIcon({
                    active: this.active,
                    show: this.showPopover
                })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.FilterIcon, null) }))));
            },
            default: () => {
                const { renderFilterMenu } = this.column;
                return renderFilterMenu ? (renderFilterMenu({ hide: handleFilterMenuCancel })) : ((0, vue_1.h)(FilterMenu_1.default, { style: this.filterMenuCssVars, radioGroupName: String(this.column.key), multiple: this.filterMultiple, value: this.mergedFilterValue, options: this.options, column: this.column, onChange: this.handleFilterChange, onClear: this.handleFilterMenuCancel, onConfirm: this.handleFilterMenuConfirm }));
            }
        }));
    }
});
