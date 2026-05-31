"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseMenuMask',
    props: {
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-menu-mask', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
        const messageRef = (0, vue_1.ref)(null);
        let timerId = null;
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        (0, vue_1.onBeforeUnmount)(() => {
            if (timerId !== null) {
                window.clearTimeout(timerId);
            }
        });
        const exposedRef = {
            showOnce(message, duration = 1500) {
                if (timerId)
                    window.clearTimeout(timerId);
                uncontrolledShowRef.value = true;
                messageRef.value = message;
                timerId = window.setTimeout(() => {
                    uncontrolledShowRef.value = false;
                    messageRef.value = null;
                }, duration);
            }
        };
        return Object.assign({ message: messageRef, show: uncontrolledShowRef }, exposedRef);
    },
    render() {
        return ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition" }, {
            default: () => this.show ? ((0, vue_1.h)("div", { class: `${this.clsPrefix}-base-menu-mask` }, this.message)) : null
        }));
    }
});
