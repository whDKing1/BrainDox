"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.affixPropKeys = exports.affixProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
exports.affixProps = {
    listenTo: [String, Object, Function],
    top: Number,
    bottom: Number,
    triggerTop: Number,
    triggerBottom: Number,
    position: {
        type: String,
        default: 'fixed'
    },
    // deprecated
    offsetTop: {
        type: Number,
        validator: () => {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('affix', '`offset-top` is deprecated, please use `trigger-top` instead.');
            }
            return true;
        },
        default: undefined
    },
    offsetBottom: {
        type: Number,
        validator: () => {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('affix', '`offset-bottom` is deprecated, please use `trigger-bottom` instead.');
            }
            return true;
        },
        default: undefined
    },
    target: {
        type: Function,
        validator: () => {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('affix', '`target` is deprecated, please use `listen-to` instead.');
            }
            return true;
        },
        default: undefined
    }
};
exports.affixPropKeys = (0, _utils_1.keysOf)(exports.affixProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Affix',
    props: exports.affixProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useStyle)('-affix', index_cssr_1.default, mergedClsPrefixRef);
        let scrollTarget = null;
        const stickToTopRef = (0, vue_1.ref)(false);
        const stickToBottomRef = (0, vue_1.ref)(false);
        const bottomAffixedTriggerScrollTopRef = (0, vue_1.ref)(null);
        const topAffixedTriggerScrollTopRef = (0, vue_1.ref)(null);
        const affixedRef = (0, vue_1.computed)(() => {
            return stickToBottomRef.value || stickToTopRef.value;
        });
        const mergedOffsetTopRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = props.triggerTop) !== null && _a !== void 0 ? _a : props.offsetTop) !== null && _b !== void 0 ? _b : props.top;
        });
        const mergedTopRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = props.top) !== null && _a !== void 0 ? _a : props.triggerTop) !== null && _b !== void 0 ? _b : props.offsetTop;
        });
        const mergedBottomRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = props.bottom) !== null && _a !== void 0 ? _a : props.triggerBottom) !== null && _b !== void 0 ? _b : props.offsetBottom;
        });
        const mergedOffsetBottomRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = props.triggerBottom) !== null && _a !== void 0 ? _a : props.offsetBottom) !== null && _b !== void 0 ? _b : props.bottom;
        });
        const selfRef = (0, vue_1.ref)(null);
        const init = () => {
            const { target: getScrollTarget, listenTo } = props;
            if (getScrollTarget) {
                // deprecated
                scrollTarget = getScrollTarget();
            }
            else if (listenTo) {
                scrollTarget = (0, seemly_1.unwrapElement)(listenTo);
            }
            else {
                scrollTarget = document;
            }
            if (scrollTarget) {
                scrollTarget.addEventListener('scroll', handleScroll);
                handleScroll();
            }
            else if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('affix', 'Target to be listened to is not valid.');
            }
        };
        function handleScroll() {
            (0, seemly_1.beforeNextFrameOnce)(_handleScroll);
        }
        function _handleScroll() {
            const { value: selfEl } = selfRef;
            if (!scrollTarget || !selfEl)
                return;
            const scrollTop = (0, utils_1.getScrollTop)(scrollTarget);
            if (affixedRef.value) {
                if (topAffixedTriggerScrollTopRef.value !== null
                    && scrollTop < topAffixedTriggerScrollTopRef.value) {
                    stickToTopRef.value = false;
                    topAffixedTriggerScrollTopRef.value = null;
                }
                if (bottomAffixedTriggerScrollTopRef.value !== null
                    && scrollTop > bottomAffixedTriggerScrollTopRef.value) {
                    stickToBottomRef.value = false;
                    bottomAffixedTriggerScrollTopRef.value = null;
                }
                return;
            }
            const containerRect = (0, utils_1.getRect)(scrollTarget);
            const affixRect = selfEl.getBoundingClientRect();
            const pxToTop = affixRect.top - containerRect.top;
            const pxToBottom = containerRect.bottom - affixRect.bottom;
            const mergedOffsetTop = mergedOffsetTopRef.value;
            const mergedOffsetBottom = mergedOffsetBottomRef.value;
            if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
                stickToTopRef.value = true;
                topAffixedTriggerScrollTopRef.value
                    = scrollTop - (mergedOffsetTop - pxToTop);
            }
            else {
                stickToTopRef.value = false;
                topAffixedTriggerScrollTopRef.value = null;
            }
            if (mergedOffsetBottom !== undefined
                && pxToBottom <= mergedOffsetBottom) {
                stickToBottomRef.value = true;
                bottomAffixedTriggerScrollTopRef.value
                    = scrollTop + mergedOffsetBottom - pxToBottom;
            }
            else {
                stickToBottomRef.value = false;
                bottomAffixedTriggerScrollTopRef.value = null;
            }
        }
        (0, vue_1.onMounted)(() => {
            init();
        });
        (0, vue_1.onBeforeUnmount)(() => {
            if (!scrollTarget)
                return;
            scrollTarget.removeEventListener('scroll', handleScroll);
        });
        return {
            selfRef,
            affixed: affixedRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedstyle: (0, vue_1.computed)(() => {
                const style = {};
                if (stickToTopRef.value
                    && mergedOffsetTopRef.value !== undefined
                    && mergedTopRef.value !== undefined) {
                    style.top = `${mergedTopRef.value}px`;
                }
                if (stickToBottomRef.value
                    && mergedOffsetBottomRef.value !== undefined
                    && mergedBottomRef.value !== undefined) {
                    style.bottom = `${mergedBottomRef.value}px`;
                }
                return style;
            })
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { ref: "selfRef", class: [
                `${mergedClsPrefix}-affix`,
                {
                    [`${mergedClsPrefix}-affix--affixed`]: this.affixed,
                    [`${mergedClsPrefix}-affix--absolute-positioned`]: this.position === 'absolute'
                }
            ], style: this.mergedstyle }, this.$slots));
    }
});
