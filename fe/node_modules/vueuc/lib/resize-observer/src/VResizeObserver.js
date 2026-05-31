"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const delegate_1 = __importDefault(require("./delegate"));
const shared_1 = require("../../shared");
exports.default = (0, vue_1.defineComponent)({
    name: 'ResizeObserver',
    props: {
        onResize: Function
    },
    setup(props) {
        let registered = false;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const proxy = (0, vue_1.getCurrentInstance)().proxy;
        function handleResize(entry) {
            const { onResize } = props;
            if (onResize !== undefined)
                onResize(entry);
        }
        (0, vue_1.onMounted)(() => {
            const el = proxy.$el;
            if (el === undefined) {
                (0, shared_1.warn)('resize-observer', '$el does not exist.');
                return;
            }
            if (el.nextElementSibling !== el.nextSibling) {
                if (el.nodeType === 3 && el.nodeValue !== '') {
                    (0, shared_1.warn)('resize-observer', '$el can not be observed (it may be a text node).');
                    return;
                }
            }
            if (el.nextElementSibling !== null) {
                delegate_1.default.registerHandler(el.nextElementSibling, handleResize);
                registered = true;
            }
        });
        (0, vue_1.onBeforeUnmount)(() => {
            if (registered) {
                delegate_1.default.unregisterHandler(proxy.$el.nextElementSibling);
            }
        });
    },
    render() {
        return (0, vue_1.renderSlot)(this.$slots, 'default');
    }
});
