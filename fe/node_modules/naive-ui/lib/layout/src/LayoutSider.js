"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutSiderProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const Layout_1 = require("./Layout");
const layout_sider_cssr_1 = __importDefault(require("./styles/layout-sider.cssr"));
const ToggleBar_1 = __importDefault(require("./ToggleBar"));
const ToggleButton_1 = __importDefault(require("./ToggleButton"));
exports.layoutSiderProps = {
    position: interface_1.positionProp,
    bordered: Boolean,
    collapsedWidth: {
        type: Number,
        default: 48
    },
    width: {
        type: [Number, String],
        default: 272
    },
    contentClass: String,
    contentStyle: {
        type: [String, Object],
        default: ''
    },
    collapseMode: {
        type: String,
        default: 'transform'
    },
    collapsed: {
        type: Boolean,
        default: undefined
    },
    defaultCollapsed: Boolean,
    showCollapsedContent: {
        type: Boolean,
        default: true
    },
    showTrigger: {
        type: [Boolean, String],
        default: false
    },
    nativeScrollbar: {
        type: Boolean,
        default: true
    },
    inverted: Boolean,
    scrollbarProps: Object,
    triggerClass: String,
    triggerStyle: [String, Object],
    collapsedTriggerClass: String,
    collapsedTriggerStyle: [String, Object],
    'onUpdate:collapsed': [Function, Array],
    onUpdateCollapsed: [Function, Array],
    onAfterEnter: Function,
    onAfterLeave: Function,
    // deprecated
    onExpand: [Function, Array],
    onCollapse: [Function, Array],
    onScroll: Function
};
exports.default = (0, vue_1.defineComponent)({
    name: 'LayoutSider',
    props: Object.assign(Object.assign({}, _mixins_1.useTheme.props), exports.layoutSiderProps),
    setup(props) {
        const layoutProps = (0, vue_1.inject)(Layout_1.layoutInjectionKey);
        if (process.env.NODE_ENV !== 'production') {
            if (!layoutProps) {
                (0, _utils_1.warn)('layout-sider', 'Layout sider is not allowed to be put outside layout.');
            }
            else {
                if (!layoutProps.hasSider) {
                    (0, _utils_1.warn)('layout-sider', 'You are putting `n-layout-sider` in a `n-layout` but haven\'t set `has-sider` on the `n-layout`.');
                }
            }
        }
        const scrollableElRef = (0, vue_1.ref)(null);
        const scrollbarInstRef = (0, vue_1.ref)(null);
        const uncontrolledCollapsedRef = (0, vue_1.ref)(props.defaultCollapsed);
        const mergedCollapsedRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'collapsed'), uncontrolledCollapsedRef);
        const styleMaxWidthRef = (0, vue_1.computed)(() => {
            return (0, _utils_1.formatLength)(mergedCollapsedRef.value ? props.collapsedWidth : props.width);
        });
        const scrollContainerStyleRef = (0, vue_1.computed)(() => {
            if (props.collapseMode !== 'transform')
                return {};
            return {
                minWidth: (0, _utils_1.formatLength)(props.width)
            };
        });
        const siderPlacementRef = (0, vue_1.computed)(() => {
            return layoutProps ? layoutProps.siderPlacement : 'left';
        });
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
        function handleTriggerClick() {
            const { 'onUpdate:collapsed': _onUpdateCollapsed, onUpdateCollapsed, 
            // deprecated
            onExpand, onCollapse } = props;
            const { value: collapsed } = mergedCollapsedRef;
            if (onUpdateCollapsed) {
                (0, _utils_1.call)(onUpdateCollapsed, !collapsed);
            }
            if (_onUpdateCollapsed) {
                (0, _utils_1.call)(_onUpdateCollapsed, !collapsed);
            }
            uncontrolledCollapsedRef.value = !collapsed;
            if (collapsed) {
                if (onExpand)
                    (0, _utils_1.call)(onExpand);
            }
            else {
                if (onCollapse)
                    (0, _utils_1.call)(onCollapse);
            }
        }
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
        (0, vue_1.provide)(interface_1.layoutSiderInjectionKey, {
            collapsedRef: mergedCollapsedRef,
            collapseModeRef: (0, vue_1.toRef)(props, 'collapseMode')
        });
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Layout', '-layout-sider', layout_sider_cssr_1.default, styles_1.layoutLight, props, mergedClsPrefixRef);
        function handleTransitionend(e) {
            var _a, _b;
            if (e.propertyName === 'max-width') {
                if (mergedCollapsedRef.value) {
                    (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
                }
                else {
                    (_b = props.onAfterEnter) === null || _b === void 0 ? void 0 : _b.call(props);
                }
            }
        }
        const exposedMethods = {
            scrollTo
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { siderToggleButtonColor, siderToggleButtonBorder, siderToggleBarColor, siderToggleBarColorHover } = self;
            const vars = {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-toggle-button-color': siderToggleButtonColor,
                '--n-toggle-button-border': siderToggleButtonBorder,
                '--n-toggle-bar-color': siderToggleBarColor,
                '--n-toggle-bar-color-hover': siderToggleBarColorHover
            };
            if (props.inverted) {
                vars['--n-color'] = self.siderColorInverted;
                vars['--n-text-color'] = self.textColorInverted;
                vars['--n-border-color'] = self.siderBorderColorInverted;
                vars['--n-toggle-button-icon-color']
                    = self.siderToggleButtonIconColorInverted;
                vars.__invertScrollbar = self.__invertScrollbar;
            }
            else {
                vars['--n-color'] = self.siderColor;
                vars['--n-text-color'] = self.textColor;
                vars['--n-border-color'] = self.siderBorderColor;
                vars['--n-toggle-button-icon-color'] = self.siderToggleButtonIconColor;
            }
            return vars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('layout-sider', (0, vue_1.computed)(() => (props.inverted ? 'a' : 'b')), cssVarsRef, props)
            : undefined;
        return Object.assign({ scrollableElRef,
            scrollbarInstRef, mergedClsPrefix: mergedClsPrefixRef, mergedTheme: themeRef, styleMaxWidth: styleMaxWidthRef, mergedCollapsed: mergedCollapsedRef, scrollContainerStyle: scrollContainerStyleRef, siderPlacement: siderPlacementRef, handleNativeElScroll,
            handleTransitionend,
            handleTriggerClick,
            inlineThemeDisabled, cssVars: cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
    },
    render() {
        var _a;
        const { mergedClsPrefix, mergedCollapsed, showTrigger } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("aside", { class: [
                `${mergedClsPrefix}-layout-sider`,
                this.themeClass,
                `${mergedClsPrefix}-layout-sider--${this.position}-positioned`,
                `${mergedClsPrefix}-layout-sider--${this.siderPlacement}-placement`,
                this.bordered && `${mergedClsPrefix}-layout-sider--bordered`,
                mergedCollapsed && `${mergedClsPrefix}-layout-sider--collapsed`,
                (!mergedCollapsed || this.showCollapsedContent)
                    && `${mergedClsPrefix}-layout-sider--show-content`
            ], onTransitionend: this.handleTransitionend, style: [
                this.inlineThemeDisabled ? undefined : this.cssVars,
                {
                    maxWidth: this.styleMaxWidth,
                    width: (0, _utils_1.formatLength)(this.width)
                }
            ] },
            !this.nativeScrollbar ? ((0, vue_1.h)(_internal_1.NScrollbar, Object.assign({}, this.scrollbarProps, { onScroll: this.onScroll, ref: "scrollbarInstRef", style: this.scrollContainerStyle, contentStyle: this.contentStyle, contentClass: this.contentClass, theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, 
                // here is a hack, since in light theme the scrollbar color is dark,
                // we need to invert it in light color...
                builtinThemeOverrides: this.inverted && this.cssVars.__invertScrollbar === 'true'
                    ? {
                        colorHover: 'rgba(255, 255, 255, .4)',
                        color: 'rgba(255, 255, 255, .3)'
                    }
                    : undefined }), this.$slots)) : ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-layout-sider-scroll-container`,
                    this.contentClass
                ], onScroll: this.handleNativeElScroll, style: [
                    this.scrollContainerStyle,
                    {
                        overflow: 'auto'
                    },
                    this.contentStyle
                ], ref: "scrollableElRef" }, this.$slots)),
            showTrigger ? (showTrigger === 'bar' ? ((0, vue_1.h)(ToggleBar_1.default, { clsPrefix: mergedClsPrefix, class: mergedCollapsed ? this.collapsedTriggerClass : this.triggerClass, style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle, onClick: this.handleTriggerClick })) : ((0, vue_1.h)(ToggleButton_1.default, { clsPrefix: mergedClsPrefix, class: mergedCollapsed ? this.collapsedTriggerClass : this.triggerClass, style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle, onClick: this.handleTriggerClick }))) : null,
            this.bordered ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-layout-sider__border` })) : null));
    }
});
