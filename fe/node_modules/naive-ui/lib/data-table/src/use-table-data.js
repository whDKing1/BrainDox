"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableData = useTableData;
const treemate_1 = require("treemate");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const utils_1 = require("../../pagination/src/utils");
const use_sorter_1 = require("./use-sorter");
const utils_2 = require("./utils");
// useTableData combines filter, sorter and pagination
function useTableData(props, { dataRelatedColsRef }) {
    const selectionColumnRef = (0, vue_1.computed)(() => {
        const getSelectionColumn = (cols) => {
            for (let i = 0; i < cols.length; ++i) {
                const col = cols[i];
                if ('children' in col) {
                    return getSelectionColumn(col.children);
                }
                else if (col.type === 'selection') {
                    return col;
                }
            }
            return null;
        };
        return getSelectionColumn(props.columns);
    });
    const treeMateRef = (0, vue_1.computed)(() => {
        const { childrenKey } = props;
        return (0, treemate_1.createTreeMate)(props.data, {
            ignoreEmptyChildren: true,
            getKey: props.rowKey,
            getChildren: rowData => rowData[childrenKey],
            getDisabled: (rowData) => {
                var _a, _b;
                if ((_b = (_a = selectionColumnRef.value) === null || _a === void 0 ? void 0 : _a.disabled) === null || _b === void 0 ? void 0 : _b.call(_a, rowData)) {
                    return true;
                }
                return false;
            }
        });
    });
    const childTriggerColIndexRef = (0, vooks_1.useMemo)(() => {
        const { columns } = props;
        const { length } = columns;
        let firstContentfulColIndex = null;
        for (let i = 0; i < length; ++i) {
            const col = columns[i];
            if (!col.type && firstContentfulColIndex === null) {
                firstContentfulColIndex = i;
            }
            if ('tree' in col && col.tree) {
                return i;
            }
        }
        return firstContentfulColIndex || 0;
    });
    const uncontrolledFilterStateRef = (0, vue_1.ref)({});
    const { pagination } = props;
    const uncontrolledCurrentPageRef = (0, vue_1.ref)(pagination ? pagination.defaultPage || 1 : 1);
    const uncontrolledPageSizeRef = (0, vue_1.ref)((0, utils_1.getDefaultPageSize)(pagination));
    const mergedFilterStateRef = (0, vue_1.computed)(() => {
        const columnsWithControlledFilter = dataRelatedColsRef.value.filter((column) => {
            return (column.filterOptionValues !== undefined
                || column.filterOptionValue !== undefined);
        });
        const controlledFilterState = {};
        columnsWithControlledFilter.forEach((column) => {
            var _a;
            if (column.type === 'selection' || column.type === 'expand')
                return;
            if (column.filterOptionValues === undefined) {
                controlledFilterState[column.key] = (_a = column.filterOptionValue) !== null && _a !== void 0 ? _a : null;
            }
            else {
                controlledFilterState[column.key] = column.filterOptionValues;
            }
        });
        const activeFilters = Object.assign((0, utils_2.createShallowClonedObject)(uncontrolledFilterStateRef.value), controlledFilterState);
        return activeFilters;
    });
    const filteredDataRef = (0, vue_1.computed)(() => {
        const mergedFilterState = mergedFilterStateRef.value;
        const { columns } = props;
        function createDefaultFilter(columnKey) {
            return (filterOptionValue, row) => !!~String(row[columnKey]).indexOf(String(filterOptionValue));
        }
        const { value: { treeNodes: data } } = treeMateRef;
        const columnEntries = [];
        columns.forEach((column) => {
            if (column.type === 'selection'
                || column.type === 'expand'
                || 'children' in column) {
                return;
            }
            columnEntries.push([column.key, column]);
        });
        return data
            ? data.filter((tmNode) => {
                const { rawNode: row } = tmNode;
                // traverse all filters
                for (const [columnKey, column] of columnEntries) {
                    let activeFilterOptionValues = mergedFilterState[columnKey];
                    if (activeFilterOptionValues == null)
                        continue;
                    if (!Array.isArray(activeFilterOptionValues)) {
                        activeFilterOptionValues = [activeFilterOptionValues];
                    }
                    if (!activeFilterOptionValues.length)
                        continue;
                    // When async, filter won't be set, so data won't be filtered
                    const filter = column.filter === 'default'
                        ? createDefaultFilter(columnKey)
                        : column.filter;
                    if (column && typeof filter === 'function') {
                        if (column.filterMode === 'and') {
                            if (activeFilterOptionValues.some(filterOptionValue => !filter(filterOptionValue, row))) {
                                return false;
                            }
                        }
                        else {
                            if (activeFilterOptionValues.some(filterOptionValue => filter(filterOptionValue, row))) {
                                continue;
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
                return true;
            })
            : [];
    });
    const { sortedDataRef, deriveNextSorter, mergedSortStateRef, sort, clearSorter } = (0, use_sorter_1.useSorter)(props, {
        dataRelatedColsRef,
        filteredDataRef
    });
    // initialize
    dataRelatedColsRef.value.forEach((column) => {
        var _a;
        if (column.filter) {
            const defaultFilterOptionValues = column.defaultFilterOptionValues;
            if (column.filterMultiple) {
                uncontrolledFilterStateRef.value[column.key]
                    = defaultFilterOptionValues || [];
            }
            else if (defaultFilterOptionValues !== undefined) {
                // this branch is for compatibility, someone may use `values` in single filter mode
                uncontrolledFilterStateRef.value[column.key]
                    = defaultFilterOptionValues === null ? [] : defaultFilterOptionValues;
            }
            else {
                uncontrolledFilterStateRef.value[column.key]
                    = (_a = column.defaultFilterOptionValue) !== null && _a !== void 0 ? _a : null;
            }
        }
    });
    const controlledCurrentPageRef = (0, vue_1.computed)(() => {
        const { pagination } = props;
        if (pagination === false)
            return undefined;
        return pagination.page;
    });
    const controlledPageSizeRef = (0, vue_1.computed)(() => {
        const { pagination } = props;
        if (pagination === false)
            return undefined;
        return pagination.pageSize;
    });
    const _mergedCurrentPageRef = (0, vooks_1.useMergedState)(controlledCurrentPageRef, uncontrolledCurrentPageRef);
    const mergedPageSizeRef = (0, vooks_1.useMergedState)(controlledPageSizeRef, uncontrolledPageSizeRef);
    const boundedMergedCurrentPageRef = (0, vooks_1.useMemo)(() => {
        const page = _mergedCurrentPageRef.value;
        return props.remote
            ? page
            : Math.max(1, Math.min(Math.ceil(filteredDataRef.value.length / mergedPageSizeRef.value), page));
    });
    const mergedPageCountRef = (0, vue_1.computed)(() => {
        const { pagination } = props;
        if (pagination) {
            const { pageCount } = pagination;
            if (pageCount !== undefined)
                return pageCount;
        }
        return undefined;
    });
    const paginatedDataRef = (0, vue_1.computed)(() => {
        if (props.remote)
            return treeMateRef.value.treeNodes;
        if (!props.pagination)
            return sortedDataRef.value;
        const pageSize = mergedPageSizeRef.value;
        const startIndex = (boundedMergedCurrentPageRef.value - 1) * pageSize;
        return sortedDataRef.value.slice(startIndex, startIndex + pageSize);
    });
    const rawPaginatedDataRef = (0, vue_1.computed)(() => {
        return paginatedDataRef.value.map(tmNode => tmNode.rawNode);
    });
    function mergedOnUpdatePage(page) {
        const { pagination } = props;
        if (pagination) {
            const { onChange, 'onUpdate:page': _onUpdatePage, onUpdatePage } = pagination;
            if (onChange)
                (0, _utils_1.call)(onChange, page);
            if (onUpdatePage)
                (0, _utils_1.call)(onUpdatePage, page);
            if (_onUpdatePage)
                (0, _utils_1.call)(_onUpdatePage, page);
            doUpdatePage(page);
        }
    }
    function mergedOnUpdatePageSize(pageSize) {
        const { pagination } = props;
        if (pagination) {
            const { onPageSizeChange, 'onUpdate:pageSize': _onUpdatePageSize, onUpdatePageSize } = pagination;
            if (onPageSizeChange)
                (0, _utils_1.call)(onPageSizeChange, pageSize);
            if (onUpdatePageSize)
                (0, _utils_1.call)(onUpdatePageSize, pageSize);
            if (_onUpdatePageSize)
                (0, _utils_1.call)(_onUpdatePageSize, pageSize);
            doUpdatePageSize(pageSize);
        }
    }
    const mergedItemCountRef = (0, vue_1.computed)(() => {
        if (props.remote) {
            const { pagination } = props;
            if (pagination) {
                const { itemCount } = pagination;
                if (itemCount !== undefined)
                    return itemCount;
            }
            return undefined;
        }
        return filteredDataRef.value.length;
    });
    const mergedPaginationRef = (0, vue_1.computed)(() => {
        return Object.assign(Object.assign({}, props.pagination), { 
            // reset deprecated methods
            onChange: undefined, onUpdatePage: undefined, onUpdatePageSize: undefined, onPageSizeChange: undefined, 'onUpdate:page': mergedOnUpdatePage, 'onUpdate:pageSize': mergedOnUpdatePageSize, 
            // writing merged props after pagination to avoid
            // pagination[key] === undefined
            // key still exists but value is undefined
            page: boundedMergedCurrentPageRef.value, pageSize: mergedPageSizeRef.value, pageCount: mergedItemCountRef.value === undefined
                ? mergedPageCountRef.value
                : undefined, itemCount: mergedItemCountRef.value });
    });
    function doUpdatePage(page) {
        const { 'onUpdate:page': _onUpdatePage, onPageChange, onUpdatePage } = props;
        if (onUpdatePage)
            (0, _utils_1.call)(onUpdatePage, page);
        if (_onUpdatePage)
            (0, _utils_1.call)(_onUpdatePage, page);
        if (onPageChange)
            (0, _utils_1.call)(onPageChange, page);
        uncontrolledCurrentPageRef.value = page;
    }
    function doUpdatePageSize(pageSize) {
        const { 'onUpdate:pageSize': _onUpdatePageSize, onPageSizeChange, onUpdatePageSize } = props;
        if (onPageSizeChange)
            (0, _utils_1.call)(onPageSizeChange, pageSize);
        if (onUpdatePageSize)
            (0, _utils_1.call)(onUpdatePageSize, pageSize);
        if (_onUpdatePageSize)
            (0, _utils_1.call)(_onUpdatePageSize, pageSize);
        uncontrolledPageSizeRef.value = pageSize;
    }
    function doUpdateFilters(filters, sourceColumn) {
        const { onUpdateFilters, 'onUpdate:filters': _onUpdateFilters, onFiltersChange } = props;
        if (onUpdateFilters)
            (0, _utils_1.call)(onUpdateFilters, filters, sourceColumn);
        if (_onUpdateFilters)
            (0, _utils_1.call)(_onUpdateFilters, filters, sourceColumn);
        if (onFiltersChange)
            (0, _utils_1.call)(onFiltersChange, filters, sourceColumn);
        uncontrolledFilterStateRef.value = filters;
    }
    function onUnstableColumnResize(resizedWidth, limitedWidth, column, getColumnWidth) {
        var _a;
        (_a = props.onUnstableColumnResize) === null || _a === void 0 ? void 0 : _a.call(props, resizedWidth, limitedWidth, column, getColumnWidth);
    }
    function page(page) {
        doUpdatePage(page);
    }
    function clearFilter() {
        clearFilters();
    }
    function clearFilters() {
        filters({});
    }
    function filters(filters) {
        filter(filters);
    }
    function filter(filters) {
        if (!filters) {
            uncontrolledFilterStateRef.value = {};
        }
        else if (filters) {
            uncontrolledFilterStateRef.value = (0, utils_2.createShallowClonedObject)(filters);
        }
        else if (process.env.NODE_ENV !== 'production') {
            (0, _utils_1.warn)('data-table', '`filters` is not an object');
        }
    }
    return {
        treeMateRef,
        mergedCurrentPageRef: boundedMergedCurrentPageRef,
        mergedPaginationRef,
        paginatedDataRef,
        rawPaginatedDataRef,
        mergedFilterStateRef,
        mergedSortStateRef,
        hoverKeyRef: (0, vue_1.ref)(null),
        selectionColumnRef,
        childTriggerColIndexRef,
        doUpdateFilters,
        deriveNextSorter,
        doUpdatePageSize,
        doUpdatePage,
        onUnstableColumnResize,
        // exported methods
        filter,
        filters,
        clearFilter,
        clearFilters,
        clearSorter,
        page,
        sort
    };
}
