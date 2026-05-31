"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const input_1 = require("../../input");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'DynamicInputInputPreset',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        parentPath: String,
        path: String,
        onUpdateValue: {
            type: Function,
            required: true
        }
    },
    setup() {
        const { mergedThemeRef, placeholderRef } = (0, vue_1.inject)(interface_1.dynamicInputInjectionKey);
        return {
            mergedTheme: mergedThemeRef,
            placeholder: placeholderRef
        };
    },
    render() {
        const { mergedTheme, placeholder, value, clsPrefix, onUpdateValue, disabled } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-dynamic-input-preset-input` },
            (0, vue_1.h)(input_1.NInput, { theme: mergedTheme.peers.Input, "theme-overrides": mergedTheme.peerOverrides.Input, value: value, placeholder: placeholder, onUpdateValue: onUpdateValue, disabled: disabled })));
    }
});
