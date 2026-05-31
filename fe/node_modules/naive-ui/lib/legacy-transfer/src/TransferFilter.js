"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const input_1 = require("../../input");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'TransferFilter',
    props: {
        value: String,
        placeholder: String,
        disabled: Boolean,
        onFocus: {
            type: Function,
            required: true
        },
        onBlur: {
            type: Function,
            required: true
        },
        onUpdateValue: {
            type: Function,
            required: true
        }
    },
    setup() {
        const { mergedThemeRef, mergedClsPrefixRef } = (0, vue_1.inject)(interface_1.transferInjectionKey);
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedTheme: mergedThemeRef
        };
    },
    render() {
        const { mergedTheme, mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-filter` },
            (0, vue_1.h)(input_1.NInput, { value: this.value, onUpdateValue: this.onUpdateValue, disabled: this.disabled, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, clearable: true, size: "small", placeholder: this.placeholder, onFocus: this.onFocus, onBlur: this.onBlur }, {
                'clear-icon-placeholder': () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-legacy-transfer-icon` }, { default: () => (0, vue_1.h)(icons_1.SearchIcon, null) }))
            })));
    }
});
