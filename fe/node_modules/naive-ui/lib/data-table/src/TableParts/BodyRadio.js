"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const radio_1 = require("../../../radio");
const interface_1 = require("../interface");
// Extract the radio to avoid useless rendering in table body
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableBodyRadio',
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
        const { mergedCheckedRowKeySetRef, componentId } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        return () => {
            const { rowKey } = props;
            return ((0, vue_1.h)(radio_1.NRadio, { name: componentId, disabled: props.disabled, checked: mergedCheckedRowKeySetRef.value.has(rowKey), onUpdateChecked: props.onUpdateChecked }));
        };
    }
});
