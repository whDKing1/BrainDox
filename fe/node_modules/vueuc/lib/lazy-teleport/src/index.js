"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vooks_1 = require("vooks");
const v_node_1 = require("../../shared/v-node");
exports.default = (0, vue_1.defineComponent)({
    name: 'LazyTeleport',
    props: {
        to: {
            type: [String, Object],
            default: undefined
        },
        disabled: Boolean,
        show: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        return {
            showTeleport: (0, vooks_1.useFalseUntilTruthy)((0, vue_1.toRef)(props, 'show')),
            mergedTo: (0, vue_1.computed)(() => {
                const { to } = props;
                return to !== null && to !== void 0 ? to : 'body';
            })
        };
    },
    render() {
        return this.showTeleport
            ? this.disabled
                ? (0, v_node_1.getSlot)('lazy-teleport', this.$slots)
                : (0, vue_1.h)(vue_1.Teleport, {
                    disabled: this.disabled,
                    to: this.mergedTo
                }, (0, v_node_1.getSlot)('lazy-teleport', this.$slots))
            : null;
    }
});
