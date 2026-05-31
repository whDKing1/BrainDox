"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const checkbox_1 = require("../../checkbox");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'TransferHeader',
    props: {
        source: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            required: true
        },
        title: String
    },
    setup(props) {
        const { srcOptsRef, tgtOptsRef, srcCheckedStatusRef, tgtCheckedStatusRef, srcCheckedValuesRef, tgtCheckedValuesRef, mergedThemeRef, disabledRef, mergedClsPrefixRef } = (0, vue_1.inject)(interface_1.transferInjectionKey);
        const checkboxPropsRef = (0, vue_1.computed)(() => {
            const { source } = props;
            if (source) {
                return srcCheckedStatusRef.value;
            }
            else {
                return tgtCheckedStatusRef.value;
            }
        });
        return () => {
            const { source } = props;
            const { value: checkboxProps } = checkboxPropsRef;
            const { value: mergedTheme } = mergedThemeRef;
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-header` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-header__checkbox` },
                    (0, vue_1.h)(checkbox_1.NCheckbox, { theme: mergedTheme.peers.Checkbox, themeOverrides: mergedTheme.peerOverrides.Checkbox, checked: checkboxProps.checked, indeterminate: checkboxProps.indeterminate, disabled: checkboxProps.disabled || disabledRef.value, onUpdateChecked: props.onChange })),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-header__header` }, props.title),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-header__extra` },
                    source
                        ? srcCheckedValuesRef.value.length
                        : tgtCheckedValuesRef.value.length,
                    "/",
                    source ? srcOptsRef.value.length : tgtOptsRef.value.length)));
        };
    }
});
