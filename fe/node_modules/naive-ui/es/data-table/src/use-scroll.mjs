import { beforeNextFrameOnce } from 'seemly';
import { computed, ref, watch } from 'vue';
import { formatLength } from "../../_utils/index.mjs";
import { getColKey, getNumberColWidth } from "./utils.mjs";
export function useScroll(props, {
  mainTableInstRef,
  mergedCurrentPageRef,
  bodyWidthRef,
  maxHeightRef,
  mergedTableLayoutRef
}) {
  const explicitlyScrollableRef = computed(() => props.scrollX !== undefined || maxHeightRef.value !== undefined || props.flexHeight);
  const xScrollableRef = computed(() => {
    // For a basic table with auto layout whose content may overflow we will
    // make it scrollable, which differs from browser's native behavior.
    // For native behavior, see
    // https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
    const isBasicAutoLayout = !explicitlyScrollableRef.value && mergedTableLayoutRef.value === 'auto';
    return props.scrollX !== undefined || isBasicAutoLayout;
  });
  let lastScrollLeft = 0;
  const scrollPartRef = ref();
  const leftActiveFixedColKeyRef = ref(null);
  const leftActiveFixedChildrenColKeysRef = ref([]);
  const rightActiveFixedColKeyRef = ref(null);
  const rightActiveFixedChildrenColKeysRef = ref([]);
  const styleScrollXRef = computed(() => {
    return formatLength(props.scrollX);
  });
  const leftFixedColumnsRef = computed(() => {
    return props.columns.filter(column => column.fixed === 'left');
  });
  const rightFixedColumnsRef = computed(() => {
    return props.columns.filter(column => column.fixed === 'right');
  });
  const fixedColumnLeftMapRef = computed(() => {
    const columns = {};
    let left = 0;
    function traverse(cols) {
      cols.forEach(col => {
        const positionInfo = {
          start: left,
          end: 0
        };
        columns[getColKey(col)] = positionInfo;
        if ('children' in col) {
          traverse(col.children);
          positionInfo.end = left;
        } else {
          left += getNumberColWidth(col) || 0;
          positionInfo.end = left;
        }
      });
    }
    traverse(leftFixedColumnsRef.value);
    return columns;
  });
  const fixedColumnRightMapRef = computed(() => {
    const columns = {};
    let right = 0;
    function traverse(cols) {
      for (let i = cols.length - 1; i >= 0; --i) {
        const col = cols[i];
        const positionInfo = {
          start: right,
          end: 0
        };
        columns[getColKey(col)] = positionInfo;
        if ('children' in col) {
          traverse(col.children);
          positionInfo.end = right;
        } else {
          right += getNumberColWidth(col) || 0;
          positionInfo.end = right;
        }
      }
    }
    traverse(rightFixedColumnsRef.value);
    return columns;
  });
  function deriveActiveLeftFixedColumn() {
    var _a, _b;
    // target is header element
    const {
      value: leftFixedColumns
    } = leftFixedColumnsRef;
    let leftWidth = 0;
    const {
      value: fixedColumnLeftMap
    } = fixedColumnLeftMapRef;
    let leftActiveFixedColKey = null;
    for (let i = 0; i < leftFixedColumns.length; ++i) {
      const key = getColKey(leftFixedColumns[i]);
      if (lastScrollLeft > (((_a = fixedColumnLeftMap[key]) === null || _a === void 0 ? void 0 : _a.start) || 0) - leftWidth) {
        leftActiveFixedColKey = key;
        leftWidth = ((_b = fixedColumnLeftMap[key]) === null || _b === void 0 ? void 0 : _b.end) || 0;
      } else {
        break;
      }
    }
    leftActiveFixedColKeyRef.value = leftActiveFixedColKey;
  }
  function deriveActiveLeftFixedChildrenColumns() {
    leftActiveFixedChildrenColKeysRef.value = [];
    let activeLeftFixedColumn = props.columns.find(col => getColKey(col) === leftActiveFixedColKeyRef.value);
    while (activeLeftFixedColumn && 'children' in activeLeftFixedColumn) {
      const length = activeLeftFixedColumn.children.length;
      if (length === 0) break;
      const nextActiveLeftFixedColumn = activeLeftFixedColumn.children[length - 1];
      leftActiveFixedChildrenColKeysRef.value.push(getColKey(nextActiveLeftFixedColumn));
      activeLeftFixedColumn = nextActiveLeftFixedColumn;
    }
  }
  function deriveActiveRightFixedColumn() {
    var _a, _b;
    // target is header element
    const {
      value: rightFixedColumns
    } = rightFixedColumnsRef;
    const scrollWidth = Number(props.scrollX);
    const {
      value: tableWidth
    } = bodyWidthRef;
    if (tableWidth === null) return;
    let rightWidth = 0;
    let rightActiveFixedColKey = null;
    const {
      value: fixedColumnRightMap
    } = fixedColumnRightMapRef;
    for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
      const key = getColKey(rightFixedColumns[i]);
      if (Math.round(lastScrollLeft + (((_a = fixedColumnRightMap[key]) === null || _a === void 0 ? void 0 : _a.start) || 0) + tableWidth - rightWidth) < scrollWidth) {
        rightActiveFixedColKey = key;
        rightWidth = ((_b = fixedColumnRightMap[key]) === null || _b === void 0 ? void 0 : _b.end) || 0;
      } else {
        break;
      }
    }
    rightActiveFixedColKeyRef.value = rightActiveFixedColKey;
  }
  function deriveActiveRightFixedChildrenColumns() {
    rightActiveFixedChildrenColKeysRef.value = [];
    let activeRightFixedColumn = props.columns.find(col => getColKey(col) === rightActiveFixedColKeyRef.value);
    while (activeRightFixedColumn && 'children' in activeRightFixedColumn && activeRightFixedColumn.children.length) {
      const nextActiveRightFixedColumn = activeRightFixedColumn.children[0];
      rightActiveFixedChildrenColKeysRef.value.push(getColKey(nextActiveRightFixedColumn));
      activeRightFixedColumn = nextActiveRightFixedColumn;
    }
  }
  function getScrollElements() {
    const header = mainTableInstRef.value ? mainTableInstRef.value.getHeaderElement() : null;
    const body = mainTableInstRef.value ? mainTableInstRef.value.getBodyElement() : null;
    return {
      header,
      body
    };
  }
  function scrollMainTableBodyToTop() {
    const {
      body
    } = getScrollElements();
    if (body) {
      body.scrollTop = 0;
    }
  }
  function handleTableHeaderScroll() {
    if (scrollPartRef.value !== 'body') {
      beforeNextFrameOnce(syncScrollState);
    } else {
      scrollPartRef.value = undefined;
    }
  }
  function handleTableBodyScroll(e) {
    var _a;
    (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
    if (scrollPartRef.value !== 'head') {
      beforeNextFrameOnce(syncScrollState);
    } else {
      scrollPartRef.value = undefined;
    }
  }
  function syncScrollState() {
    // We can't simply use props.scrollX to determine whether the table has
    // need to be sync since user may set column width for each column.
    // Just let it be, the scroll listener won't be triggered for a basic table.
    const {
      header,
      body
    } = getScrollElements();
    if (!body) return;
    const {
      value: tableWidth
    } = bodyWidthRef;
    if (tableWidth === null) return;
    if (header) {
      // we need to deal with overscroll
      const directionHead = lastScrollLeft - header.scrollLeft;
      scrollPartRef.value = directionHead !== 0 ? 'head' : 'body';
      if (scrollPartRef.value === 'head') {
        lastScrollLeft = header.scrollLeft;
        body.scrollLeft = lastScrollLeft;
      } else {
        lastScrollLeft = body.scrollLeft;
        header.scrollLeft = lastScrollLeft;
      }
    } else {
      lastScrollLeft = body.scrollLeft;
    }
    deriveActiveLeftFixedColumn();
    deriveActiveLeftFixedChildrenColumns();
    deriveActiveRightFixedColumn();
    deriveActiveRightFixedChildrenColumns();
  }
  function setHeaderScrollLeft(left) {
    const {
      header
    } = getScrollElements();
    if (!header) return;
    header.scrollLeft = left;
    syncScrollState();
  }
  watch(mergedCurrentPageRef, () => {
    scrollMainTableBodyToTop();
  });
  return {
    styleScrollXRef,
    fixedColumnLeftMapRef,
    fixedColumnRightMapRef,
    leftFixedColumnsRef,
    rightFixedColumnsRef,
    leftActiveFixedColKeyRef,
    leftActiveFixedChildrenColKeysRef,
    rightActiveFixedColKeyRef,
    rightActiveFixedChildrenColKeysRef,
    syncScrollState,
    handleTableBodyScroll,
    handleTableHeaderScroll,
    setHeaderScrollLeft,
    explicitlyScrollableRef,
    xScrollableRef
  };
}