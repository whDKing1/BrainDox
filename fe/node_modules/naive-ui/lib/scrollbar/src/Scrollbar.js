"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollbarProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
exports.scrollbarProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { trigger: String, xScrollable: Boolean, onScroll: Function, contentClass: String, contentStyle: [Object, String], size: Number, yPlacement: {
        type: String,
        default: 'right'
    }, xPlacement: {
        type: String,
        default: 'bottom'
    } });
const Scrollbar = (0, vue_1.defineComponent)({
    name: 'Scrollbar',
    props: exports.scrollbarProps,
    setup() {
        const scrollbarInstRef = (0, vue_1.ref)(null);
        const exposedMethods = {
            scrollTo: (...args) => {
                var _a;
                (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(args[0], args[1]);
            },
            scrollBy: (...args) => {
                var _a;
                (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollBy(args[0], args[1]);
            }
        };
        return Object.assign(Object.assign({}, exposedMethods), { scrollbarInstRef });
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NScrollbar, Object.assign({ ref: "scrollbarInstRef" }, this.$props), this.$slots));
    }
});
exports.default = Scrollbar;
