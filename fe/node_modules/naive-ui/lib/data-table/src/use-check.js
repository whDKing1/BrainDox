"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheck = useCheck;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
function useCheck(props, data) {
    const { paginatedDataRef, treeMateRef, selectionColumnRef } = data;
    const uncontrolledCheckedRowKeysRef = (0, vue_1.ref)(props.defaultCheckedRowKeys);
    const mergedCheckState = (0, vue_1.computed)(() => {
        var _a;
        const { checkedRowKeys } = props;
        const sourceKeys = checkedRowKeys === undefined
            ? uncontrolledCheckedRowKeysRef.value
            : checkedRowKeys;
        if (((_a = selectionColumnRef.value) === null || _a === void 0 ? void 0 : _a.multiple) === false) {
            return {
                checkedKeys: sourceKeys.slice(0, 1),
                indeterminateKeys: []
            };
        }
        return treeMateRef.value.getCheckedKeys(sourceKeys, {
            cascade: props.cascade,
            allowNotLoaded: props.allowCheckingNotLoaded
        });
    });
    const mergedCheckedRowKeysRef = (0, vue_1.computed)(() => mergedCheckState.value.checkedKeys);
    const mergedInderminateRowKeysRef = (0, vue_1.computed)(() => mergedCheckState.value.indeterminateKeys);
    const mergedCheckedRowKeySetRef = (0, vue_1.computed)(() => {
        return new Set(mergedCheckedRowKeysRef.value);
    });
    const mergedInderminateRowKeySetRef = (0, vue_1.computed)(() => {
        return new Set(mergedInderminateRowKeysRef.value);
    });
    const countOfCurrentPageCheckedRowsRef = (0, vue_1.computed)(() => {
        const { value: mergedCheckedRowKeySet } = mergedCheckedRowKeySetRef;
        return paginatedDataRef.value.reduce((total, tmNode) => {
            const { key, disabled } = tmNode;
            return total + (!disabled && mergedCheckedRowKeySet.has(key) ? 1 : 0);
        }, 0);
    });
    const countOfCurrentPageDisabledRowsRef = (0, vue_1.computed)(() => {
        return paginatedDataRef.value.filter(item => item.disabled).length;
    });
    const someRowsCheckedRef = (0, vue_1.computed)(() => {
        const { length } = paginatedDataRef.value;
        const { value: mergedInderminateRowKeySet } = mergedInderminateRowKeySetRef;
        return ((countOfCurrentPageCheckedRowsRef.value > 0
            && countOfCurrentPageCheckedRowsRef.value
                < length - countOfCurrentPageDisabledRowsRef.value)
            || paginatedDataRef.value.some(rowData => mergedInderminateRowKeySet.has(rowData.key)));
    });
    const allRowsCheckedRef = (0, vue_1.computed)(() => {
        const { length } = paginatedDataRef.value;
        return (countOfCurrentPageCheckedRowsRef.value !== 0
            && countOfCurrentPageCheckedRowsRef.value
                === length - countOfCurrentPageDisabledRowsRef.value);
    });
    const headerCheckboxDisabledRef = (0, vue_1.computed)(() => {
        return paginatedDataRef.value.length === 0;
    });
    function doUpdateCheckedRowKeys(keys, row, action) {
        const { 'onUpdate:checkedRowKeys': _onUpdateCheckedRowKeys, onUpdateCheckedRowKeys, onCheckedRowKeysChange } = props;
        const rows = [];
        const { value: { getNode } } = treeMateRef;
        keys.forEach((key) => {
            var _a;
            const row = (_a = getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode;
            rows.push(row);
        });
        if (_onUpdateCheckedRowKeys) {
            (0, _utils_1.call)(_onUpdateCheckedRowKeys, keys, rows, { row, action });
        }
        if (onUpdateCheckedRowKeys) {
            (0, _utils_1.call)(onUpdateCheckedRowKeys, keys, rows, { row, action });
        }
        if (onCheckedRowKeysChange) {
            (0, _utils_1.call)(onCheckedRowKeysChange, keys, rows, { row, action });
        }
        uncontrolledCheckedRowKeysRef.value = keys;
    }
    function doCheck(rowKey, single = false, rowInfo) {
        if (props.loading)
            return;
        if (single) {
            doUpdateCheckedRowKeys(Array.isArray(rowKey) ? rowKey.slice(0, 1) : [rowKey], rowInfo, 'check');
            return;
        }
        doUpdateCheckedRowKeys(treeMateRef.value.check(rowKey, mergedCheckedRowKeysRef.value, {
            cascade: props.cascade,
            allowNotLoaded: props.allowCheckingNotLoaded
        }).checkedKeys, rowInfo, 'check');
    }
    function doUncheck(rowKey, rowInfo) {
        if (props.loading)
            return;
        doUpdateCheckedRowKeys(treeMateRef.value.uncheck(rowKey, mergedCheckedRowKeysRef.value, {
            cascade: props.cascade,
            allowNotLoaded: props.allowCheckingNotLoaded
        }).checkedKeys, rowInfo, 'uncheck');
    }
    function doCheckAll(checkWholeTable = false) {
        const { value: column } = selectionColumnRef;
        if (!column || props.loading)
            return;
        const rowKeysToCheck = [];
        (checkWholeTable
            ? treeMateRef.value.treeNodes
            : paginatedDataRef.value).forEach((tmNode) => {
            if (!tmNode.disabled) {
                rowKeysToCheck.push(tmNode.key);
            }
        });
        // alway cascade, to emit correct row keys
        doUpdateCheckedRowKeys(treeMateRef.value.check(rowKeysToCheck, mergedCheckedRowKeysRef.value, {
            cascade: true,
            allowNotLoaded: props.allowCheckingNotLoaded
        }).checkedKeys, undefined, 'checkAll');
    }
    function doUncheckAll(checkWholeTable = false) {
        const { value: column } = selectionColumnRef;
        if (!column || props.loading)
            return;
        const rowKeysToUncheck = [];
        (checkWholeTable
            ? treeMateRef.value.treeNodes
            : paginatedDataRef.value).forEach((tmNode) => {
            if (!tmNode.disabled) {
                rowKeysToUncheck.push(tmNode.key);
            }
        });
        // alway cascade, to emit correct row keys
        doUpdateCheckedRowKeys(treeMateRef.value.uncheck(rowKeysToUncheck, mergedCheckedRowKeysRef.value, {
            cascade: true,
            allowNotLoaded: props.allowCheckingNotLoaded
        }).checkedKeys, undefined, 'uncheckAll');
    }
    return {
        mergedCheckedRowKeySetRef,
        mergedCheckedRowKeysRef,
        mergedInderminateRowKeySetRef,
        someRowsCheckedRef,
        allRowsCheckedRef,
        headerCheckboxDisabledRef,
        doUpdateCheckedRowKeys,
        doCheckAll,
        doUncheckAll,
        doCheck,
        doUncheck
    };
}
