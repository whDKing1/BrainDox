"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTableInjectionKey = exports.dataTableProps = void 0;
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
exports.dataTableProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { onUnstableColumnResize: Function, pagination: {
        type: [Object, Boolean],
        default: false
    }, paginateSinglePage: {
        type: Boolean,
        default: true
    }, minHeight: [Number, String], maxHeight: [Number, String], 
    // Use any type as row data to make prop data acceptable
    columns: {
        type: Array,
        default: () => []
    }, rowClassName: [String, Function], rowProps: Function, rowKey: Function, summary: [Function], data: {
        type: Array,
        default: () => []
    }, loading: Boolean, bordered: {
        type: Boolean,
        default: undefined
    }, bottomBordered: {
        type: Boolean,
        default: undefined
    }, striped: Boolean, scrollX: [Number, String], defaultCheckedRowKeys: {
        type: Array,
        default: () => []
    }, checkedRowKeys: Array, singleLine: {
        type: Boolean,
        default: true
    }, singleColumn: Boolean, size: String, remote: Boolean, defaultExpandedRowKeys: {
        type: Array,
        default: []
    }, defaultExpandAll: Boolean, expandedRowKeys: Array, stickyExpandedRows: Boolean, virtualScroll: Boolean, virtualScrollX: Boolean, virtualScrollHeader: Boolean, headerHeight: { type: Number, default: 28 }, heightForRow: Function, minRowHeight: { type: Number, default: 28 }, tableLayout: {
        type: String,
        default: 'auto'
    }, allowCheckingNotLoaded: Boolean, cascade: {
        type: Boolean,
        default: true
    }, childrenKey: {
        type: String,
        default: 'children'
    }, indent: {
        type: Number,
        default: 16
    }, flexHeight: Boolean, summaryPlacement: {
        type: String,
        default: 'bottom'
    }, paginationBehaviorOnFilter: {
        type: String,
        default: 'current'
    }, filterIconPopoverProps: Object, scrollbarProps: Object, renderCell: Function, renderExpandIcon: Function, spinProps: Object, getCsvCell: Function, getCsvHeader: Function, onLoad: Function, 'onUpdate:page': [Function, Array], onUpdatePage: [Function, Array], 'onUpdate:pageSize': [Function, Array], onUpdatePageSize: [Function, Array], 'onUpdate:sorter': [Function, Array], onUpdateSorter: [Function, Array], 'onUpdate:filters': [Function, Array], onUpdateFilters: [Function, Array], 'onUpdate:checkedRowKeys': [Function, Array], onUpdateCheckedRowKeys: [Function, Array], 'onUpdate:expandedRowKeys': [Function, Array], onUpdateExpandedRowKeys: [Function, Array], onScroll: Function, 
    // deprecated
    onPageChange: [Function, Array], onPageSizeChange: [Function, Array], onSorterChange: [Function, Array], onFiltersChange: [Function, Array], onCheckedRowKeysChange: [Function, Array] });
exports.dataTableInjectionKey = (0, _utils_1.createInjectionKey)('n-data-table');
