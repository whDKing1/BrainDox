"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
exports.default = (0, vue_1.defineComponent)({
    name: 'LayoutToggleButton',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        onClick: Function
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-layout-toggle-button`, onClick: this.onClick },
            (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, {
                default: () => (0, vue_1.h)(icons_1.ChevronRightIcon, null)
            })));
    }
});
