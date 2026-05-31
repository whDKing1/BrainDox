"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const input_1 = require("../../input");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'DynamicInputPairPreset',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            default: () => ({
                key: '',
                value: ''
            })
        },
        disabled: Boolean,
        parentPath: String,
        path: String,
        onUpdateValue: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { mergedThemeRef, keyPlaceholderRef, valuePlaceholderRef } = (0, vue_1.inject)(interface_1.dynamicInputInjectionKey);
        return {
            mergedTheme: mergedThemeRef,
            keyPlaceholder: keyPlaceholderRef,
            valuePlaceholder: valuePlaceholderRef,
            handleKeyInput(key) {
                props.onUpdateValue({
                    key,
                    value: props.value.value
                });
            },
            handleValueInput(value) {
                props.onUpdateValue({
                    key: props.value.key,
                    value
                });
            }
        };
    },
    render() {
        const { mergedTheme, keyPlaceholder, valuePlaceholder, value, clsPrefix, disabled } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-dynamic-input-preset-pair` },
            (0, vue_1.h)(input_1.NInput, { theme: mergedTheme.peers.Input, "theme-overrides": mergedTheme.peerOverrides.Input, value: value.key, class: `${clsPrefix}-dynamic-input-pair-input`, placeholder: keyPlaceholder, onUpdateValue: this.handleKeyInput, disabled: disabled }),
            (0, vue_1.h)(input_1.NInput, { theme: mergedTheme.peers.Input, "theme-overrides": mergedTheme.peerOverrides.Input, value: value.value, class: `${clsPrefix}-dynamic-input-pair-input`, placeholder: valuePlaceholder, onUpdateValue: this.handleValueInput, disabled: disabled })));
    }
});
