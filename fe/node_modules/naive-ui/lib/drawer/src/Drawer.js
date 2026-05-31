"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawerProps = void 0;
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const DrawerBodyWrapper_1 = __importDefault(require("./DrawerBodyWrapper"));
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.drawerProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { show: Boolean, width: [Number, String], height: [Number, String], placement: {
        type: String,
        default: 'right'
    }, maskClosable: {
        type: Boolean,
        default: true
    }, showMask: {
        type: [Boolean, String],
        default: true
    }, to: [String, Object], displayDirective: {
        type: String,
        default: 'if'
    }, nativeScrollbar: {
        type: Boolean,
        default: true
    }, zIndex: Number, onMaskClick: Function, scrollbarProps: Object, contentClass: String, contentStyle: [Object, String], trapFocus: {
        type: Boolean,
        default: true
    }, onEsc: Function, autoFocus: {
        type: Boolean,
        default: true
    }, closeOnEsc: {
        type: Boolean,
        default: true
    }, blockScroll: {
        type: Boolean,
        default: true
    }, maxWidth: Number, maxHeight: Number, minWidth: Number, minHeight: Number, resizable: Boolean, defaultWidth: {
        type: [Number, String],
        default: 251
    }, defaultHeight: {
        type: [Number, String],
        default: 251
    }, onUpdateWidth: [Function, Array], onUpdateHeight: [Function, Array], 'onUpdate:width': [Function, Array], 'onUpdate:height': [Function, Array], 'onUpdate:show': [Function, Array], onUpdateShow: [Function, Array], onAfterEnter: Function, onAfterLeave: Function, 
    /** @deprecated */
    drawerStyle: [String, Object], drawerClass: String, target: null, onShow: Function, onHide: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Drawer',
    inheritAttrs: false,
    props: exports.drawerProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.drawerStyle !== undefined) {
                    (0, _utils_1.warnOnce)('drawer', '`drawer-style` is deprecated, please use `style` instead.');
                }
                if (props.drawerClass !== undefined) {
                    (0, _utils_1.warnOnce)('drawer', '`drawer-class` is deprecated, please use `class` instead.');
                }
                if (props.target !== undefined) {
                    (0, _utils_1.warnOnce)('drawer', '`target` is deprecated, please use `to` instead.');
                }
                if (props.onShow !== undefined) {
                    (0, _utils_1.warnOnce)('drawer', '`on-show` is deprecated, please use `on-update:show` instead.');
                }
                if (props.onHide !== undefined) {
                    (0, _utils_1.warnOnce)('drawer', '`on-hide` is deprecated, please use `on-update:show` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const isMountedRef = (0, vooks_1.useIsMounted)();
        const themeRef = (0, _mixins_1.useTheme)('Drawer', '-drawer', index_cssr_1.default, styles_1.drawerLight, props, mergedClsPrefixRef);
        const uncontrolledWidthRef = (0, vue_1.ref)(props.defaultWidth);
        const uncontrolledHeightRef = (0, vue_1.ref)(props.defaultHeight);
        const mergedWidthRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'width'), uncontrolledWidthRef);
        const mergedHeightRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'height'), uncontrolledHeightRef);
        const styleWidthRef = (0, vue_1.computed)(() => {
            const { placement } = props;
            if (placement === 'top' || placement === 'bottom')
                return '';
            return (0, _utils_1.formatLength)(mergedWidthRef.value);
        });
        const styleHeightRef = (0, vue_1.computed)(() => {
            const { placement } = props;
            if (placement === 'left' || placement === 'right')
                return '';
            return (0, _utils_1.formatLength)(mergedHeightRef.value);
        });
        const doUpdateWidth = (value) => {
            const { onUpdateWidth, 'onUpdate:width': _onUpdateWidth } = props;
            if (onUpdateWidth)
                (0, _utils_1.call)(onUpdateWidth, value);
            if (_onUpdateWidth)
                (0, _utils_1.call)(_onUpdateWidth, value);
            uncontrolledWidthRef.value = value;
        };
        const doUpdateHeight = (value) => {
            const { onUpdateHeight, 'onUpdate:width': _onUpdateHeight } = props;
            if (onUpdateHeight)
                (0, _utils_1.call)(onUpdateHeight, value);
            if (_onUpdateHeight)
                (0, _utils_1.call)(_onUpdateHeight, value);
            uncontrolledHeightRef.value = value;
        };
        const mergedBodyStyleRef = (0, vue_1.computed)(() => {
            return [
                {
                    width: styleWidthRef.value,
                    height: styleHeightRef.value
                },
                props.drawerStyle || ''
            ];
        });
        function handleMaskClick(e) {
            const { onMaskClick, maskClosable } = props;
            if (maskClosable) {
                doUpdateShow(false);
            }
            if (onMaskClick)
                onMaskClick(e);
        }
        function handleOutsideClick(e) {
            handleMaskClick(e);
        }
        const isComposingRef = (0, _utils_1.useIsComposing)();
        function handleEsc(e) {
            var _a;
            (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props);
            if (props.show && props.closeOnEsc && (0, _utils_1.eventEffectNotPerformed)(e)) {
                if (!isComposingRef.value) {
                    doUpdateShow(false);
                }
            }
        }
        function doUpdateShow(show) {
            const { onHide, onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, show);
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, show);
            // deprecated
            if (onHide && !show)
                (0, _utils_1.call)(onHide, show);
        }
        (0, vue_1.provide)(interface_1.drawerInjectionKey, {
            isMountedRef,
            mergedThemeRef: themeRef,
            mergedClsPrefixRef,
            doUpdateShow,
            doUpdateHeight,
            doUpdateWidth
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut }, self: { color, textColor, boxShadow, lineHeight, headerPadding, footerPadding, borderRadius, bodyPadding, titleFontSize, titleTextColor, titleFontWeight, headerBorderBottom, footerBorderTop, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, closeIconSize, closeSize, closeBorderRadius, resizableTriggerColorHover } } = themeRef.value;
            return {
                '--n-line-height': lineHeight,
                '--n-color': color,
                '--n-border-radius': borderRadius,
                '--n-text-color': textColor,
                '--n-box-shadow': boxShadow,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-bezier-out': cubicBezierEaseOut,
                '--n-bezier-in': cubicBezierEaseIn,
                '--n-header-padding': headerPadding,
                '--n-body-padding': bodyPadding,
                '--n-footer-padding': footerPadding,
                '--n-title-text-color': titleTextColor,
                '--n-title-font-size': titleFontSize,
                '--n-title-font-weight': titleFontWeight,
                '--n-header-border-bottom': headerBorderBottom,
                '--n-footer-border-top': footerBorderTop,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-close-size': closeSize,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-icon-size': closeIconSize,
                '--n-close-border-radius': closeBorderRadius,
                '--n-resize-trigger-color-hover': resizableTriggerColorHover
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('drawer', undefined, cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            namespace: namespaceRef,
            mergedBodyStyle: mergedBodyStyleRef,
            handleOutsideClick,
            handleMaskClick,
            handleEsc,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            isMounted: isMountedRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)(vueuc_1.VLazyTeleport, { to: this.to, show: this.show }, {
            default: () => {
                var _a;
                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                return (0, vue_1.withDirectives)((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-drawer-container`,
                        this.namespace,
                        this.themeClass
                    ], style: this.cssVars, role: "none" },
                    this.showMask ? ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition", appear: this.isMounted }, {
                        default: () => this.show ? ((0, vue_1.h)("div", { "aria-hidden": true, class: [
                                `${mergedClsPrefix}-drawer-mask`,
                                this.showMask === 'transparent'
                                    && `${mergedClsPrefix}-drawer-mask--invisible`
                            ], onClick: this.handleMaskClick })) : null
                    })) : null,
                    (0, vue_1.h)(DrawerBodyWrapper_1.default, Object.assign({}, this.$attrs, { class: [this.drawerClass, this.$attrs.class], style: [this.mergedBodyStyle, this.$attrs.style], blockScroll: this.blockScroll, contentStyle: this.contentStyle, contentClass: this.contentClass, placement: this.placement, scrollbarProps: this.scrollbarProps, show: this.show, displayDirective: this.displayDirective, nativeScrollbar: this.nativeScrollbar, onAfterEnter: this.onAfterEnter, onAfterLeave: this.onAfterLeave, trapFocus: this.trapFocus, autoFocus: this.autoFocus, resizable: this.resizable, maxHeight: this.maxHeight, minHeight: this.minHeight, maxWidth: this.maxWidth, minWidth: this.minWidth, showMask: this.showMask, onEsc: this.handleEsc, onClickoutside: this.handleOutsideClick }), this.$slots)), [[vdirs_1.zindexable, { zIndex: this.zIndex, enabled: this.show }]]);
            }
        }));
    }
});
