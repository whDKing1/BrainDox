"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'DropdownDivider',
    props: {
        clsPrefix: {
            type: String,
            required: true
        }
    },
    render() {
        return (0, vue_1.h)("div", { class: `${this.clsPrefix}-dropdown-divider` });
    }
});
