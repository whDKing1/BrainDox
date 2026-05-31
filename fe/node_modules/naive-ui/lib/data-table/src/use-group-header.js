"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGroupHeader = useGroupHeader;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const utils_1 = require("./utils");
function getRowsAndCols(columns, getResizableWidth) {
    const rows = [];
    const cols = [];
    const dataRelatedCols = [];
    const rowItemMap = new WeakMap();
    let maxDepth = -1;
    let totalRowSpan = 0;
    let hasEllipsis = false;
    let currentLeafIndex = 0;
    function ensureMaxDepth(columns, currentDepth) {
        if (currentDepth > maxDepth) {
            rows[currentDepth] = [];
            maxDepth = currentDepth;
        }
        columns.forEach((column) => {
            if ('children' in column) {
                ensureMaxDepth(column.children, currentDepth + 1);
            }
            else {
                const key = 'key' in column ? column.key : undefined;
                cols.push({
                    key: (0, utils_1.getColKey)(column),
                    style: (0, utils_1.createCustomWidthStyle)(column, key !== undefined ? (0, _utils_1.formatLength)(getResizableWidth(key)) : undefined),
                    column,
                    index: currentLeafIndex++,
                    // The width property is only applied to horizontally virtual scroll table
                    width: column.width === undefined ? 128 : Number(column.width)
                });
                totalRowSpan += 1;
                if (!hasEllipsis) {
                    hasEllipsis = !!column.ellipsis;
                }
                dataRelatedCols.push(column);
            }
        });
    }
    ensureMaxDepth(columns, 0);
    currentLeafIndex = 0;
    function ensureColLayout(columns, currentDepth) {
        let hideUntilIndex = 0;
        columns.forEach((column) => {
            var _a;
            if ('children' in column) {
                // do not allow colSpan > 1 for non-leaf th
                // we will execute the calculation logic
                const cachedCurrentLeafIndex = currentLeafIndex;
                const rowItem = {
                    column,
                    colIndex: currentLeafIndex,
                    colSpan: 0,
                    rowSpan: 1,
                    isLast: false
                };
                ensureColLayout(column.children, currentDepth + 1);
                column.children.forEach((childColumn) => {
                    var _a, _b;
                    rowItem.colSpan += (_b = (_a = rowItemMap.get(childColumn)) === null || _a === void 0 ? void 0 : _a.colSpan) !== null && _b !== void 0 ? _b : 0;
                });
                if (cachedCurrentLeafIndex + rowItem.colSpan === totalRowSpan) {
                    rowItem.isLast = true;
                }
                rowItemMap.set(column, rowItem);
                rows[currentDepth].push(rowItem);
            }
            else {
                if (currentLeafIndex < hideUntilIndex) {
                    currentLeafIndex += 1;
                    return;
                }
                let colSpan = 1;
                if ('titleColSpan' in column) {
                    colSpan = (_a = column.titleColSpan) !== null && _a !== void 0 ? _a : 1;
                }
                if (colSpan > 1) {
                    hideUntilIndex = currentLeafIndex + colSpan;
                }
                const isLast = currentLeafIndex + colSpan === totalRowSpan;
                const rowItem = {
                    column,
                    colSpan,
                    colIndex: currentLeafIndex,
                    rowSpan: maxDepth - currentDepth + 1,
                    isLast
                };
                rowItemMap.set(column, rowItem);
                rows[currentDepth].push(rowItem);
                currentLeafIndex += 1;
            }
        });
    }
    ensureColLayout(columns, 0);
    return {
        hasEllipsis,
        rows,
        cols,
        dataRelatedCols
    };
}
function useGroupHeader(props, getResizableWidth) {
    const rowsAndCols = (0, vue_1.computed)(() => getRowsAndCols(props.columns, getResizableWidth));
    return {
        rowsRef: (0, vue_1.computed)(() => rowsAndCols.value.rows),
        colsRef: (0, vue_1.computed)(() => rowsAndCols.value.cols),
        hasEllipsisRef: (0, vue_1.computed)(() => rowsAndCols.value.hasEllipsis),
        dataRelatedColsRef: (0, vue_1.computed)(() => rowsAndCols.value.dataRelatedCols)
    };
}
