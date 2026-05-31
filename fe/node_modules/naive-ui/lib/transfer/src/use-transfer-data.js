"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransferData = useTransferData;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
function useTransferData(props) {
    const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
    const mergedValueRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'value'), uncontrolledValueRef);
    const optionsMapRef = (0, vue_1.computed)(() => {
        const map = new Map();
        (props.options || []).forEach(opt => map.set(opt.value, opt));
        return map;
    });
    const targetValueSetRef = (0, vue_1.computed)(() => new Set(mergedValueRef.value || []));
    const targetOptionsRef = (0, vue_1.computed)(() => {
        const optionMap = optionsMapRef.value;
        const targetOptions = [];
        (mergedValueRef.value || []).forEach((v) => {
            const option = optionMap.get(v);
            if (option) {
                targetOptions.push(option);
            }
        });
        return targetOptions;
    });
    const srcPatternRef = (0, vue_1.ref)('');
    const tgtPatternRef = (0, vue_1.ref)('');
    const mergedSrcFilterableRef = (0, vue_1.computed)(() => {
        return props.sourceFilterable || !!props.filterable;
    });
    const filteredSrcOptionsRef = (0, vue_1.computed)(() => {
        const { showSelected, options, filter } = props;
        if (!mergedSrcFilterableRef.value) {
            if (showSelected) {
                return options;
            }
            else {
                return options.filter(option => !targetValueSetRef.value.has(option.value));
            }
        }
        return options.filter((option) => {
            return (filter(srcPatternRef.value, option, 'source')
                && (showSelected || !targetValueSetRef.value.has(option.value)));
        });
    });
    const filteredTgtOptionsRef = (0, vue_1.computed)(() => {
        if (!props.targetFilterable)
            return targetOptionsRef.value;
        const { filter } = props;
        return targetOptionsRef.value.filter(opt => filter(tgtPatternRef.value, opt, 'target'));
    });
    const mergedValueSetRef = (0, vue_1.computed)(() => {
        const { value } = mergedValueRef;
        if (value === null)
            return new Set();
        return new Set(value);
    });
    const valueSetForCheckAllRef = (0, vue_1.computed)(() => {
        const values = new Set(mergedValueSetRef.value);
        filteredSrcOptionsRef.value.forEach((option) => {
            if (!option.disabled && !values.has(option.value)) {
                values.add(option.value);
            }
        });
        return values;
    });
    const valueSetForUncheckAllRef = (0, vue_1.computed)(() => {
        const values = new Set(mergedValueSetRef.value);
        filteredSrcOptionsRef.value.forEach((option) => {
            if (!option.disabled && values.has(option.value)) {
                values.delete(option.value);
            }
        });
        return values;
    });
    const valueSetForClearRef = (0, vue_1.computed)(() => {
        const values = new Set(mergedValueSetRef.value);
        filteredTgtOptionsRef.value.forEach((option) => {
            if (!option.disabled) {
                values.delete(option.value);
            }
        });
        return values;
    });
    const canNotSelectAnythingRef = (0, vue_1.computed)(() => {
        return filteredSrcOptionsRef.value.every(option => option.disabled);
    });
    const allCheckedRef = (0, vue_1.computed)(() => {
        if (!filteredSrcOptionsRef.value.length) {
            return false;
        }
        const mergedValueSet = mergedValueSetRef.value;
        return filteredSrcOptionsRef.value.every(option => option.disabled || mergedValueSet.has(option.value));
    });
    const canBeClearedRef = (0, vue_1.computed)(() => {
        return filteredTgtOptionsRef.value.some(option => !option.disabled);
    });
    function handleSrcFilterUpdateValue(value) {
        srcPatternRef.value = value !== null && value !== void 0 ? value : '';
    }
    function handleTgtFilterUpdateValue(value) {
        tgtPatternRef.value = value !== null && value !== void 0 ? value : '';
    }
    return {
        uncontrolledValueRef,
        mergedValueRef,
        targetValueSetRef,
        valueSetForCheckAllRef,
        valueSetForUncheckAllRef,
        valueSetForClearRef,
        filteredTgtOptionsRef,
        filteredSrcOptionsRef,
        targetOptionsRef,
        canNotSelectAnythingRef,
        canBeClearedRef,
        allCheckedRef,
        srcPatternRef,
        tgtPatternRef,
        mergedSrcFilterableRef,
        handleSrcFilterUpdateValue,
        handleTgtFilterUpdateValue
    };
}
