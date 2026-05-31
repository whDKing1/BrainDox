"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        onClick: Function
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { onClick: this.onClick, class: `${clsPrefix}-layout-toggle-bar` },
            (0, vue_1.h)("div", { class: `${clsPrefix}-layout-toggle-bar__top` }),
            (0, vue_1.h)("div", { class: `${clsPrefix}-layout-toggle-bar__bottom` })));
    }
});
