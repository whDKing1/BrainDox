"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPAND_COL_WIDTH = exports.SELECTION_COL_WIDTH = void 0;
exports.getNumberColWidth = getNumberColWidth;
exports.getStringColWidth = getStringColWidth;
exports.getColKey = getColKey;
exports.createShallowClonedObject = createShallowClonedObject;
exports.getFlagOfOrder = getFlagOfOrder;
exports.clampValueFollowCSSRules = clampValueFollowCSSRules;
exports.createCustomWidthStyle = createCustomWidthStyle;
exports.createRowClassName = createRowClassName;
exports.shouldUseArrayInSingleMode = shouldUseArrayInSingleMode;
exports.isColumnSortable = isColumnSortable;
exports.isColumnResizable = isColumnResizable;
exports.isColumnFilterable = isColumnFilterable;
exports.createNextSorter = createNextSorter;
exports.isColumnSorting = isColumnSorting;
exports.generateCsv = generateCsv;
const seemly_1 = require("seemly");
const _utils_1 = require("../../_utils");
exports.SELECTION_COL_WIDTH = 40;
exports.EXPAND_COL_WIDTH = 40;
function getNumberColWidth(col) {
    if (col.type === 'selection') {
        return col.width === undefined ? exports.SELECTION_COL_WIDTH : (0, seemly_1.depx)(col.width);
    }
    if (col.type === 'expand') {
        return col.width === undefined ? exports.EXPAND_COL_WIDTH : (0, seemly_1.depx)(col.width);
    }
    if ('children' in col)
        return undefined;
    if (typeof col.width === 'string') {
        return (0, seemly_1.depx)(col.width);
    }
    return col.width;
}
function getStringColWidth(col) {
    var _a, _b;
    if (col.type === 'selection') {
        return (0, _utils_1.formatLength)((_a = col.width) !== null && _a !== void 0 ? _a : exports.SELECTION_COL_WIDTH);
    }
    if (col.type === 'expand') {
        return (0, _utils_1.formatLength)((_b = col.width) !== null && _b !== void 0 ? _b : exports.EXPAND_COL_WIDTH);
    }
    if ('children' in col) {
        return undefined;
    }
    return (0, _utils_1.formatLength)(col.width);
}
function getColKey(col) {
    if (col.type === 'selection')
        return '__n_selection__';
    if (col.type === 'expand')
        return '__n_expand__';
    return col.key;
}
function createShallowClonedObject(object) {
    if (!object)
        return object;
    if (typeof object === 'object') {
        return Object.assign({}, object);
    }
    return object;
}
function getFlagOfOrder(order) {
    if (order === 'ascend')
        return 1;
    else if (order === 'descend')
        return -1;
    return 0;
}
// priority: min-width > max-width > width
function clampValueFollowCSSRules(value, min, max) {
    if (max !== undefined) {
        value = Math.min(value, typeof max === 'number' ? max : Number.parseFloat(max));
    }
    if (min !== undefined) {
        value = Math.max(value, typeof min === 'number' ? min : Number.parseFloat(min));
    }
    return value;
}
function createCustomWidthStyle(column, resizedWidth) {
    if (resizedWidth !== undefined) {
        return {
            width: resizedWidth,
            minWidth: resizedWidth,
            maxWidth: resizedWidth
        };
    }
    const width = getStringColWidth(column);
    const { minWidth, maxWidth } = column;
    return {
        width,
        minWidth: (0, _utils_1.formatLength)(minWidth) || width,
        maxWidth: (0, _utils_1.formatLength)(maxWidth)
    };
}
function createRowClassName(row, index, rowClassName) {
    if (typeof rowClassName === 'function')
        return rowClassName(row, index);
    return rowClassName || '';
}
// for compatibility
// If column.filterOptionValues or column.defaultFilterOptionValues is set, use
// array value
function shouldUseArrayInSingleMode(column) {
    return (column.filterOptionValues !== undefined
        || (column.filterOptionValue === undefined
            && column.defaultFilterOptionValues !== undefined));
}
function isColumnSortable(column) {
    if ('children' in column)
        return false;
    return !!column.sorter;
}
function isColumnResizable(column) {
    if ('children' in column && !!column.children.length)
        return false;
    return !!column.resizable;
}
function isColumnFilterable(column) {
    if ('children' in column)
        return false;
    return (!!column.filter && (!!column.filterOptions || !!column.renderFilterMenu));
}
function getNextOrderOf(order) {
    if (!order)
        return 'descend';
    else if (order === 'descend')
        return 'ascend';
    return false;
}
function createNextSorter(column, currentSortState) {
    if (column.sorter === undefined)
        return null;
    const { customNextSortOrder } = column;
    if (currentSortState === null || currentSortState.columnKey !== column.key) {
        return {
            columnKey: column.key,
            sorter: column.sorter,
            order: getNextOrderOf(false)
        };
    }
    else {
        return Object.assign(Object.assign({}, currentSortState), { order: (customNextSortOrder || getNextOrderOf)(currentSortState.order) });
    }
}
function isColumnSorting(column, mergedSortState) {
    return (mergedSortState.find(state => state.columnKey === column.key && state.order) !== undefined);
}
function formatCsvCell(value) {
    if (typeof value === 'string') {
        return value.replace(/,/g, '\\,');
    }
    else if (value === null || value === undefined) {
        return '';
    }
    else {
        return `${value}`.replace(/,/g, '\\,');
    }
}
function generateCsv(columns, data, getCsvCell, getCsvHeader) {
    const exportableColumns = columns.filter(column => column.type !== 'expand'
        && column.type !== 'selection'
        && column.allowExport !== false);
    const header = exportableColumns
        .map((col) => {
        return getCsvHeader ? getCsvHeader(col) : col.title;
    })
        .join(',');
    const rows = data.map((row) => {
        return exportableColumns
            .map((col) => {
            return getCsvCell
                ? getCsvCell(row[col.key], row, col)
                : formatCsvCell(row[col.key]);
        })
            .join(',');
    });
    return [header, ...rows].join('\n');
}
