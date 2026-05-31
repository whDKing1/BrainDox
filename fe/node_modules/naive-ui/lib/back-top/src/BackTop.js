"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backTopProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const BackTopIcon_1 = __importDefault(require("./BackTopIcon"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.backTopProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { show: {
        type: Boolean,
        default: undefined
    }, right: {
        type: [Number, String],
        default: 40
    }, bottom: {
        type: [Number, String],
        default: 40
    }, to: {
        type: [String, Object],
        default: 'body'
    }, visibilityHeight: {
        type: Number,
        default: 180
    }, listenTo: [String, Object, Function], 'onUpdate:show': {
        type: Function,
        default: () => { }
    }, 
    // deprecated
    target: Function, onShow: Function, onHide: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'BackTop',
    // make style applied to back-top button
    inheritAttrs: false,
    props: exports.backTopProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.target !== undefined) {
                    (0, _utils_1.warnOnce)('back-top', '`target` is deprecated, please use `listen-to` instead.');
                }
                if (props.onShow !== undefined) {
                    (0, _utils_1.warnOnce)('back-top', '`on-show` is deprecated, please use `on-update:show` instead.');
                }
                if (props.onHide !== undefined) {
                    (0, _utils_1.warnOnce)('back-top', '`on-hide` is deprecated, please use `on-update:show` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const scrollTopRef = (0, vue_1.ref)(null);
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        (0, vue_1.watchEffect)(() => {
            const { value: scrollTop } = scrollTopRef;
            if (scrollTop === null) {
                uncontrolledShowRef.value = false;
                return;
            }
            uncontrolledShowRef.value = scrollTop >= props.visibilityHeight;
        });
        const DomInfoReadyRef = (0, vue_1.ref)(false);
        (0, vue_1.watch)(uncontrolledShowRef, (value) => {
            var _a;
            if (DomInfoReadyRef.value) {
                (_a = props['onUpdate:show']) === null || _a === void 0 ? void 0 : _a.call(props, value);
            }
        });
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        const transitionDisabledRef = (0, vue_1.ref)(true);
        const placeholderRef = (0, vue_1.ref)(null);
        const styleRef = (0, vue_1.computed)(() => {
            return {
                right: `calc(${(0, _utils_1.formatLength)(props.right)} + ${_utils_1.lockHtmlScrollRightCompensationRef.value})`,
                bottom: (0, _utils_1.formatLength)(props.bottom)
            };
        });
        let scrollElement;
        let scrollListenerRegistered;
        // deprecated
        (0, vue_1.watch)(mergedShowRef, (value) => {
            var _a, _b;
            if (DomInfoReadyRef.value) {
                if (value) {
                    (_a = props.onShow) === null || _a === void 0 ? void 0 : _a.call(props);
                }
                (_b = props.onHide) === null || _b === void 0 ? void 0 : _b.call(props);
            }
        });
        const themeRef = (0, _mixins_1.useTheme)('BackTop', '-back-top', index_cssr_1.default, styles_1.backTopLight, props, mergedClsPrefixRef);
        function init() {
            var _a;
            if (scrollListenerRegistered)
                return;
            scrollListenerRegistered = true;
            const scrollEl = ((_a = props.target) === null || _a === void 0 ? void 0 : _a.call(props))
                || (0, seemly_1.unwrapElement)(props.listenTo)
                || (0, seemly_1.getScrollParent)(placeholderRef.value);
            if (!scrollEl) {
                if (process.env.NODE_ENV !== 'production') {
                    (0, _utils_1.warn)('back-top', 'Container of back-top element is not found. This could be a bug of naive-ui.');
                }
                return;
            }
            scrollElement
                = scrollEl === document.documentElement ? document : scrollEl;
            const { to } = props;
            const target = typeof to === 'string' ? document.querySelector(to) : to;
            if (process.env.NODE_ENV !== 'production' && !target) {
                (0, _utils_1.warn)('back-top', 'Target is not found.');
            }
            scrollElement.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        function handleClick() {
            ;
            ((0, _utils_1.isDocument)(scrollElement)
                ? document.documentElement
                : scrollElement).scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        function handleScroll() {
            scrollTopRef.value = ((0, _utils_1.isDocument)(scrollElement) ? document.documentElement : scrollElement).scrollTop;
            if (!DomInfoReadyRef.value) {
                void (0, vue_1.nextTick)(() => {
                    DomInfoReadyRef.value = true;
                });
            }
        }
        function handleAfterEnter() {
            transitionDisabledRef.value = false;
        }
        (0, vue_1.onMounted)(() => {
            init();
            transitionDisabledRef.value = mergedShowRef.value;
        });
        (0, vue_1.onBeforeUnmount)(() => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { color, boxShadow, boxShadowHover, boxShadowPressed, iconColor, iconColorHover, iconColorPressed, width, height, iconSize, borderRadius, textColor }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-height': height,
                '--n-width': width,
                '--n-box-shadow': boxShadow,
                '--n-box-shadow-hover': boxShadowHover,
                '--n-box-shadow-pressed': boxShadowPressed,
                '--n-color': color,
                '--n-icon-size': iconSize,
                '--n-icon-color': iconColor,
                '--n-icon-color-hover': iconColorHover,
                '--n-icon-color-pressed': iconColorPressed,
                '--n-text-color': textColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('back-top', undefined, cssVarsRef, props)
            : undefined;
        return {
            placeholderRef,
            style: styleRef,
            mergedShow: mergedShowRef,
            isMounted: (0, vooks_1.useIsMounted)(),
            scrollElement: (0, vue_1.ref)(null),
            scrollTop: scrollTopRef,
            DomInfoReady: DomInfoReadyRef,
            transitionDisabled: transitionDisabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            handleAfterEnter,
            handleScroll,
            handleClick,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { ref: "placeholderRef", class: `${mergedClsPrefix}-back-top-placeholder`, style: "display: none", "aria-hidden": true },
            (0, vue_1.h)(vueuc_1.VLazyTeleport, { to: this.to, show: this.mergedShow }, {
                default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterEnter: this.handleAfterEnter }, {
                    default: () => {
                        var _a;
                        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                        return this.mergedShow
                            ? (0, vue_1.h)('div', (0, vue_1.mergeProps)(this.$attrs, {
                                class: [
                                    `${mergedClsPrefix}-back-top`,
                                    this.themeClass,
                                    this.transitionDisabled
                                        && `${mergedClsPrefix}-back-top--transition-disabled`
                                ],
                                style: [this.style, this.cssVars],
                                onClick: this.handleClick
                            }), (0, _utils_1.resolveSlot)(this.$slots.default, () => [
                                (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: BackTopIcon_1.default })
                            ]))
                            : null;
                    }
                }))
            })));
    }
});
