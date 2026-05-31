"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'TimePickerPanelCol',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        activeValue: {
            type: [Number, String],
            default: null
        },
        // It should be required but vue's type seems to have bugs
        onItemClick: Function
    },
    render() {
        const { activeValue, onItemClick, clsPrefix } = this;
        return this.data.map((item) => {
            const { label, disabled, value } = item;
            const active = activeValue === value;
            return ((0, vue_1.h)("div", { key: label, "data-active": active ? '' : null, class: [
                    `${clsPrefix}-time-picker-col__item`,
                    active && `${clsPrefix}-time-picker-col__item--active`,
                    disabled && `${clsPrefix}-time-picker-col__item--disabled`
                ], onClick: onItemClick && !disabled
                    ? () => {
                        onItemClick(value);
                    }
                    : undefined }, label));
        });
    }
});
