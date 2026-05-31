"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const pagination_1 = require("../../pagination");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const MainTable_1 = __importDefault(require("./MainTable"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const use_check_1 = require("./use-check");
const use_expand_1 = require("./use-expand");
const use_group_header_1 = require("./use-group-header");
const use_resizable_1 = require("./use-resizable");
const use_scroll_1 = require("./use-scroll");
const use_table_data_1 = require("./use-table-data");
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTable',
    alias: ['AdvancedTable'],
    props: interface_1.dataTableProps,
    slots: Object,
    setup(props, { slots }) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onPageChange !== undefined) {
                    (0, _utils_1.warnOnce)('data-table', '`on-page-change` is deprecated, please use `on-update:page` instead.');
                }
                if (props.onPageSizeChange !== undefined) {
                    (0, _utils_1.warnOnce)('data-table', '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.');
                }
                if (props.onSorterChange !== undefined) {
                    (0, _utils_1.warnOnce)('data-table', '`on-sorter-change` is deprecated, please use `on-update:sorter` instead.');
                }
                if (props.onFiltersChange !== undefined) {
                    (0, _utils_1.warnOnce)('data-table', '`on-filters-change` is deprecated, please use `on-update:filters` instead.');
                }
                if (props.onCheckedRowKeysChange !== undefined) {
                    (0, _utils_1.warnOnce)('data-table', '`on-checked-row-keys-change` is deprecated, please use `on-update:checked-row-keys` instead.');
                }
            });
        }
        const { mergedBorderedRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('DataTable', mergedRtlRef, mergedClsPrefixRef);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size
                || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.size)
                || 'medium');
        });
        const mergedBottomBorderedRef = (0, vue_1.computed)(() => {
            const { bottomBordered } = props;
            // do not add bottom bordered class if bordered is true
            // since border is displayed on wrapper
            if (mergedBorderedRef.value)
                return false;
            if (bottomBordered !== undefined)
                return bottomBordered;
            return true;
        });
        const themeRef = (0, _mixins_1.useTheme)('DataTable', '-data-table', index_cssr_1.default, styles_1.dataTableLight, props, mergedClsPrefixRef);
        const bodyWidthRef = (0, vue_1.ref)(null);
        const mainTableInstRef = (0, vue_1.ref)(null);
        const { getResizableWidth, clearResizableWidth, doUpdateResizableWidth } = (0, use_resizable_1.useResizable)();
        const { rowsRef, colsRef, dataRelatedColsRef, hasEllipsisRef } = (0, use_group_header_1.useGroupHeader)(props, getResizableWidth);
        const { treeMateRef, mergedCurrentPageRef, paginatedDataRef, rawPaginatedDataRef, selectionColumnRef, hoverKeyRef, mergedPaginationRef, mergedFilterStateRef, mergedSortStateRef, childTriggerColIndexRef, doUpdatePage, doUpdateFilters, onUnstableColumnResize, deriveNextSorter, filter, filters, clearFilter, clearFilters, clearSorter, page, sort } = (0, use_table_data_1.useTableData)(props, { dataRelatedColsRef });
        const downloadCsv = (options) => {
            const { fileName = 'data.csv', keepOriginalData = false } = options || {};
            const data = keepOriginalData ? props.data : rawPaginatedDataRef.value;
            const csvData = (0, utils_1.generateCsv)(props.columns, data, props.getCsvCell, props.getCsvHeader);
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
            const downloadUrl = URL.createObjectURL(blob);
            (0, _utils_1.download)(downloadUrl, fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
            URL.revokeObjectURL(downloadUrl);
        };
        const { doCheckAll, doUncheckAll, doCheck, doUncheck, headerCheckboxDisabledRef, someRowsCheckedRef, allRowsCheckedRef, mergedCheckedRowKeySetRef, mergedInderminateRowKeySetRef } = (0, use_check_1.useCheck)(props, {
            selectionColumnRef,
            treeMateRef,
            paginatedDataRef
        });
        const { stickyExpandedRowsRef, mergedExpandedRowKeysRef, renderExpandRef, expandableRef, doUpdateExpandedRowKeys } = (0, use_expand_1.useExpand)(props, treeMateRef);
        const maxHeightRef = (0, vue_1.toRef)(props, 'maxHeight');
        const mergedTableLayoutRef = (0, vue_1.computed)(() => {
            // Layout
            // virtual |descrete header | ellpisis => fixed
            //    = virtual | maxHeight | ellpisis => fixed
            if (props.virtualScroll
                || props.flexHeight
                || props.maxHeight !== undefined
                || hasEllipsisRef.value) {
                return 'fixed';
            }
            return props.tableLayout;
        });
        const { handleTableBodyScroll, handleTableHeaderScroll, syncScrollState, setHeaderScrollLeft, leftActiveFixedColKeyRef, leftActiveFixedChildrenColKeysRef, rightActiveFixedColKeyRef, rightActiveFixedChildrenColKeysRef, leftFixedColumnsRef, rightFixedColumnsRef, fixedColumnLeftMapRef, fixedColumnRightMapRef, xScrollableRef, explicitlyScrollableRef } = (0, use_scroll_1.useScroll)(props, {
            bodyWidthRef,
            mainTableInstRef,
            mergedCurrentPageRef,
            maxHeightRef,
            mergedTableLayoutRef
        });
        const { localeRef } = (0, _mixins_1.useLocale)('DataTable');
        (0, vue_1.provide)(interface_1.dataTableInjectionKey, {
            xScrollableRef,
            explicitlyScrollableRef,
            props,
            treeMateRef,
            renderExpandIconRef: (0, vue_1.toRef)(props, 'renderExpandIcon'),
            loadingKeySetRef: (0, vue_1.ref)(new Set()),
            slots,
            indentRef: (0, vue_1.toRef)(props, 'indent'),
            childTriggerColIndexRef,
            bodyWidthRef,
            componentId: (0, seemly_1.createId)(),
            hoverKeyRef,
            mergedClsPrefixRef,
            mergedThemeRef: themeRef,
            scrollXRef: (0, vue_1.computed)(() => props.scrollX),
            rowsRef,
            colsRef,
            paginatedDataRef,
            leftActiveFixedColKeyRef,
            leftActiveFixedChildrenColKeysRef,
            rightActiveFixedColKeyRef,
            rightActiveFixedChildrenColKeysRef,
            leftFixedColumnsRef,
            rightFixedColumnsRef,
            fixedColumnLeftMapRef,
            fixedColumnRightMapRef,
            mergedCurrentPageRef,
            someRowsCheckedRef,
            allRowsCheckedRef,
            mergedSortStateRef,
            mergedFilterStateRef,
            loadingRef: (0, vue_1.toRef)(props, 'loading'),
            rowClassNameRef: (0, vue_1.toRef)(props, 'rowClassName'),
            mergedCheckedRowKeySetRef,
            mergedExpandedRowKeysRef,
            mergedInderminateRowKeySetRef,
            localeRef,
            expandableRef,
            stickyExpandedRowsRef,
            rowKeyRef: (0, vue_1.toRef)(props, 'rowKey'),
            renderExpandRef,
            summaryRef: (0, vue_1.toRef)(props, 'summary'),
            virtualScrollRef: (0, vue_1.toRef)(props, 'virtualScroll'),
            virtualScrollXRef: (0, vue_1.toRef)(props, 'virtualScrollX'),
            heightForRowRef: (0, vue_1.toRef)(props, 'heightForRow'),
            minRowHeightRef: (0, vue_1.toRef)(props, 'minRowHeight'),
            virtualScrollHeaderRef: (0, vue_1.toRef)(props, 'virtualScrollHeader'),
            headerHeightRef: (0, vue_1.toRef)(props, 'headerHeight'),
            rowPropsRef: (0, vue_1.toRef)(props, 'rowProps'),
            stripedRef: (0, vue_1.toRef)(props, 'striped'),
            checkOptionsRef: (0, vue_1.computed)(() => {
                const { value: selectionColumn } = selectionColumnRef;
                return selectionColumn === null || selectionColumn === void 0 ? void 0 : selectionColumn.options;
            }),
            rawPaginatedDataRef,
            filterMenuCssVarsRef: (0, vue_1.computed)(() => {
                const { self: { actionDividerColor, actionPadding, actionButtonMargin } } = themeRef.value;
                return {
                    '--n-action-padding': actionPadding,
                    '--n-action-button-margin': actionButtonMargin,
                    '--n-action-divider-color': actionDividerColor
                };
            }),
            onLoadRef: (0, vue_1.toRef)(props, 'onLoad'),
            mergedTableLayoutRef,
            maxHeightRef,
            minHeightRef: (0, vue_1.toRef)(props, 'minHeight'),
            flexHeightRef: (0, vue_1.toRef)(props, 'flexHeight'),
            headerCheckboxDisabledRef,
            paginationBehaviorOnFilterRef: (0, vue_1.toRef)(props, 'paginationBehaviorOnFilter'),
            summaryPlacementRef: (0, vue_1.toRef)(props, 'summaryPlacement'),
            filterIconPopoverPropsRef: (0, vue_1.toRef)(props, 'filterIconPopoverProps'),
            scrollbarPropsRef: (0, vue_1.toRef)(props, 'scrollbarProps'),
            syncScrollState,
            doUpdatePage,
            doUpdateFilters,
            getResizableWidth,
            onUnstableColumnResize,
            clearResizableWidth,
            doUpdateResizableWidth,
            deriveNextSorter,
            doCheck,
            doUncheck,
            doCheckAll,
            doUncheckAll,
            doUpdateExpandedRowKeys,
            handleTableHeaderScroll,
            handleTableBodyScroll,
            setHeaderScrollLeft,
            renderCell: (0, vue_1.toRef)(props, 'renderCell')
        });
        const exposedMethods = {
            filter,
            filters,
            clearFilters,
            clearSorter,
            page,
            sort,
            clearFilter,
            downloadCsv,
            scrollTo: (arg0, arg1) => {
                var _a;
                (_a = mainTableInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
            }
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const mergedSize = mergedSizeRef.value;
            const { common: { cubicBezierEaseInOut }, self: { borderColor, tdColorHover, tdColorSorting, tdColorSortingModal, tdColorSortingPopover, thColorSorting, thColorSortingModal, thColorSortingPopover, thColor, thColorHover, tdColor, tdTextColor, thTextColor, thFontWeight, thButtonColorHover, thIconColor, thIconColorActive, filterSize, borderRadius, lineHeight, tdColorModal, thColorModal, borderColorModal, thColorHoverModal, tdColorHoverModal, borderColorPopover, thColorPopover, tdColorPopover, tdColorHoverPopover, thColorHoverPopover, paginationMargin, emptyPadding, boxShadowAfter, boxShadowBefore, sorterSize, resizableContainerSize, resizableSize, loadingColor, loadingSize, opacityLoading, tdColorStriped, tdColorStripedModal, tdColorStripedPopover, [(0, _utils_1.createKey)('fontSize', mergedSize)]: fontSize, [(0, _utils_1.createKey)('thPadding', mergedSize)]: thPadding, [(0, _utils_1.createKey)('tdPadding', mergedSize)]: tdPadding } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-th-padding': thPadding,
                '--n-td-padding': tdPadding,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-line-height': lineHeight,
                '--n-border-color': borderColor,
                '--n-border-color-modal': borderColorModal,
                '--n-border-color-popover': borderColorPopover,
                '--n-th-color': thColor,
                '--n-th-color-hover': thColorHover,
                '--n-th-color-modal': thColorModal,
                '--n-th-color-hover-modal': thColorHoverModal,
                '--n-th-color-popover': thColorPopover,
                '--n-th-color-hover-popover': thColorHoverPopover,
                '--n-td-color': tdColor,
                '--n-td-color-hover': tdColorHover,
                '--n-td-color-modal': tdColorModal,
                '--n-td-color-hover-modal': tdColorHoverModal,
                '--n-td-color-popover': tdColorPopover,
                '--n-td-color-hover-popover': tdColorHoverPopover,
                '--n-th-text-color': thTextColor,
                '--n-td-text-color': tdTextColor,
                '--n-th-font-weight': thFontWeight,
                '--n-th-button-color-hover': thButtonColorHover,
                '--n-th-icon-color': thIconColor,
                '--n-th-icon-color-active': thIconColorActive,
                '--n-filter-size': filterSize,
                '--n-pagination-margin': paginationMargin,
                '--n-empty-padding': emptyPadding,
                '--n-box-shadow-before': boxShadowBefore,
                '--n-box-shadow-after': boxShadowAfter,
                '--n-sorter-size': sorterSize,
                '--n-resizable-container-size': resizableContainerSize,
                '--n-resizable-size': resizableSize,
                '--n-loading-size': loadingSize,
                '--n-loading-color': loadingColor,
                '--n-opacity-loading': opacityLoading,
                '--n-td-color-striped': tdColorStriped,
                '--n-td-color-striped-modal': tdColorStripedModal,
                '--n-td-color-striped-popover': tdColorStripedPopover,
                '--n-td-color-sorting': tdColorSorting,
                '--n-td-color-sorting-modal': tdColorSortingModal,
                '--n-td-color-sorting-popover': tdColorSortingPopover,
                '--n-th-color-sorting': thColorSorting,
                '--n-th-color-sorting-modal': thColorSortingModal,
                '--n-th-color-sorting-popover': thColorSortingPopover
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('data-table', (0, vue_1.computed)(() => mergedSizeRef.value[0]), cssVarsRef, props)
            : undefined;
        const mergedShowPaginationRef = (0, vue_1.computed)(() => {
            if (!props.pagination)
                return false;
            if (props.paginateSinglePage)
                return true;
            const mergedPagination = mergedPaginationRef.value;
            const { pageCount } = mergedPagination;
            if (pageCount !== undefined)
                return pageCount > 1;
            return (mergedPagination.itemCount
                && mergedPagination.pageSize
                && mergedPagination.itemCount > mergedPagination.pageSize);
        });
        return Object.assign({ mainTableInstRef, mergedClsPrefix: mergedClsPrefixRef, rtlEnabled: rtlEnabledRef, mergedTheme: themeRef, paginatedData: paginatedDataRef, mergedBordered: mergedBorderedRef, mergedBottomBordered: mergedBottomBorderedRef, mergedPagination: mergedPaginationRef, mergedShowPagination: mergedShowPaginationRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
    },
    render() {
        const { mergedClsPrefix, themeClass, onRender, $slots, spinProps } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-data-table`,
                this.rtlEnabled && `${mergedClsPrefix}-data-table--rtl`,
                themeClass,
                {
                    [`${mergedClsPrefix}-data-table--bordered`]: this.mergedBordered,
                    [`${mergedClsPrefix}-data-table--bottom-bordered`]: this.mergedBottomBordered,
                    [`${mergedClsPrefix}-data-table--single-line`]: this.singleLine,
                    [`${mergedClsPrefix}-data-table--single-column`]: this.singleColumn,
                    [`${mergedClsPrefix}-data-table--loading`]: this.loading,
                    [`${mergedClsPrefix}-data-table--flex-height`]: this.flexHeight
                }
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-data-table-wrapper` },
                (0, vue_1.h)(MainTable_1.default, { ref: "mainTableInstRef" })),
            this.mergedShowPagination ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-data-table__pagination` },
                (0, vue_1.h)(pagination_1.NPagination, Object.assign({ theme: this.mergedTheme.peers.Pagination, themeOverrides: this.mergedTheme.peerOverrides.Pagination, disabled: this.loading }, this.mergedPagination)))) : null,
            (0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition" }, {
                default: () => {
                    return this.loading ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-data-table-loading-wrapper` }, (0, _utils_1.resolveSlot)($slots.loading, () => [
                        (0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ clsPrefix: mergedClsPrefix, strokeWidth: 20 }, spinProps))
                    ]))) : null;
                }
            })));
    }
});
