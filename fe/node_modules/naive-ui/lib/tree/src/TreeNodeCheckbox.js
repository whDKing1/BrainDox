"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const checkbox_1 = require("../../checkbox");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NTreeNodeCheckbox',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        indent: {
            type: Number,
            required: true
        },
        right: Boolean,
        focusable: Boolean,
        disabled: Boolean,
        checked: Boolean,
        indeterminate: Boolean,
        onCheck: Function
    },
    setup(props) {
        const NTree = (0, vue_1.inject)(interface_1.treeInjectionKey);
        function doCheck(value) {
            const { onCheck } = props;
            if (onCheck) {
                onCheck(value);
            }
        }
        function handleUpdateValue(value) {
            doCheck(value);
        }
        return {
            handleUpdateValue,
            mergedTheme: NTree.mergedThemeRef
        };
    },
    render() {
        const { clsPrefix, mergedTheme, checked, indeterminate, disabled, focusable, indent, handleUpdateValue } = this;
        return ((0, vue_1.h)("span", { class: [
                `${clsPrefix}-tree-node-checkbox`,
                this.right && `${clsPrefix}-tree-node-checkbox--right`
            ], style: {
                width: `${indent}px`
            }, "data-checkbox": true },
            (0, vue_1.h)(checkbox_1.NCheckbox, { focusable: focusable, disabled: disabled, theme: mergedTheme.peers.Checkbox, themeOverrides: mergedTheme.peerOverrides.Checkbox, checked: checked, indeterminate: indeterminate, onUpdateChecked: handleUpdateValue })));
    }
});
