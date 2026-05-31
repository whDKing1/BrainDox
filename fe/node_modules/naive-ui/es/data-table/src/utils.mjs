import { depx } from 'seemly';
import { formatLength } from "../../_utils/index.mjs";
export const SELECTION_COL_WIDTH = 40;
export const EXPAND_COL_WIDTH = 40;
export function getNumberColWidth(col) {
  if (col.type === 'selection') {
    return col.width === undefined ? SELECTION_COL_WIDTH : depx(col.width);
  }
  if (col.type === 'expand') {
    return col.width === undefined ? EXPAND_COL_WIDTH : depx(col.width);
  }
  if ('children' in col) return undefined;
  if (typeof col.width === 'string') {
    return depx(col.width);
  }
  return col.width;
}
export function getStringColWidth(col) {
  var _a, _b;
  if (col.type === 'selection') {
    return formatLength((_a = col.width) !== null && _a !== void 0 ? _a : SELECTION_COL_WIDTH);
  }
  if (col.type === 'expand') {
    return formatLength((_b = col.width) !== null && _b !== void 0 ? _b : EXPAND_COL_WIDTH);
  }
  if ('children' in col) {
    return undefined;
  }
  return formatLength(col.width);
}
export function getColKey(col) {
  if (col.type === 'selection') return '__n_selection__';
  if (col.type === 'expand') return '__n_expand__';
  return col.key;
}
export function createShallowClonedObject(object) {
  if (!object) return object;
  if (typeof object === 'object') {
    return Object.assign({}, object);
  }
  return object;
}
export function getFlagOfOrder(order) {
  if (order === 'ascend') return 1;else if (order === 'descend') return -1;
  return 0;
}
// priority: min-width > max-width > width
export function clampValueFollowCSSRules(value, min, max) {
  if (max !== undefined) {
    value = Math.min(value, typeof max === 'number' ? max : Number.parseFloat(max));
  }
  if (min !== undefined) {
    value = Math.max(value, typeof min === 'number' ? min : Number.parseFloat(min));
  }
  return value;
}
export function createCustomWidthStyle(column, resizedWidth) {
  if (resizedWidth !== undefined) {
    return {
      width: resizedWidth,
      minWidth: resizedWidth,
      maxWidth: resizedWidth
    };
  }
  const width = getStringColWidth(column);
  const {
    minWidth,
    maxWidth
  } = column;
  return {
    width,
    minWidth: formatLength(minWidth) || width,
    maxWidth: formatLength(maxWidth)
  };
}
export function createRowClassName(row, index, rowClassName) {
  if (typeof rowClassName === 'function') return rowClassName(row, index);
  return rowClassName || '';
}
// for compatibility
// If column.filterOptionValues or column.defaultFilterOptionValues is set, use
// array value
export function shouldUseArrayInSingleMode(column) {
  return column.filterOptionValues !== undefined || column.filterOptionValue === undefined && column.defaultFilterOptionValues !== undefined;
}
export function isColumnSortable(column) {
  if ('children' in column) return false;
  return !!column.sorter;
}
export function isColumnResizable(column) {
  if ('children' in column && !!column.children.length) return false;
  return !!column.resizable;
}
export function isColumnFilterable(column) {
  if ('children' in column) return false;
  return !!column.filter && (!!column.filterOptions || !!column.renderFilterMenu);
}
function getNextOrderOf(order) {
  if (!order) return 'descend';else if (order === 'descend') return 'ascend';
  return false;
}
export function createNextSorter(column, currentSortState) {
  if (column.sorter === undefined) return null;
  const {
    customNextSortOrder
  } = column;
  if (currentSortState === null || currentSortState.columnKey !== column.key) {
    return {
      columnKey: column.key,
      sorter: column.sorter,
      order: getNextOrderOf(false)
    };
  } else {
    return Object.assign(Object.assign({}, currentSortState), {
      order: (customNextSortOrder || getNextOrderOf)(currentSortState.order)
    });
  }
}
export function isColumnSorting(column, mergedSortState) {
  return mergedSortState.find(state => state.columnKey === column.key && state.order) !== undefined;
}
function formatCsvCell(value) {
  if (typeof value === 'string') {
    return value.replace(/,/g, '\\,');
  } else if (value === null || value === undefined) {
    return '';
  } else {
    return `${value}`.replace(/,/g, '\\,');
  }
}
export function generateCsv(columns, data, getCsvCell, getCsvHeader) {
  const exportableColumns = columns.filter(column => column.type !== 'expand' && column.type !== 'selection' && column.allowExport !== false);
  const header = exportableColumns.map(col => {
    return getCsvHeader ? getCsvHeader(col) : col.title;
  }).join(',');
  const rows = data.map(row => {
    return exportableColumns.map(col => {
      return getCsvCell ? getCsvCell(row[col.key], row, col) : formatCsvCell(row[col.key]);
    }).join(',');
  });
  return [header, ...rows].join('\n');
}