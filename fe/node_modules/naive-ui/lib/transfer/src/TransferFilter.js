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
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-filter` },
            (0, vue_1.h)(input_1.NInput, { value: this.value, onUpdateValue: this.onUpdateValue, disabled: this.disabled, placeholder: this.placeholder, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, clearable: true, size: "small" }, {
                'clear-icon-placeholder': () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.SearchIcon, null) }))
            })));
    }
});
