import { happensIn, pxfy } from 'seemly';
import { defineComponent, Fragment, h, inject, ref } from 'vue';
import { VVirtualList } from 'vueuc';
import { formatLength } from "../../../_utils/index.mjs";
import { NCheckbox } from "../../../checkbox/index.mjs";
import { NEllipsis } from "../../../ellipsis/index.mjs";
import FilterButton from "../HeaderButton/FilterButton.mjs";
import ResizeButton from "../HeaderButton/ResizeButton.mjs";
import SortButton from "../HeaderButton/SortButton.mjs";
import { dataTableInjectionKey } from "../interface.mjs";
import { clampValueFollowCSSRules, createNextSorter, getColKey, isColumnFilterable, isColumnResizable, isColumnSortable, isColumnSorting } from "../utils.mjs";
import SelectionMenu from "./SelectionMenu.mjs";
function renderTitle(column) {
  return typeof column.title === 'function' ? column.title(column) : column.title;
}
const VirtualListItemWrapper = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    width: String
  },
  render() {
    const {
      clsPrefix,
      id,
      cols,
      width
    } = this;
    return h("table", {
      style: {
        tableLayout: 'fixed',
        width
      },
      class: `${clsPrefix}-data-table-table`
    }, h("colgroup", null, cols.map(col => h("col", {
      key: col.key,
      style: col.style
    }))), h("thead", {
      "data-n-id": id,
      class: `${clsPrefix}-data-table-thead`
    }, this.$slots));
  }
});
export default defineComponent({
  name: 'DataTableHeader',
  props: {
    discrete: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const {
      mergedClsPrefixRef,
      scrollXRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      allRowsCheckedRef,
      someRowsCheckedRef,
      rowsRef,
      colsRef,
      mergedThemeRef,
      checkOptionsRef,
      mergedSortStateRef,
      componentId,
      mergedTableLayoutRef,
      headerCheckboxDisabledRef,
      virtualScrollHeaderRef,
      headerHeightRef,
      onUnstableColumnResize,
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll
    } = inject(dataTableInjectionKey);
    const virtualListRef = ref();
    const cellElsRef = ref({});
    function getCellActualWidth(key) {
      const element = cellElsRef.value[key];
      return element === null || element === void 0 ? void 0 : element.getBoundingClientRect().width;
    }
    function handleCheckboxUpdateChecked() {
      if (allRowsCheckedRef.value) {
        doUncheckAll();
      } else {
        doCheckAll();
      }
    }
    function handleColHeaderClick(e, column) {
      if (happensIn(e, 'dataTableFilter') || happensIn(e, 'dataTableResizable')) {
        return;
      }
      if (!isColumnSortable(column)) return;
      const activeSorter = mergedSortStateRef.value.find(state => state.columnKey === column.key) || null;
      const nextSorter = createNextSorter(column, activeSorter);
      deriveNextSorter(nextSorter);
    }
    const resizeStartWidthMap = new Map();
    function handleColumnResizeStart(column) {
      resizeStartWidthMap.set(column.key, getCellActualWidth(column.key));
    }
    function handleColumnResize(column, displacementX) {
      const startWidth = resizeStartWidthMap.get(column.key);
      if (startWidth === undefined) {
        return;
      }
      const widthAfterResize = startWidth + displacementX;
      const limitWidth = clampValueFollowCSSRules(widthAfterResize, column.minWidth, column.maxWidth);
      onUnstableColumnResize(widthAfterResize, limitWidth, column, getCellActualWidth);
      doUpdateResizableWidth(column, limitWidth);
    }
    return {
      cellElsRef,
      componentId,
      mergedSortState: mergedSortStateRef,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollX: scrollXRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      allRowsChecked: allRowsCheckedRef,
      someRowsChecked: someRowsCheckedRef,
      rows: rowsRef,
      cols: colsRef,
      mergedTheme: mergedThemeRef,
      checkOptions: checkOptionsRef,
      mergedTableLayout: mergedTableLayoutRef,
      headerCheckboxDisabled: headerCheckboxDisabledRef,
      headerHeight: headerHeightRef,
      virtualScrollHeader: virtualScrollHeaderRef,
      virtualListRef,
      handleCheckboxUpdateChecked,
      handleColHeaderClick,
      handleTableHeaderScroll,
      handleColumnResizeStart,
      handleColumnResize
    };
  },
  render() {
    const {
      cellElsRef,
      mergedClsPrefix,
      fixedColumnLeftMap,
      fixedColumnRightMap,
      currentPage,
      allRowsChecked,
      someRowsChecked,
      rows,
      cols,
      mergedTheme,
      checkOptions,
      componentId,
      discrete,
      mergedTableLayout,
      headerCheckboxDisabled,
      mergedSortState,
      virtualScrollHeader,
      handleColHeaderClick,
      handleCheckboxUpdateChecked,
      handleColumnResizeStart,
      handleColumnResize
    } = this;
    let hasEllipsis = false;
    const renderRow = (row, getLeft, headerHeightPx) => row.map(({
      column,
      colIndex,
      colSpan,
      rowSpan,
      isLast
    }) => {
      var _a, _b;
      const key = getColKey(column);
      const {
        ellipsis
      } = column;
      if (!hasEllipsis && ellipsis) hasEllipsis = true;
      const createColumnVNode = () => {
        if (column.type === 'selection') {
          return column.multiple !== false ? h(Fragment, null, h(NCheckbox, {
            key: currentPage,
            privateInsideTable: true,
            checked: allRowsChecked,
            indeterminate: someRowsChecked,
            disabled: headerCheckboxDisabled,
            onUpdateChecked: handleCheckboxUpdateChecked
          }), checkOptions ? h(SelectionMenu, {
            clsPrefix: mergedClsPrefix
          }) : null) : null;
        }
        return h(Fragment, null, h("div", {
          class: `${mergedClsPrefix}-data-table-th__title-wrapper`
        }, h("div", {
          class: `${mergedClsPrefix}-data-table-th__title`
        }, ellipsis === true || ellipsis && !ellipsis.tooltip ? h("div", {
          class: `${mergedClsPrefix}-data-table-th__ellipsis`
        }, renderTitle(column)) : ellipsis && typeof ellipsis === 'object' ? h(NEllipsis, Object.assign({}, ellipsis, {
          theme: mergedTheme.peers.Ellipsis,
          themeOverrides: mergedTheme.peerOverrides.Ellipsis
        }), {
          default: () => renderTitle(column)
        }) : renderTitle(column)), isColumnSortable(column) ? h(SortButton, {
          column: column
        }) : null), isColumnFilterable(column) ? h(FilterButton, {
          column: column,
          options: column.filterOptions
        }) : null, isColumnResizable(column) ? h(ResizeButton, {
          onResizeStart: () => {
            handleColumnResizeStart(column);
          },
          onResize: displacementX => {
            handleColumnResize(column, displacementX);
          }
        }) : null);
      };
      const leftFixed = key in fixedColumnLeftMap;
      const rightFixed = key in fixedColumnRightMap;
      const CellComponent = getLeft && !column.fixed ? 'div' : 'th';
      return h(CellComponent, {
        ref: el => cellElsRef[key] = el,
        key: key,
        style: [getLeft && !column.fixed ? {
          position: 'absolute',
          left: pxfy(getLeft(colIndex)),
          top: 0,
          bottom: 0
        } : {
          left: pxfy((_a = fixedColumnLeftMap[key]) === null || _a === void 0 ? void 0 : _a.start),
          right: pxfy((_b = fixedColumnRightMap[key]) === null || _b === void 0 ? void 0 : _b.start)
        }, {
          width: pxfy(column.width),
          textAlign: column.titleAlign || column.align,
          height: headerHeightPx
        }],
        colspan: colSpan,
        rowspan: rowSpan,
        "data-col-key": key,
        class: [`${mergedClsPrefix}-data-table-th`, (leftFixed || rightFixed) && `${mergedClsPrefix}-data-table-th--fixed-${leftFixed ? 'left' : 'right'}`, {
          [`${mergedClsPrefix}-data-table-th--sorting`]: isColumnSorting(column, mergedSortState),
          [`${mergedClsPrefix}-data-table-th--filterable`]: isColumnFilterable(column),
          [`${mergedClsPrefix}-data-table-th--sortable`]: isColumnSortable(column),
          [`${mergedClsPrefix}-data-table-th--selection`]: column.type === 'selection',
          [`${mergedClsPrefix}-data-table-th--last`]: isLast
        }, column.className],
        onClick: column.type !== 'selection' && column.type !== 'expand' && !('children' in column) ? e => {
          handleColHeaderClick(e, column);
        } : undefined
      }, createColumnVNode());
    });
    if (virtualScrollHeader) {
      const {
        headerHeight
      } = this;
      let leftFixedColsCount = 0;
      let rightFixedColsCount = 0;
      cols.forEach(col => {
        if (col.column.fixed === 'left') {
          leftFixedColsCount++;
        } else if (col.column.fixed === 'right') {
          rightFixedColsCount++;
        }
      });
      return h(VVirtualList, {
        ref: "virtualListRef",
        class: `${mergedClsPrefix}-data-table-base-table-header`,
        style: {
          height: pxfy(headerHeight)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: cols,
        itemSize: headerHeight,
        showScrollbar: false,
        items: [{}],
        itemResizable: false,
        visibleItemsTag: VirtualListItemWrapper,
        visibleItemsProps: {
          clsPrefix: mergedClsPrefix,
          id: componentId,
          cols,
          width: formatLength(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex,
          endColIndex,
          getLeft
        }) => {
          const row = cols.map((col, index) => {
            return {
              column: col.column,
              isLast: index === cols.length - 1,
              colIndex: col.index,
              colSpan: 1,
              rowSpan: 1
            };
          }).filter(({
            column
          }, index) => {
            if (startColIndex <= index && index <= endColIndex) {
              return true;
            }
            if (column.fixed) {
              return true;
            }
            return false;
          });
          const cells = renderRow(row, getLeft, pxfy(headerHeight));
          cells.splice(leftFixedColsCount, 0, h("th", {
            colspan: cols.length - leftFixedColsCount - rightFixedColsCount,
            style: {
              pointerEvents: 'none',
              visibility: 'hidden',
              height: 0
            }
          }));
          return h("tr", {
            style: {
              position: 'relative'
            }
          }, cells);
        }
      }, {
        default: ({
          renderedItemWithCols
        }) => renderedItemWithCols
      });
    }
    const theadVNode = h("thead", {
      class: `${mergedClsPrefix}-data-table-thead`,
      "data-n-id": componentId
    }, rows.map(row => {
      return h("tr", {
        class: `${mergedClsPrefix}-data-table-tr`
      }, renderRow(row, null, undefined));
    }));
    if (!discrete) {
      return theadVNode;
    }
    const {
      handleTableHeaderScroll,
      scrollX
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-data-table-base-table-header`,
      onScroll: handleTableHeaderScroll
    }, h("table", {
      class: `${mergedClsPrefix}-data-table-table`,
      style: {
        minWidth: formatLength(scrollX),
        tableLayout: mergedTableLayout
      }
    }, h("colgroup", null, cols.map(col => h("col", {
      key: col.key,
      style: col.style
    }))), theadVNode));
  }
});