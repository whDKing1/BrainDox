"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseIcon',
    props: {
        role: String,
        ariaLabel: String,
        ariaDisabled: {
            type: Boolean,
            default: undefined
        },
        ariaHidden: {
            type: Boolean,
            default: undefined
        },
        clsPrefix: {
            type: String,
            required: true
        },
        onClick: Function,
        onMousedown: Function,
        onMouseup: Function
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-icon', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
    },
    render() {
        return ((0, vue_1.h)("i", { class: `${this.clsPrefix}-base-icon`, onClick: this.onClick, onMousedown: this.onMousedown, onMouseup: this.onMouseup, role: this.role, "aria-label": this.ariaLabel, "aria-hidden": this.ariaHidden, "aria-disabled": this.ariaDisabled }, this.$slots));
    }
});
