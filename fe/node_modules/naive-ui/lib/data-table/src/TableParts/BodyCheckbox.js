"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const checkbox_1 = require("../../../checkbox");
const interface_1 = require("../interface");
// Extract the checkbox to avoid useless rendering in table body
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableBodyCheckbox',
    props: {
        rowKey: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        },
        onUpdateChecked: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { mergedCheckedRowKeySetRef, mergedInderminateRowKeySetRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        return () => {
            const { rowKey } = props;
            return ((0, vue_1.h)(checkbox_1.NCheckbox, { privateInsideTable: true, disabled: props.disabled, indeterminate: mergedInderminateRowKeySetRef.value.has(rowKey), checked: mergedCheckedRowKeySetRef.value.has(rowKey), onUpdateChecked: props.onUpdateChecked }));
        };
    }
});
