import { pxfy, repeat } from 'seemly';
import { useMemo } from 'vooks';
import { computed, defineComponent, Fragment, h, inject, onUnmounted, ref, watchEffect } from 'vue';
import { VirtualList, VResizeObserver } from 'vueuc';
import { NScrollbar } from "../../../_internal/index.mjs";
import { cssrAnchorMetaName } from "../../../_mixins/common.mjs";
import { formatLength, resolveSlot, warn } from "../../../_utils/index.mjs";
import { c } from "../../../_utils/cssr/index.mjs";
import { configProviderInjectionKey } from "../../../config-provider/src/context.mjs";
import { NEmpty } from "../../../empty/index.mjs";
import { dataTableInjectionKey } from "../interface.mjs";
import { createRowClassName, getColKey, isColumnSorting } from "../utils.mjs";
import RenderSafeCheckbox from "./BodyCheckbox.mjs";
import RenderSafeRadio from "./BodyRadio.mjs";
import Cell from "./Cell.mjs";
import ExpandTrigger from "./ExpandTrigger.mjs";
import TableHeader from "./Header.mjs";
function flatten(rowInfos, expandedRowKeys) {
  const fRows = [];
  function traverse(rs, rootIndex) {
    rs.forEach(r => {
      if (r.children && expandedRowKeys.has(r.key)) {
        fRows.push({
          tmNode: r,
          striped: false,
          key: r.key,
          index: rootIndex
        });
        traverse(r.children, rootIndex);
      } else {
        fRows.push({
          key: r.key,
          tmNode: r,
          striped: false,
          index: rootIndex
        });
      }
    });
  }
  rowInfos.forEach(rowInfo => {
    fRows.push(rowInfo);
    const {
      children
    } = rowInfo.tmNode;
    if (children && expandedRowKeys.has(rowInfo.key)) {
      traverse(children, rowInfo.index);
    }
  });
  return fRows;
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
    onMouseenter: Function,
    onMouseleave: Function
  },
  render() {
    const {
      clsPrefix,
      id,
      cols,
      onMouseenter,
      onMouseleave
    } = this;
    return h("table", {
      style: {
        tableLayout: 'fixed'
      },
      class: `${clsPrefix}-data-table-table`,
      onMouseenter: onMouseenter,
      onMouseleave: onMouseleave
    }, h("colgroup", null, cols.map(col => h("col", {
      key: col.key,
      style: col.style
    }))), h("tbody", {
      "data-n-id": id,
      class: `${clsPrefix}-data-table-tbody`
    }, this.$slots));
  }
});
export default defineComponent({
  name: 'DataTableBody',
  props: {
    onResize: Function,
    showHeader: Boolean,
    flexHeight: Boolean,
    bodyStyle: Object
  },
  setup(props) {
    const {
      slots: dataTableSlots,
      bodyWidthRef,
      mergedExpandedRowKeysRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      scrollXRef,
      colsRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      rowClassNameRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      renderExpandRef,
      hoverKeyRef,
      summaryRef,
      mergedSortStateRef,
      virtualScrollRef,
      virtualScrollXRef,
      heightForRowRef,
      minRowHeightRef,
      componentId,
      mergedTableLayoutRef,
      childTriggerColIndexRef,
      indentRef,
      rowPropsRef,
      stripedRef,
      loadingRef,
      onLoadRef,
      loadingKeySetRef,
      expandableRef,
      stickyExpandedRowsRef,
      renderExpandIconRef,
      summaryPlacementRef,
      treeMateRef,
      scrollbarPropsRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doCheck,
      doUncheck,
      renderCell,
      xScrollableRef,
      explicitlyScrollableRef
    } = inject(dataTableInjectionKey);
    const NConfigProvider = inject(configProviderInjectionKey);
    const scrollbarInstRef = ref(null);
    const virtualListRef = ref(null);
    const emptyElRef = ref(null);
    const mergedRenderEmptyRef = computed(() => {
      var _a, _b;
      return (_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderEmpty;
    });
    const emptyRef = useMemo(() => paginatedDataRef.value.length === 0);
    const shouldDisplayVirtualListRef = useMemo(() => virtualScrollRef.value && !emptyRef.value);
    let lastSelectedKey = '';
    const mergedExpandedRowKeySetRef = computed(() => {
      return new Set(mergedExpandedRowKeysRef.value);
    });
    function getRowInfo(key) {
      var _a;
      return (_a = treeMateRef.value.getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode;
    }
    function handleCheckboxUpdateChecked(tmNode, checked, shiftKey) {
      const rowInfo = getRowInfo(tmNode.key);
      if (!rowInfo) {
        warn('data-table', `fail to get row data with key ${tmNode.key}`);
        return;
      }
      if (shiftKey) {
        const lastIndex = paginatedDataRef.value.findIndex(item => item.key === lastSelectedKey);
        if (lastIndex !== -1) {
          const currentIndex = paginatedDataRef.value.findIndex(item => item.key === tmNode.key);
          const start = Math.min(lastIndex, currentIndex);
          const end = Math.max(lastIndex, currentIndex);
          const rowKeysToCheck = [];
          paginatedDataRef.value.slice(start, end + 1).forEach(r => {
            if (!r.disabled) {
              rowKeysToCheck.push(r.key);
            }
          });
          if (checked) {
            doCheck(rowKeysToCheck, false, rowInfo);
          } else {
            doUncheck(rowKeysToCheck, rowInfo);
          }
          lastSelectedKey = tmNode.key;
          return;
        }
      }
      if (checked) {
        doCheck(tmNode.key, false, rowInfo);
      } else {
        doUncheck(tmNode.key, rowInfo);
      }
      lastSelectedKey = tmNode.key;
    }
    function handleRadioUpdateChecked(tmNode) {
      const rowInfo = getRowInfo(tmNode.key);
      if (!rowInfo) {
        warn('data-table', `fail to get row data with key ${tmNode.key}`);
        return;
      }
      doCheck(tmNode.key, true, rowInfo);
    }
    function getScrollContainer() {
      if (shouldDisplayVirtualListRef.value) {
        return virtualListContainer();
      }
      const {
        value
      } = scrollbarInstRef;
      if (value) return value.containerRef;
      return null;
    }
    // For table row with children, tmNode is non-nullable
    // For table row is expandable but is not tree data, tmNode is null
    function handleUpdateExpanded(key, tmNode) {
      var _a;
      if (loadingKeySetRef.value.has(key)) return;
      const {
        value: mergedExpandedRowKeys
      } = mergedExpandedRowKeysRef;
      const index = mergedExpandedRowKeys.indexOf(key);
      const nextExpandedKeys = Array.from(mergedExpandedRowKeys);
      if (~index) {
        nextExpandedKeys.splice(index, 1);
        doUpdateExpandedRowKeys(nextExpandedKeys);
      } else {
        if (tmNode && !tmNode.isLeaf && !tmNode.shallowLoaded) {
          loadingKeySetRef.value.add(key);
          void ((_a = onLoadRef.value) === null || _a === void 0 ? void 0 : _a.call(onLoadRef, tmNode.rawNode).then(() => {
            const {
              value: futureMergedExpandedRowKeys
            } = mergedExpandedRowKeysRef;
            const futureNextExpandedKeys = Array.from(futureMergedExpandedRowKeys);
            const index = futureNextExpandedKeys.indexOf(key);
            if (!~index) {
              futureNextExpandedKeys.push(key);
            }
            doUpdateExpandedRowKeys(futureNextExpandedKeys);
          }).finally(() => {
            loadingKeySetRef.value.delete(key);
          }));
        } else {
          nextExpandedKeys.push(key);
          doUpdateExpandedRowKeys(nextExpandedKeys);
        }
      }
    }
    function handleMouseleaveTable() {
      hoverKeyRef.value = null;
    }
    function virtualListContainer() {
      const {
        value
      } = virtualListRef;
      return (value === null || value === void 0 ? void 0 : value.listElRef) || null;
    }
    function virtualListContent() {
      const {
        value
      } = virtualListRef;
      return (value === null || value === void 0 ? void 0 : value.itemsElRef) || null;
    }
    function handleVirtualListScroll(e) {
      var _a;
      handleTableBodyScroll(e);
      (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    function handleVirtualListResize(e) {
      var _a;
      const {
        onResize
      } = props;
      if (onResize) onResize(e);
      (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    const exposedMethods = {
      getScrollContainer,
      scrollTo(arg0, arg1) {
        var _a, _b;
        if (virtualScrollRef.value) {
          (_a = virtualListRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
        } else {
          (_b = scrollbarInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo(arg0, arg1);
        }
      }
    };
    // manually control shadow style to avoid rerender
    const style = c([({
      props: cProps
    }) => {
      const createActiveLeftFixedStyle = leftActiveFixedColKey => {
        if (leftActiveFixedColKey === null) return null;
        return c(`[data-n-id="${cProps.componentId}"] [data-col-key="${leftActiveFixedColKey}"]::after`, {
          boxShadow: 'var(--n-box-shadow-after)'
        });
      };
      const createActiveRightFixedStyle = rightActiveFixedColKey => {
        if (rightActiveFixedColKey === null) return null;
        return c(`[data-n-id="${cProps.componentId}"] [data-col-key="${rightActiveFixedColKey}"]::before`, {
          boxShadow: 'var(--n-box-shadow-before)'
        });
      };
      return c([createActiveLeftFixedStyle(cProps.leftActiveFixedColKey), createActiveRightFixedStyle(cProps.rightActiveFixedColKey), cProps.leftActiveFixedChildrenColKeys.map(leftActiveFixedColKey => createActiveLeftFixedStyle(leftActiveFixedColKey)), cProps.rightActiveFixedChildrenColKeys.map(rightActiveFixedColKey => createActiveRightFixedStyle(rightActiveFixedColKey))]);
    }]);
    let fixedStyleMounted = false;
    watchEffect(() => {
      const {
        value: leftActiveFixedColKey
      } = leftActiveFixedColKeyRef;
      const {
        value: leftActiveFixedChildrenColKeys
      } = leftActiveFixedChildrenColKeysRef;
      const {
        value: rightActiveFixedColKey
      } = rightActiveFixedColKeyRef;
      const {
        value: rightActiveFixedChildrenColKeys
      } = rightActiveFixedChildrenColKeysRef;
      if (!fixedStyleMounted && leftActiveFixedColKey === null && rightActiveFixedColKey === null) {
        return;
      }
      const cProps = {
        leftActiveFixedColKey,
        leftActiveFixedChildrenColKeys,
        rightActiveFixedColKey,
        rightActiveFixedChildrenColKeys,
        componentId
      };
      style.mount({
        id: `n-${componentId}`,
        force: true,
        props: cProps,
        anchorMetaName: cssrAnchorMetaName,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
      fixedStyleMounted = true;
    });
    onUnmounted(() => {
      style.unmount({
        id: `n-${componentId}`,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
    });
    return Object.assign({
      bodyWidth: bodyWidthRef,
      summaryPlacement: summaryPlacementRef,
      dataTableSlots,
      componentId,
      scrollbarInstRef,
      virtualListRef,
      emptyElRef,
      summary: summaryRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      mergedRenderEmpty: mergedRenderEmptyRef,
      scrollX: scrollXRef,
      cols: colsRef,
      loading: loadingRef,
      shouldDisplayVirtualList: shouldDisplayVirtualListRef,
      empty: emptyRef,
      paginatedDataAndInfo: computed(() => {
        const {
          value: striped
        } = stripedRef;
        let hasChildren = false;
        const data = paginatedDataRef.value.map(striped ? (tmNode, index) => {
          if (!tmNode.isLeaf) hasChildren = true;
          return {
            tmNode,
            key: tmNode.key,
            striped: index % 2 === 1,
            index
          };
        } : (tmNode, index) => {
          if (!tmNode.isLeaf) hasChildren = true;
          return {
            tmNode,
            key: tmNode.key,
            striped: false,
            index
          };
        });
        return {
          data,
          hasChildren
        };
      }),
      rawPaginatedData: rawPaginatedDataRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeySet: mergedExpandedRowKeySetRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
      virtualScrollX: virtualScrollXRef,
      heightForRow: heightForRowRef,
      minRowHeight: minRowHeightRef,
      mergedTableLayout: mergedTableLayoutRef,
      childTriggerColIndex: childTriggerColIndexRef,
      indent: indentRef,
      rowProps: rowPropsRef,
      loadingKeySet: loadingKeySetRef,
      expandable: expandableRef,
      stickyExpandedRows: stickyExpandedRowsRef,
      renderExpandIcon: renderExpandIconRef,
      scrollbarProps: scrollbarPropsRef,
      setHeaderScrollLeft,
      handleVirtualListScroll,
      handleVirtualListResize,
      handleMouseleaveTable,
      virtualListContainer,
      virtualListContent,
      handleTableBodyScroll,
      handleCheckboxUpdateChecked,
      handleRadioUpdateChecked,
      handleUpdateExpanded,
      renderCell,
      explicitlyScrollable: explicitlyScrollableRef,
      xScrollable: xScrollableRef
    }, exposedMethods);
  },
  render() {
    const {
      mergedTheme,
      scrollX,
      mergedClsPrefix,
      explicitlyScrollable,
      xScrollable,
      loadingKeySet,
      onResize,
      setHeaderScrollLeft,
      empty,
      shouldDisplayVirtualList
    } = this;
    const contentStyle = {
      minWidth: formatLength(scrollX) || '100%'
    };
    if (scrollX) contentStyle.width = '100%';
    const createEmptyNode = () => h("div", {
      class: [`${mergedClsPrefix}-data-table-empty`, this.loading && `${mergedClsPrefix}-data-table-empty--hide`],
      style: [this.bodyStyle, xScrollable ? 'position: sticky; left: 0; width: var(--n-scrollbar-current-width);' : undefined],
      ref: "emptyElRef"
    }, resolveSlot(this.dataTableSlots.empty, () => {
      var _a;
      return [((_a = this.mergedRenderEmpty) === null || _a === void 0 ? void 0 : _a.call(this)) || h(NEmpty, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })];
    }));
    const tableNode = h(NScrollbar, Object.assign({}, this.scrollbarProps, {
      ref: "scrollbarInstRef",
      scrollable: explicitlyScrollable || xScrollable,
      class: `${mergedClsPrefix}-data-table-base-table-body`,
      style: !empty ? this.bodyStyle : 'height: initial;',
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      contentStyle: contentStyle,
      container: shouldDisplayVirtualList ? this.virtualListContainer : undefined,
      content: shouldDisplayVirtualList ? this.virtualListContent : undefined,
      horizontalRailStyle: {
        zIndex: 3
      },
      verticalRailStyle: {
        zIndex: 3
      },
      internalExposeWidthCssVar: xScrollable && empty,
      xScrollable: xScrollable,
      onScroll: shouldDisplayVirtualList ? undefined : this.handleTableBodyScroll,
      internalOnUpdateScrollLeft: setHeaderScrollLeft,
      onResize: onResize
    }), {
      default: () => {
        if (this.empty && !this.showHeader && (this.explicitlyScrollable || this.xScrollable)) {
          // Placeholder for outer header to sync scroll state
          return createEmptyNode();
        }
        // coordinate to pass if there are cells that cross row & col
        const cordToPass = {};
        // coordinate to related hover keys
        const cordKey = {};
        const {
          cols,
          paginatedDataAndInfo,
          mergedTheme,
          fixedColumnLeftMap,
          fixedColumnRightMap,
          currentPage,
          rowClassName,
          mergedSortState,
          mergedExpandedRowKeySet,
          stickyExpandedRows,
          componentId,
          childTriggerColIndex,
          expandable,
          rowProps,
          handleMouseleaveTable,
          renderExpand,
          summary,
          handleCheckboxUpdateChecked,
          handleRadioUpdateChecked,
          handleUpdateExpanded,
          heightForRow,
          minRowHeight,
          virtualScrollX
        } = this;
        const {
          length: colCount
        } = cols;
        let mergedData;
        // if there is children in data, we should expand mergedData first
        const {
          data: paginatedData,
          hasChildren
        } = paginatedDataAndInfo;
        const mergedPaginationData = hasChildren ? flatten(paginatedData, mergedExpandedRowKeySet) : paginatedData;
        if (summary) {
          const summaryRows = summary(this.rawPaginatedData);
          if (Array.isArray(summaryRows)) {
            const summaryRowData = summaryRows.map((row, i) => ({
              isSummaryRow: true,
              key: `__n_summary__${i}`,
              tmNode: {
                rawNode: row,
                disabled: true
              },
              index: -1
            }));
            mergedData = this.summaryPlacement === 'top' ? [...summaryRowData, ...mergedPaginationData] : [...mergedPaginationData, ...summaryRowData];
          } else {
            const summaryRowData = {
              isSummaryRow: true,
              key: '__n_summary__',
              tmNode: {
                rawNode: summaryRows,
                disabled: true
              },
              index: -1
            };
            mergedData = this.summaryPlacement === 'top' ? [summaryRowData, ...mergedPaginationData] : [...mergedPaginationData, summaryRowData];
          }
        } else {
          mergedData = mergedPaginationData;
        }
        const indentStyle = hasChildren ? {
          width: pxfy(this.indent)
        } : undefined;
        // Tile the data of the expanded row
        const displayedData = [];
        mergedData.forEach(rowInfo => {
          if (renderExpand && mergedExpandedRowKeySet.has(rowInfo.key) && (!expandable || expandable(rowInfo.tmNode.rawNode))) {
            displayedData.push(rowInfo, {
              isExpandedRow: true,
              key: `${rowInfo.key}-expand`,
              // solve key repeat of the expanded row
              tmNode: rowInfo.tmNode,
              index: rowInfo.index
            });
          } else {
            displayedData.push(rowInfo);
          }
        });
        const {
          length: rowCount
        } = displayedData;
        const rowIndexToKey = {};
        paginatedData.forEach(({
          tmNode
        }, rowIndex) => {
          rowIndexToKey[rowIndex] = tmNode.key;
        });
        const bodyWidth = stickyExpandedRows ? this.bodyWidth : null;
        const bodyWidthPx = bodyWidth === null ? undefined : `${bodyWidth}px`;
        const CellComponent = this.virtualScrollX ? 'div' : 'td';
        let leftFixedColsCount = 0;
        let rightFixedColsCount = 0;
        if (virtualScrollX) {
          cols.forEach(col => {
            if (col.column.fixed === 'left') {
              leftFixedColsCount++;
            } else if (col.column.fixed === 'right') {
              rightFixedColsCount++;
            }
          });
        }
        const renderRow = ({
          // Normal
          rowInfo,
          displayedRowIndex,
          isVirtual,
          // Virtual X
          isVirtualX,
          startColIndex,
          endColIndex,
          getLeft
        }) => {
          const {
            index: actualRowIndex
          } = rowInfo;
          if ('isExpandedRow' in rowInfo) {
            const {
              tmNode: {
                key,
                rawNode
              }
            } = rowInfo;
            return h("tr", {
              class: `${mergedClsPrefix}-data-table-tr ${mergedClsPrefix}-data-table-tr--expanded`,
              key: `${key}__expand`
            }, h("td", {
              class: [`${mergedClsPrefix}-data-table-td`, `${mergedClsPrefix}-data-table-td--last-col`, displayedRowIndex + 1 === rowCount && `${mergedClsPrefix}-data-table-td--last-row`],
              colspan: colCount
            }, stickyExpandedRows ? h("div", {
              class: `${mergedClsPrefix}-data-table-expand`,
              style: {
                width: bodyWidthPx
              }
            }, renderExpand(rawNode, actualRowIndex)) : renderExpand(rawNode, actualRowIndex)));
          }
          const isSummary = 'isSummaryRow' in rowInfo;
          const striped = !isSummary && rowInfo.striped;
          const {
            tmNode,
            key: rowKey
          } = rowInfo;
          const {
            rawNode: rowData
          } = tmNode;
          const expanded = mergedExpandedRowKeySet.has(rowKey);
          const props = rowProps ? rowProps(rowData, actualRowIndex) : undefined;
          const mergedRowClassName = typeof rowClassName === 'string' ? rowClassName : createRowClassName(rowData, actualRowIndex, rowClassName);
          const iteratedCols = isVirtualX ? cols.filter((col, index) => {
            if (startColIndex <= index && index <= endColIndex) return true;
            if (col.column.fixed) {
              return true;
            }
            return false;
          }) : cols;
          const virtualXRowHeight = isVirtualX ? pxfy((heightForRow === null || heightForRow === void 0 ? void 0 : heightForRow(rowData, actualRowIndex)) || minRowHeight) : undefined;
          const cells = iteratedCols.map(col => {
            var _a, _b, _c, _d, _e;
            const colIndex = col.index;
            if (displayedRowIndex in cordToPass) {
              const cordOfRowToPass = cordToPass[displayedRowIndex];
              const indexInCordOfRowToPass = cordOfRowToPass.indexOf(colIndex);
              if (~indexInCordOfRowToPass) {
                cordOfRowToPass.splice(indexInCordOfRowToPass, 1);
                return null;
              }
            }
            // TODO: Simplify row calculation
            const {
              column
            } = col;
            const colKey = getColKey(col);
            const {
              rowSpan,
              colSpan
            } = column;
            const mergedColSpan = isSummary ? ((_a = rowInfo.tmNode.rawNode[colKey]) === null || _a === void 0 ? void 0 : _a.colSpan) || 1 // optional for #1276
            : colSpan ? colSpan(rowData, actualRowIndex) : 1;
            const mergedRowSpan = isSummary ? ((_b = rowInfo.tmNode.rawNode[colKey]) === null || _b === void 0 ? void 0 : _b.rowSpan) || 1 // optional for #1276
            : rowSpan ? rowSpan(rowData, actualRowIndex) : 1;
            const isLastCol = colIndex + mergedColSpan === colCount;
            const isLastRow = displayedRowIndex + mergedRowSpan === rowCount;
            const isCrossRowTd = mergedRowSpan > 1;
            if (isCrossRowTd) {
              cordKey[displayedRowIndex] = {
                [colIndex]: []
              };
            }
            if (mergedColSpan > 1 || isCrossRowTd) {
              for (let i = displayedRowIndex; i < displayedRowIndex + mergedRowSpan; ++i) {
                if (isCrossRowTd) {
                  cordKey[displayedRowIndex][colIndex].push(rowIndexToKey[i]);
                }
                for (let j = colIndex; j < colIndex + mergedColSpan; ++j) {
                  if (i === displayedRowIndex && j === colIndex) {
                    continue;
                  }
                  if (!(i in cordToPass)) {
                    cordToPass[i] = [j];
                  } else {
                    cordToPass[i].push(j);
                  }
                }
              }
            }
            const hoverKey = isCrossRowTd ? this.hoverKey : null;
            const {
              cellProps
            } = column;
            const resolvedCellProps = cellProps === null || cellProps === void 0 ? void 0 : cellProps(rowData, actualRowIndex);
            const indentOffsetStyle = {
              '--indent-offset': ''
            };
            const FinalCellComponent = column.fixed ? 'td' : CellComponent;
            return h(FinalCellComponent, Object.assign({}, resolvedCellProps, {
              key: colKey,
              style: [{
                textAlign: column.align || undefined,
                width: pxfy(column.width)
              }, isVirtualX && {
                height: virtualXRowHeight
              }, isVirtualX && !column.fixed ? {
                position: 'absolute',
                left: pxfy(getLeft(colIndex)),
                top: 0,
                bottom: 0
              } : {
                left: pxfy((_c = fixedColumnLeftMap[colKey]) === null || _c === void 0 ? void 0 : _c.start),
                right: pxfy((_d = fixedColumnRightMap[colKey]) === null || _d === void 0 ? void 0 : _d.start)
              }, indentOffsetStyle, (resolvedCellProps === null || resolvedCellProps === void 0 ? void 0 : resolvedCellProps.style) || ''],
              colspan: mergedColSpan,
              rowspan: isVirtual ? undefined : mergedRowSpan,
              "data-col-key": colKey,
              class: [`${mergedClsPrefix}-data-table-td`, column.className, resolvedCellProps === null || resolvedCellProps === void 0 ? void 0 : resolvedCellProps.class, isSummary && `${mergedClsPrefix}-data-table-td--summary`, hoverKey !== null && cordKey[displayedRowIndex][colIndex].includes(hoverKey) && `${mergedClsPrefix}-data-table-td--hover`, isColumnSorting(column, mergedSortState) && `${mergedClsPrefix}-data-table-td--sorting`, column.fixed && `${mergedClsPrefix}-data-table-td--fixed-${column.fixed}`, column.align && `${mergedClsPrefix}-data-table-td--${column.align}-align`, column.type === 'selection' && `${mergedClsPrefix}-data-table-td--selection`, column.type === 'expand' && `${mergedClsPrefix}-data-table-td--expand`, isLastCol && `${mergedClsPrefix}-data-table-td--last-col`, isLastRow && `${mergedClsPrefix}-data-table-td--last-row`]
            }), hasChildren && colIndex === childTriggerColIndex ? [repeat(indentOffsetStyle['--indent-offset'] = isSummary ? 0 : rowInfo.tmNode.level, h("div", {
              class: `${mergedClsPrefix}-data-table-indent`,
              style: indentStyle
            })), isSummary || rowInfo.tmNode.isLeaf ? h("div", {
              class: `${mergedClsPrefix}-data-table-expand-placeholder`
            }) : h(ExpandTrigger, {
              class: `${mergedClsPrefix}-data-table-expand-trigger`,
              clsPrefix: mergedClsPrefix,
              expanded: expanded,
              rowData: rowData,
              renderExpandIcon: this.renderExpandIcon,
              loading: loadingKeySet.has(rowInfo.key),
              onClick: () => {
                handleUpdateExpanded(rowKey, rowInfo.tmNode);
              }
            })] : null, column.type === 'selection' ? !isSummary ? column.multiple === false ? h(RenderSafeRadio, {
              key: currentPage,
              rowKey: rowKey,
              disabled: rowInfo.tmNode.disabled,
              onUpdateChecked: () => {
                handleRadioUpdateChecked(rowInfo.tmNode);
              }
            }) : h(RenderSafeCheckbox, {
              key: currentPage,
              rowKey: rowKey,
              disabled: rowInfo.tmNode.disabled,
              onUpdateChecked: (checked, e) => {
                handleCheckboxUpdateChecked(rowInfo.tmNode, checked, e.shiftKey);
              }
            }) : null : column.type === 'expand' ? !isSummary ? !column.expandable || ((_e = column.expandable) === null || _e === void 0 ? void 0 : _e.call(column, rowData)) ? h(ExpandTrigger, {
              clsPrefix: mergedClsPrefix,
              rowData: rowData,
              expanded: expanded,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                handleUpdateExpanded(rowKey, null);
              }
            }) : null : null : h(Cell, {
              clsPrefix: mergedClsPrefix,
              index: actualRowIndex,
              row: rowData,
              column: column,
              isSummary: isSummary,
              mergedTheme: mergedTheme,
              renderCell: this.renderCell
            }));
          });
          if (isVirtualX) {
            if (leftFixedColsCount && rightFixedColsCount) {
              cells.splice(leftFixedColsCount, 0, h("td", {
                colspan: cols.length - leftFixedColsCount - rightFixedColsCount,
                style: {
                  pointerEvents: 'none',
                  visibility: 'hidden',
                  height: 0
                }
              }));
            }
          }
          const row = h("tr", Object.assign({}, props, {
            onMouseenter: e => {
              var _a;
              this.hoverKey = rowKey;
              (_a = props === null || props === void 0 ? void 0 : props.onMouseenter) === null || _a === void 0 ? void 0 : _a.call(props, e);
            },
            key: rowKey,
            class: [`${mergedClsPrefix}-data-table-tr`, isSummary && `${mergedClsPrefix}-data-table-tr--summary`, striped && `${mergedClsPrefix}-data-table-tr--striped`, expanded && `${mergedClsPrefix}-data-table-tr--expanded`, mergedRowClassName, props === null || props === void 0 ? void 0 : props.class],
            style: [props === null || props === void 0 ? void 0 : props.style, isVirtualX && {
              height: virtualXRowHeight
            }]
          }), cells);
          return row;
        };
        if (!this.shouldDisplayVirtualList) {
          return h(Fragment, null, h("table", {
            class: `${mergedClsPrefix}-data-table-table`,
            onMouseleave: handleMouseleaveTable,
            style: {
              tableLayout: this.mergedTableLayout
            }
          }, h("colgroup", null, cols.map(col => h("col", {
            key: col.key,
            style: col.style
          }))), this.showHeader ? h(TableHeader, {
            discrete: false
          }) : null, !this.empty ? h("tbody", {
            "data-n-id": componentId,
            class: `${mergedClsPrefix}-data-table-tbody`
          }, displayedData.map((rowInfo, displayedRowIndex) => {
            return renderRow({
              rowInfo,
              displayedRowIndex,
              isVirtual: false,
              isVirtualX: false,
              startColIndex: -1,
              endColIndex: -1,
              getLeft(_index) {
                return -1;
              }
            });
          })) : null), this.empty && this.xScrollable ? createEmptyNode() : null);
        } else {
          return h(VirtualList, {
            ref: "virtualListRef",
            items: displayedData,
            itemSize: this.minRowHeight,
            visibleItemsTag: VirtualListItemWrapper,
            visibleItemsProps: {
              clsPrefix: mergedClsPrefix,
              id: componentId,
              cols,
              onMouseleave: handleMouseleaveTable
            },
            showScrollbar: false,
            onResize: this.handleVirtualListResize,
            onScroll: this.handleVirtualListScroll,
            itemsStyle: contentStyle,
            itemResizable: !virtualScrollX,
            columns: cols,
            renderItemWithCols: virtualScrollX ? ({
              itemIndex,
              item,
              startColIndex,
              endColIndex,
              getLeft
            }) => {
              return renderRow({
                displayedRowIndex: itemIndex,
                isVirtual: true,
                isVirtualX: true,
                rowInfo: item,
                startColIndex,
                endColIndex,
                getLeft
              });
            } : undefined
          }, {
            default: ({
              item,
              index,
              renderedItemWithCols
            }) => {
              if (renderedItemWithCols) return renderedItemWithCols;
              return renderRow({
                rowInfo: item,
                displayedRowIndex: index,
                isVirtual: true,
                isVirtualX: false,
                startColIndex: 0,
                endColIndex: 0,
                getLeft(_index) {
                  return 0;
                }
              });
            }
          });
        }
      }
    });
    if (this.empty) {
      if (this.explicitlyScrollable || this.xScrollable) {
        // empty node is integrated into table node
        return tableNode;
      } else {
        return h(VResizeObserver, {
          onResize: this.onResize
        }, {
          default: createEmptyNode
        });
      }
    }
    return tableNode;
  }
});