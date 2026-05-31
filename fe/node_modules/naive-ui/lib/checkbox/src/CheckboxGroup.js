"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkboxGroupProps = exports.checkboxGroupInjectionKey = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
exports.checkboxGroupInjectionKey = (0, _utils_1.createInjectionKey)('n-checkbox-group');
exports.checkboxGroupProps = {
    min: Number,
    max: Number,
    size: String,
    value: Array,
    defaultValue: {
        type: Array,
        default: null
    },
    disabled: {
        type: Boolean,
        default: undefined
    },
    'onUpdate:value': [Function, Array],
    onUpdateValue: [Function, Array],
    // deprecated
    onChange: [Function, Array]
};
exports.default = (0, vue_1.defineComponent)({
    name: 'CheckboxGroup',
    props: exports.checkboxGroupProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('checkbox-group', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const formItem = (0, _mixins_1.useFormItem)(props);
        const { mergedSizeRef, mergedDisabledRef } = formItem;
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.computed)(() => props.value);
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const checkedCount = (0, vue_1.computed)(() => {
            var _a;
            return ((_a = mergedValueRef.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
        });
        const valueSetRef = (0, vue_1.computed)(() => {
            if (Array.isArray(mergedValueRef.value)) {
                return new Set(mergedValueRef.value);
            }
            return new Set();
        });
        function toggleCheckbox(checked, checkboxValue) {
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            const { onChange, 'onUpdate:value': _onUpdateValue, onUpdateValue } = props;
            if (Array.isArray(mergedValueRef.value)) {
                const groupValue = Array.from(mergedValueRef.value);
                const index = groupValue.findIndex(value => value === checkboxValue);
                if (checked) {
                    if (!~index) {
                        groupValue.push(checkboxValue);
                        if (onUpdateValue) {
                            (0, _utils_1.call)(onUpdateValue, groupValue, {
                                actionType: 'check',
                                value: checkboxValue
                            });
                        }
                        if (_onUpdateValue) {
                            (0, _utils_1.call)(_onUpdateValue, groupValue, {
                                actionType: 'check',
                                value: checkboxValue
                            });
                        }
                        nTriggerFormInput();
                        nTriggerFormChange();
                        uncontrolledValueRef.value = groupValue;
                        // deprecated
                        if (onChange)
                            (0, _utils_1.call)(onChange, groupValue);
                    }
                }
                else {
                    if (~index) {
                        groupValue.splice(index, 1);
                        if (onUpdateValue) {
                            (0, _utils_1.call)(onUpdateValue, groupValue, {
                                actionType: 'uncheck',
                                value: checkboxValue
                            });
                        }
                        if (_onUpdateValue) {
                            (0, _utils_1.call)(_onUpdateValue, groupValue, {
                                actionType: 'uncheck',
                                value: checkboxValue
                            });
                        }
                        if (onChange)
                            (0, _utils_1.call)(onChange, groupValue); // deprecated
                        uncontrolledValueRef.value = groupValue;
                        nTriggerFormInput();
                        nTriggerFormChange();
                    }
                }
            }
            else {
                if (checked) {
                    if (onUpdateValue) {
                        (0, _utils_1.call)(onUpdateValue, [checkboxValue], {
                            actionType: 'check',
                            value: checkboxValue
                        });
                    }
                    if (_onUpdateValue) {
                        (0, _utils_1.call)(_onUpdateValue, [checkboxValue], {
                            actionType: 'check',
                            value: checkboxValue
                        });
                    }
                    if (onChange)
                        (0, _utils_1.call)(onChange, [checkboxValue]); // deprecated
                    uncontrolledValueRef.value = [checkboxValue];
                    nTriggerFormInput();
                    nTriggerFormChange();
                }
                else {
                    if (onUpdateValue) {
                        (0, _utils_1.call)(onUpdateValue, [], {
                            actionType: 'uncheck',
                            value: checkboxValue
                        });
                    }
                    if (_onUpdateValue) {
                        (0, _utils_1.call)(_onUpdateValue, [], {
                            actionType: 'uncheck',
                            value: checkboxValue
                        });
                    }
                    if (onChange)
                        (0, _utils_1.call)(onChange, []); // deprecated
                    uncontrolledValueRef.value = [];
                    nTriggerFormInput();
                    nTriggerFormChange();
                }
            }
        }
        (0, vue_1.provide)(exports.checkboxGroupInjectionKey, {
            checkedCountRef: checkedCount,
            maxRef: (0, vue_1.toRef)(props, 'max'),
            minRef: (0, vue_1.toRef)(props, 'min'),
            valueSetRef,
            disabledRef: mergedDisabledRef,
            mergedSizeRef,
            toggleCheckbox
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        return ((0, vue_1.h)("div", { class: `${this.mergedClsPrefix}-checkbox-group`, role: "group" }, this.$slots));
    }
});
