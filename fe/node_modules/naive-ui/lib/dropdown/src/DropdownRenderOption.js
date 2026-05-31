"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'DropdownRenderOption',
    props: {
        tmNode: {
            type: Object,
            required: true
        }
    },
    render() {
        const { rawNode: { render, props } } = this.tmNode;
        return (0, vue_1.h)('div', props, [render === null || render === void 0 ? void 0 : render()]);
    }
});
