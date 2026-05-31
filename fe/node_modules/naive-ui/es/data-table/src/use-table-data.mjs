import { createTreeMate } from 'treemate';
import { useMemo, useMergedState } from 'vooks';
import { computed, ref } from 'vue';
import { call, warn } from "../../_utils/index.mjs";
import { getDefaultPageSize } from "../../pagination/src/utils.mjs";
import { useSorter } from "./use-sorter.mjs";
import { createShallowClonedObject } from "./utils.mjs";
// useTableData combines filter, sorter and pagination
export function useTableData(props, {
  dataRelatedColsRef
}) {
  const selectionColumnRef = computed(() => {
    const getSelectionColumn = cols => {
      for (let i = 0; i < cols.length; ++i) {
        const col = cols[i];
        if ('children' in col) {
          return getSelectionColumn(col.children);
        } else if (col.type === 'selection') {
          return col;
        }
      }
      return null;
    };
    return getSelectionColumn(props.columns);
  });
  const treeMateRef = computed(() => {
    const {
      childrenKey
    } = props;
    return createTreeMate(props.data, {
      ignoreEmptyChildren: true,
      getKey: props.rowKey,
      getChildren: rowData => rowData[childrenKey],
      getDisabled: rowData => {
        var _a, _b;
        if ((_b = (_a = selectionColumnRef.value) === null || _a === void 0 ? void 0 : _a.disabled) === null || _b === void 0 ? void 0 : _b.call(_a, rowData)) {
          return true;
        }
        return false;
      }
    });
  });
  const childTriggerColIndexRef = useMemo(() => {
    const {
      columns
    } = props;
    const {
      length
    } = columns;
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
  const uncontrolledFilterStateRef = ref({});
  const {
    pagination
  } = props;
  const uncontrolledCurrentPageRef = ref(pagination ? pagination.defaultPage || 1 : 1);
  const uncontrolledPageSizeRef = ref(getDefaultPageSize(pagination));
  const mergedFilterStateRef = computed(() => {
    const columnsWithControlledFilter = dataRelatedColsRef.value.filter(column => {
      return column.filterOptionValues !== undefined || column.filterOptionValue !== undefined;
    });
    const controlledFilterState = {};
    columnsWithControlledFilter.forEach(column => {
      var _a;
      if (column.type === 'selection' || column.type === 'expand') return;
      if (column.filterOptionValues === undefined) {
        controlledFilterState[column.key] = (_a = column.filterOptionValue) !== null && _a !== void 0 ? _a : null;
      } else {
        controlledFilterState[column.key] = column.filterOptionValues;
      }
    });
    const activeFilters = Object.assign(createShallowClonedObject(uncontrolledFilterStateRef.value), controlledFilterState);
    return activeFilters;
  });
  const filteredDataRef = computed(() => {
    const mergedFilterState = mergedFilterStateRef.value;
    const {
      columns
    } = props;
    function createDefaultFilter(columnKey) {
      return (filterOptionValue, row) => !!~String(row[columnKey]).indexOf(String(filterOptionValue));
    }
    const {
      value: {
        treeNodes: data
      }
    } = treeMateRef;
    const columnEntries = [];
    columns.forEach(column => {
      if (column.type === 'selection' || column.type === 'expand' || 'children' in column) {
        return;
      }
      columnEntries.push([column.key, column]);
    });
    return data ? data.filter(tmNode => {
      const {
        rawNode: row
      } = tmNode;
      // traverse all filters
      for (const [columnKey, column] of columnEntries) {
        let activeFilterOptionValues = mergedFilterState[columnKey];
        if (activeFilterOptionValues == null) continue;
        if (!Array.isArray(activeFilterOptionValues)) {
          activeFilterOptionValues = [activeFilterOptionValues];
        }
        if (!activeFilterOptionValues.length) continue;
        // When async, filter won't be set, so data won't be filtered
        const filter = column.filter === 'default' ? createDefaultFilter(columnKey) : column.filter;
        if (column && typeof filter === 'function') {
          if (column.filterMode === 'and') {
            if (activeFilterOptionValues.some(filterOptionValue => !filter(filterOptionValue, row))) {
              return false;
            }
          } else {
            if (activeFilterOptionValues.some(filterOptionValue => filter(filterOptionValue, row))) {
              continue;
            } else {
              return false;
            }
          }
        }
      }
      return true;
    }) : [];
  });
  const {
    sortedDataRef,
    deriveNextSorter,
    mergedSortStateRef,
    sort,
    clearSorter
  } = useSorter(props, {
    dataRelatedColsRef,
    filteredDataRef
  });
  // initialize
  dataRelatedColsRef.value.forEach(column => {
    var _a;
    if (column.filter) {
      const defaultFilterOptionValues = column.defaultFilterOptionValues;
      if (column.filterMultiple) {
        uncontrolledFilterStateRef.value[column.key] = defaultFilterOptionValues || [];
      } else if (defaultFilterOptionValues !== undefined) {
        // this branch is for compatibility, someone may use `values` in single filter mode
        uncontrolledFilterStateRef.value[column.key] = defaultFilterOptionValues === null ? [] : defaultFilterOptionValues;
      } else {
        uncontrolledFilterStateRef.value[column.key] = (_a = column.defaultFilterOptionValue) !== null && _a !== void 0 ? _a : null;
      }
    }
  });
  const controlledCurrentPageRef = computed(() => {
    const {
      pagination
    } = props;
    if (pagination === false) return undefined;
    return pagination.page;
  });
  const controlledPageSizeRef = computed(() => {
    const {
      pagination
    } = props;
    if (pagination === false) return undefined;
    return pagination.pageSize;
  });
  const _mergedCurrentPageRef = useMergedState(controlledCurrentPageRef, uncontrolledCurrentPageRef);
  const mergedPageSizeRef = useMergedState(controlledPageSizeRef, uncontrolledPageSizeRef);
  const boundedMergedCurrentPageRef = useMemo(() => {
    const page = _mergedCurrentPageRef.value;
    return props.remote ? page : Math.max(1, Math.min(Math.ceil(filteredDataRef.value.length / mergedPageSizeRef.value), page));
  });
  const mergedPageCountRef = computed(() => {
    const {
      pagination
    } = props;
    if (pagination) {
      const {
        pageCount
      } = pagination;
      if (pageCount !== undefined) return pageCount;
    }
    return undefined;
  });
  const paginatedDataRef = computed(() => {
    if (props.remote) return treeMateRef.value.treeNodes;
    if (!props.pagination) return sortedDataRef.value;
    const pageSize = mergedPageSizeRef.value;
    const startIndex = (boundedMergedCurrentPageRef.value - 1) * pageSize;
    return sortedDataRef.value.slice(startIndex, startIndex + pageSize);
  });
  const rawPaginatedDataRef = computed(() => {
    return paginatedDataRef.value.map(tmNode => tmNode.rawNode);
  });
  function mergedOnUpdatePage(page) {
    const {
      pagination
    } = props;
    if (pagination) {
      const {
        onChange,
        'onUpdate:page': _onUpdatePage,
        onUpdatePage
      } = pagination;
      if (onChange) call(onChange, page);
      if (onUpdatePage) call(onUpdatePage, page);
      if (_onUpdatePage) call(_onUpdatePage, page);
      doUpdatePage(page);
    }
  }
  function mergedOnUpdatePageSize(pageSize) {
    const {
      pagination
    } = props;
    if (pagination) {
      const {
        onPageSizeChange,
        'onUpdate:pageSize': _onUpdatePageSize,
        onUpdatePageSize
      } = pagination;
      if (onPageSizeChange) call(onPageSizeChange, pageSize);
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize);
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize);
      doUpdatePageSize(pageSize);
    }
  }
  const mergedItemCountRef = computed(() => {
    if (props.remote) {
      const {
        pagination
      } = props;
      if (pagination) {
        const {
          itemCount
        } = pagination;
        if (itemCount !== undefined) return itemCount;
      }
      return undefined;
    }
    return filteredDataRef.value.length;
  });
  const mergedPaginationRef = computed(() => {
    return Object.assign(Object.assign({}, props.pagination), {
      // reset deprecated methods
      onChange: undefined,
      onUpdatePage: undefined,
      onUpdatePageSize: undefined,
      onPageSizeChange: undefined,
      'onUpdate:page': mergedOnUpdatePage,
      'onUpdate:pageSize': mergedOnUpdatePageSize,
      // writing merged props after pagination to avoid
      // pagination[key] === undefined
      // key still exists but value is undefined
      page: boundedMergedCurrentPageRef.value,
      pageSize: mergedPageSizeRef.value,
      pageCount: mergedItemCountRef.value === undefined ? mergedPageCountRef.value : undefined,
      itemCount: mergedItemCountRef.value
    });
  });
  function doUpdatePage(page) {
    const {
      'onUpdate:page': _onUpdatePage,
      onPageChange,
      onUpdatePage
    } = props;
    if (onUpdatePage) call(onUpdatePage, page);
    if (_onUpdatePage) call(_onUpdatePage, page);
    if (onPageChange) call(onPageChange, page);
    uncontrolledCurrentPageRef.value = page;
  }
  function doUpdatePageSize(pageSize) {
    const {
      'onUpdate:pageSize': _onUpdatePageSize,
      onPageSizeChange,
      onUpdatePageSize
    } = props;
    if (onPageSizeChange) call(onPageSizeChange, pageSize);
    if (onUpdatePageSize) call(onUpdatePageSize, pageSize);
    if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize);
    uncontrolledPageSizeRef.value = pageSize;
  }
  function doUpdateFilters(filters, sourceColumn) {
    const {
      onUpdateFilters,
      'onUpdate:filters': _onUpdateFilters,
      onFiltersChange
    } = props;
    if (onUpdateFilters) call(onUpdateFilters, filters, sourceColumn);
    if (_onUpdateFilters) call(_onUpdateFilters, filters, sourceColumn);
    if (onFiltersChange) call(onFiltersChange, filters, sourceColumn);
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
    } else if (filters) {
      uncontrolledFilterStateRef.value = createShallowClonedObject(filters);
    } else if (process.env.NODE_ENV !== 'production') {
      warn('data-table', '`filters` is not an object');
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
    hoverKeyRef: ref(null),
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