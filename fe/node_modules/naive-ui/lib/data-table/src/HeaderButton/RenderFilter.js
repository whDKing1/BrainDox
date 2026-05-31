"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableRenderFilter',
    props: {
        render: {
            type: Function,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    render() {
        const { render, active, show } = this;
        return render({
            active,
            show
        });
    }
});
