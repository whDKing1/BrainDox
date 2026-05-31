"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpand = useExpand;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
function useExpand(props, treeMateRef) {
    const renderExpandRef = (0, vooks_1.useMemo)(() => {
        for (const col of props.columns) {
            if (col.type === 'expand') {
                if (process.env.NODE_ENV !== 'production' && !col.renderExpand) {
                    (0, _utils_1.warn)('data-table', 'column with type `expand` has no `renderExpand` prop.');
                }
                return col.renderExpand;
            }
        }
    });
    const expandableRef = (0, vooks_1.useMemo)(() => {
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
    const uncontrolledExpandedRowKeysRef = (0, vue_1.ref)(props.defaultExpandAll
        ? (renderExpandRef === null || renderExpandRef === void 0 ? void 0 : renderExpandRef.value)
            ? (() => {
                const expandedKeys = [];
                treeMateRef.value.treeNodes.forEach((tmNode) => {
                    var _a;
                    if ((_a = expandableRef.value) === null || _a === void 0 ? void 0 : _a.call(expandableRef, tmNode.rawNode)) {
                        expandedKeys.push(tmNode.key);
                    }
                });
                return expandedKeys;
            })()
            : treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedRowKeys);
    const controlledExpandedRowKeysRef = (0, vue_1.toRef)(props, 'expandedRowKeys');
    const stickyExpandedRowsRef = (0, vue_1.toRef)(props, 'stickyExpandedRows');
    const mergedExpandedRowKeysRef = (0, vooks_1.useMergedState)(controlledExpandedRowKeysRef, uncontrolledExpandedRowKeysRef);
    function doUpdateExpandedRowKeys(expandedKeys) {
        const { onUpdateExpandedRowKeys, 'onUpdate:expandedRowKeys': _onUpdateExpandedRowKeys } = props;
        if (onUpdateExpandedRowKeys) {
            (0, _utils_1.call)(onUpdateExpandedRowKeys, expandedKeys);
        }
        if (_onUpdateExpandedRowKeys) {
            (0, _utils_1.call)(_onUpdateExpandedRowKeys, expandedKeys);
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
