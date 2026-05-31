"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseWave',
    props: {
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-wave', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
        const selfRef = (0, vue_1.ref)(null);
        const activeRef = (0, vue_1.ref)(false);
        let animationTimerId = null;
        (0, vue_1.onBeforeUnmount)(() => {
            if (animationTimerId !== null) {
                window.clearTimeout(animationTimerId);
            }
        });
        return {
            active: activeRef,
            selfRef,
            play() {
                if (animationTimerId !== null) {
                    window.clearTimeout(animationTimerId);
                    activeRef.value = false;
                    animationTimerId = null;
                }
                void (0, vue_1.nextTick)(() => {
                    var _a;
                    void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
                    activeRef.value = true;
                    animationTimerId = window.setTimeout(() => {
                        activeRef.value = false;
                        animationTimerId = null;
                    }, 1000);
                });
            }
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { ref: "selfRef", "aria-hidden": true, class: [
                `${clsPrefix}-base-wave`,
                this.active && `${clsPrefix}-base-wave--active`
            ] }));
    }
});
