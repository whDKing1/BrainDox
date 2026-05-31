import { useMemo, useMergedState } from 'vooks';
import { ref, toRef } from 'vue';
import { call, warn } from "../../_utils/index.mjs";
export function useExpand(props, treeMateRef) {
  const renderExpandRef = useMemo(() => {
    for (const col of props.columns) {
      if (col.type === 'expand') {
        if (process.env.NODE_ENV !== 'production' && !col.renderExpand) {
          warn('data-table', 'column with type `expand` has no `renderExpand` prop.');
        }
        return col.renderExpand;
      }
    }
  });
  const expandableRef = useMemo(() => {
    // It's not reactive
    let expandable;
    for (const col of props.columns) {
      if (col.type === 'expand') {
        expandable = col.expandable;
        break;
      }
    }
    return expandable;
  });
  const uncontrolledExpandedRowKeysRef = ref(props.defaultExpandAll ? (renderExpandRef === null || renderExpandRef === void 0 ? void 0 : renderExpandRef.value) ? (() => {
    const expandedKeys = [];
    treeMateRef.value.treeNodes.forEach(tmNode => {
      var _a;
      if ((_a = expandableRef.value) === null || _a === void 0 ? void 0 : _a.call(expandableRef, tmNode.rawNode)) {
        expandedKeys.push(tmNode.key);
      }
    });
    return expandedKeys;
  })() : treeMateRef.value.getNonLeafKeys() : props.defaultExpandedRowKeys);
  const controlledExpandedRowKeysRef = toRef(props, 'expandedRowKeys');
  const stickyExpandedRowsRef = toRef(props, 'stickyExpandedRows');
  const mergedExpandedRowKeysRef = useMergedState(controlledExpandedRowKeysRef, uncontrolledExpandedRowKeysRef);
  function doUpdateExpandedRowKeys(expandedKeys) {
    const {
      onUpdateExpandedRowKeys,
      'onUpdate:expandedRowKeys': _onUpdateExpandedRowKeys
    } = props;
    if (onUpdateExpandedRowKeys) {
      call(onUpdateExpandedRowKeys, expandedKeys);
    }
    if (_onUpdateExpandedRowKeys) {
      call(_onUpdateExpandedRowKeys, expandedKeys);
    }
    uncontrolledExpandedRowKeysRef.value = expandedKeys;
  }
  return {
    stickyExpandedRowsRef,
    mergedExpandedRowKeysRef,
    renderExpandRef,
    expandableRef,
    doUpdateExpandedRowKeys
  };
}