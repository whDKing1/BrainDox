"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableRenderSorter',
    props: {
        render: {
            type: Function,
            required: true
        },
        order: {
            // asc, desc
            type: [String, Boolean],
            default: false
        }
    },
    render() {
        const { render, order } = this;
        return render({
            order
        });
    }
});
