"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutInjectionKey = exports.layoutProps = void 0;
exports.createLayoutComponent = createLayoutComponent;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const layout_cssr_1 = __importDefault(require("./styles/layout.cssr"));
exports.layoutProps = {
    embedded: Boolean,
    position: interface_1.positionProp,
    nativeScrollbar: {
        type: Boolean,
        default: true
    },
    scrollbarProps: Object,
    onScroll: Function,
    contentClass: String,
    contentStyle: {
        type: [String, Object],
        default: ''
    },
    hasSider: Boolean,
    siderPlacement: {
        type: String,
        default: 'left'
    }
};
exports.layoutInjectionKey = (0, _utils_1.createInjectionKey)('n-layout');
function createLayoutComponent(isContent) {
    return (0, vue_1.defineComponent)({
        name: isContent ? 'LayoutContent' : 'Layout',
        props: Object.assign(Object.assign({}, _mixins_1.useTheme.props), exports.layoutProps),
        setup(props) {
            const scrollableElRef = (0, vue_1.ref)(null);
            const scrollbarInstRef = (0, vue_1.ref)(null);
            const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
            const themeRef = (0, _mixins_1.useTheme)('Layout', '-layout', layout_cssr_1.default, styles_1.layoutLight, props, mergedClsPrefixRef);
            function scrollTo(options, y) {
                if (props.nativeScrollbar) {
                    const { value: scrollableEl } = scrollableElRef;
                    if (scrollableEl) {
                        if (y === undefined) {
                            scrollableEl.scrollTo(options);
                        }
                        else {
                            scrollableEl.scrollTo(options, y);
                        }
                    }
                }
                else {
                    const { value: scrollbarInst } = scrollbarInstRef;
                    if (scrollbarInst) {
                        scrollbarInst.scrollTo(options, y);
                    }
                }
            }
            (0, vue_1.provide)(exports.layoutInjectionKey, props);
            let scrollX = 0;
            let scrollY = 0;
            const handleNativeElScroll = (e) => {
                var _a;
                const target = e.target;
                scrollX = target.scrollLeft;
                scrollY = target.scrollTop;
                (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
            };
            (0, _utils_1.useReactivated)(() => {
                if (props.nativeScrollbar) {
                    const el = scrollableElRef.value;
                    if (el) {
                        el.scrollTop = scrollY;
                        el.scrollLeft = scrollX;
                    }
                }
            });
            const hasSiderStyle = {
                display: 'flex',
                flexWrap: 'nowrap',
                width: '100%',
                flexDirection: 'row'
            };
            const exposedMethods = {
                scrollTo
            };
            const cssVarsRef = (0, vue_1.computed)(() => {
                const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
                return {
                    '--n-bezier': cubicBezierEaseInOut,
                    '--n-color': props.embedded ? self.colorEmbedded : self.color,
                    '--n-text-color': self.textColor
                };
            });
            const themeClassHandle = inlineThemeDisabled
                ? (0, _mixins_1.useThemeClass)('layout', (0, vue_1.computed)(() => {
                    return props.embedded ? 'e' : '';
                }), cssVarsRef, props)
                : undefined;
            return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, scrollableElRef,
                scrollbarInstRef,
                hasSiderStyle, mergedTheme: themeRef, handleNativeElScroll, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
        },
        render() {
            var _a;
            const { mergedClsPrefix, hasSider } = this;
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            const hasSiderStyle = hasSider ? this.hasSiderStyle : undefined;
            const layoutClass = [
                this.themeClass,
                isContent && `${mergedClsPrefix}-layout-content`,
                `${mergedClsPrefix}-layout`,
                `${mergedClsPrefix}-layout--${this.position}-positioned`
            ];
            return ((0, vue_1.h)("div", { class: layoutClass, style: this.cssVars }, this.nativeScrollbar ? ((0, vue_1.h)("div", { ref: "scrollableElRef", class: [
                    `${mergedClsPrefix}-layout-scroll-container`,
                    this.contentClass
                ], style: [this.contentStyle, hasSiderStyle], onScroll: this.handleNativeElScroll }, this.$slots)) : ((0, vue_1.h)(_internal_1.NScrollbar, Object.assign({}, this.scrollbarProps, { onScroll: this.onScroll, ref: "scrollbarInstRef", theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, contentClass: this.contentClass, contentStyle: [this.contentStyle, hasSiderStyle] }), this.$slots))));
        }
    });
}
exports.default = createLayoutComponent(false);
