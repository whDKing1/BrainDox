"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../../_internal");
const _mixins_1 = require("../../../_mixins");
const button_1 = require("../../../button");
const checkbox_1 = require("../../../checkbox");
const radio_1 = require("../../../radio");
const interface_1 = require("../interface");
const utils_1 = require("../utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableFilterMenu',
    props: {
        column: {
            type: Object,
            required: true
        },
        radioGroupName: {
            type: String,
            required: true
        },
        multiple: {
            type: Boolean,
            required: true
        },
        value: {
            type: [Array, String, Number],
            default: null
        },
        options: {
            type: Array,
            required: true
        },
        onConfirm: {
            type: Function,
            required: true
        },
        onClear: {
            type: Function,
            required: true
        },
        onChange: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { mergedClsPrefixRef: mergedClsPrefixRefRtl, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('DataTable', mergedRtlRef, mergedClsPrefixRefRtl);
        const { mergedClsPrefixRef, mergedThemeRef, localeRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        // to be compared with changed value
        // const initialValueRef = ref(props.value)
        const temporalValueRef = (0, vue_1.ref)(props.value);
        const checkboxGroupValueRef = (0, vue_1.computed)(() => {
            const { value: temporalValue } = temporalValueRef;
            if (!Array.isArray(temporalValue))
                return null;
            return temporalValue;
        });
        const radioGroupValueRef = (0, vue_1.computed)(() => {
            const { value: temporalValue } = temporalValueRef;
            if ((0, utils_1.shouldUseArrayInSingleMode)(props.column)) {
                return ((Array.isArray(temporalValue)
                    && temporalValue.length
                    && temporalValue[0])
                    || null);
            }
            if (!Array.isArray(temporalValue))
                return temporalValue;
            return null;
        });
        function doChange(value) {
            // May need to check if equal
            ;
            props.onChange(value);
        }
        function handleChange(value) {
            if (props.multiple && Array.isArray(value)) {
                temporalValueRef.value = value;
            }
            else if ((0, utils_1.shouldUseArrayInSingleMode)(props.column)
                && !Array.isArray(value)) {
                /** this branch is for compatibility */
                temporalValueRef.value = [value];
            }
            else {
                temporalValueRef.value = value;
            }
        }
        function handleConfirmClick() {
            doChange(temporalValueRef.value);
            props.onConfirm();
        }
        function handleClearClick() {
            if (props.multiple || (0, utils_1.shouldUseArrayInSingleMode)(props.column)) {
                doChange([]);
            }
            else {
                doChange(null);
            }
            props.onClear();
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            mergedTheme: mergedThemeRef,
            locale: localeRef,
            checkboxGroupValue: checkboxGroupValueRef,
            radioGroupValue: radioGroupValueRef,
            handleChange,
            handleConfirmClick,
            handleClearClick
        };
    },
    render() {
        const { mergedTheme, locale, mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-data-table-filter-menu`,
                this.rtlEnabled && `${mergedClsPrefix}-data-table-filter-menu--rtl`
            ] },
            (0, vue_1.h)(_internal_1.NScrollbar, null, {
                default: () => {
                    const { checkboxGroupValue, handleChange } = this;
                    return this.multiple ? ((0, vue_1.h)(checkbox_1.NCheckboxGroup, { value: checkboxGroupValue, class: `${mergedClsPrefix}-data-table-filter-menu__group`, onUpdateValue: handleChange }, {
                        default: () => this.options.map((option) => {
                            return ((0, vue_1.h)(checkbox_1.NCheckbox, { key: option.value, theme: mergedTheme.peers.Checkbox, themeOverrides: mergedTheme.peerOverrides.Checkbox, value: option.value }, { default: () => option.label }));
                        })
                    })) : ((0, vue_1.h)(radio_1.NRadioGroup, { name: this.radioGroupName, class: `${mergedClsPrefix}-data-table-filter-menu__group`, value: this.radioGroupValue, onUpdateValue: this.handleChange }, {
                        default: () => this.options.map(option => ((0, vue_1.h)(radio_1.NRadio, { key: option.value, value: option.value, theme: mergedTheme.peers.Radio, themeOverrides: mergedTheme.peerOverrides.Radio }, { default: () => option.label })))
                    }));
                }
            }),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-data-table-filter-menu__action` },
                (0, vue_1.h)(button_1.NButton, { size: "tiny", theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, onClick: this.handleClearClick }, { default: () => locale.clear }),
                (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, type: "primary", size: "tiny", onClick: this.handleConfirmClick }, { default: () => locale.confirm }))));
    }
});
