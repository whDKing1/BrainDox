import { computed, ref } from 'vue';
import { call } from "../../_utils/index.mjs";
import { getFlagOfOrder } from "./utils.mjs";
function getMultiplePriority(sorter) {
  if (typeof sorter === 'object' && typeof sorter.multiple === 'number') {
    return sorter.multiple;
  }
  return false;
}
function getSortFunction(sorter, columnKey) {
  if (columnKey && (sorter === undefined || sorter === 'default' || typeof sorter === 'object' && sorter.compare === 'default')) {
    return getDefaultSorterFn(columnKey);
  }
  if (typeof sorter === 'function') {
    return sorter;
  }
  if (sorter && typeof sorter === 'object' && sorter.compare && sorter.compare !== 'default') {
    return sorter.compare;
  }
  return false;
}
function getDefaultSorterFn(columnKey) {
  return (row1, row2) => {
    const value1 = row1[columnKey];
    const value2 = row2[columnKey];
    if (value1 === null || value1 === undefined) {
      if (value2 === null || value2 === undefined) return 0;
      return -1;
    } else if (value2 === null || value2 === undefined) {
      return 1;
    } else if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2;
    } else if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2);
    }
    return 0;
  };
}
export function useSorter(props, {
  dataRelatedColsRef,
  filteredDataRef
}) {
  const defaultSortState = [];
  // initialize
  dataRelatedColsRef.value.forEach(column => {
    var _a;
    if (column.sorter !== undefined) {
      updateSortStatesByNewSortState(defaultSortState, {
        columnKey: column.key,
        sorter: column.sorter,
        order: (_a = column.defaultSortOrder) !== null && _a !== void 0 ? _a : false
      });
    }
  });
  const uncontrolledSortStateRef = ref(defaultSortState);
  const mergedSortStateRef = computed(() => {
    // If one of the columns's sort order is false or 'ascend' or 'descend',
    // the table's controll functionality should work in controlled manner.
    const columnsWithControlledSortOrder = dataRelatedColsRef.value.filter(column => column.type !== 'selection' && column.sorter !== undefined && (column.sortOrder === 'ascend' || column.sortOrder === 'descend' || column.sortOrder === false));
    // if multiple columns are controlled sortable, then we need to find columns with active sortOrder
    const columnToSort = columnsWithControlledSortOrder.filter(col => col.sortOrder !== false);
    if (columnToSort.length) {
      return columnToSort.map(column => {
        return {
          columnKey: column.key,
          // column to sort has controlled sorter
          // sorter && sort order won't be undefined
          order: column.sortOrder,
          sorter: column.sorter
        };
      });
    }
    // If any column is in controlled mode, the sorting state of the table is
    // in controlled mode
    if (columnsWithControlledSortOrder.length) return [];
    const {
      value: uncontrolledSortState
    } = uncontrolledSortStateRef;
    if (Array.isArray(uncontrolledSortState)) {
      return uncontrolledSortState;
    } else if (uncontrolledSortState) {
      return [uncontrolledSortState];
    } else {
      return [];
    }
  });
  const sortedDataRef = computed(() => {
    const activeSorters = mergedSortStateRef.value.slice().sort((a, b) => {
      const item1Priority = getMultiplePriority(a.sorter) || 0;
      const item2Priority = getMultiplePriority(b.sorter) || 0;
      return item2Priority - item1Priority;
    });
    if (activeSorters.length) {
      const filteredData = filteredDataRef.value.slice();
      return filteredData.sort((tmNode1, tmNode2) => {
        let compareResult = 0;
        activeSorters.some(sorterState => {
          const {
            columnKey,
            sorter,
            order
          } = sorterState;
          const compareFn = getSortFunction(sorter, columnKey);
          if (compareFn && order) {
            compareResult = compareFn(tmNode1.rawNode, tmNode2.rawNode);
            if (compareResult !== 0) {
              compareResult = compareResult * getFlagOfOrder(order);
              return true;
            }
          }
          return false;
        });
        return compareResult;
      });
    }
    return filteredDataRef.value;
  });
  function getUpdatedSorterState(sortState) {
    let currentSortState = mergedSortStateRef.value.slice();
    // Multiple sorter (if you clicked on a multiple sort column)
    if (sortState && getMultiplePriority(sortState.sorter) !== false) {
      // clear column is not multiple sort
      currentSortState = currentSortState.filter(sortState => getMultiplePriority(sortState.sorter) !== false);
      updateSortStatesByNewSortState(currentSortState, sortState);
      return currentSortState;
    } else if (sortState) {
      // single sorter
      return sortState;
    }
    // no sorter
    return null;
  }
  function deriveNextSorter(sortState) {
    const nextSorterState = getUpdatedSorterState(sortState);
    doUpdateSorter(nextSorterState);
  }
  function doUpdateSorter(sortState) {
    const {
      'onUpdate:sorter': _onUpdateSorter,
      onUpdateSorter,
      onSorterChange
    } = props;
    if (_onUpdateSorter) {
      call(_onUpdateSorter, sortState);
    }
    if (onUpdateSorter) {
      call(onUpdateSorter, sortState);
    }
    if (onSorterChange) {
      call(onSorterChange, sortState);
    }
    uncontrolledSortStateRef.value = sortState;
  }
  function sort(columnKey, order = 'ascend') {
    if (!columnKey) {
      clearSorter();
    } else {
      const columnToSort = dataRelatedColsRef.value.find(column => column.type !== 'selection' && column.type !== 'expand' && column.key === columnKey);
      if (!(columnToSort === null || columnToSort === void 0 ? void 0 : columnToSort.sorter)) return;
      const sorter = columnToSort.sorter;
      deriveNextSorter({
        columnKey,
        sorter,
        order
      });
    }
  }
  function clearSorter() {
    doUpdateSorter(null);
  }
  function updateSortStatesByNewSortState(sortStates, sortState) {
    const index = sortStates.findIndex(state => (sortState === null || sortState === void 0 ? void 0 : sortState.columnKey) && state.columnKey === sortState.columnKey);
    if (index !== undefined && index >= 0) {
      sortStates[index] = sortState;
    } else {
      sortStates.push(sortState);
    }
  }
  return {
    clearSorter,
    sort,
    sortedDataRef,
    mergedSortStateRef,
    deriveNextSorter
  };
}