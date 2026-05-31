"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardProps = exports.cardBasePropKeys = exports.cardBaseProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const resolve_slot_1 = require("../../_utils/vue/resolve-slot");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.cardBaseProps = {
    title: [String, Function],
    contentClass: String,
    contentStyle: [Object, String],
    contentScrollable: Boolean,
    headerClass: String,
    headerStyle: [Object, String],
    headerExtraClass: String,
    headerExtraStyle: [Object, String],
    footerClass: String,
    footerStyle: [Object, String],
    embedded: Boolean,
    segmented: {
        type: [Boolean, Object],
        default: false
    },
    size: String,
    bordered: {
        type: Boolean,
        default: true
    },
    closable: Boolean,
    hoverable: Boolean,
    role: String,
    onClose: [Function, Array],
    tag: {
        type: String,
        default: 'div'
    },
    cover: Function,
    content: [String, Function],
    footer: Function,
    action: Function,
    headerExtra: Function,
    closeFocusable: Boolean
};
exports.cardBasePropKeys = (0, _utils_1.keysOf)(exports.cardBaseProps);
exports.cardProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), exports.cardBaseProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Card',
    props: exports.cardProps,
    slots: Object,
    setup(props) {
        const handleCloseClick = () => {
            const { onClose } = props;
            if (onClose) {
                (0, _utils_1.call)(onClose);
            }
        };
        const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Card', '-card', index_cssr_1.default, styles_1.cardLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Card', mergedRtlRef, mergedClsPrefixRef);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Card) === null || _b === void 0 ? void 0 : _b.size) || 'medium');
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const mergedSize = mergedSizeRef.value;
            const { self: { color, colorModal, colorTarget, textColor, titleTextColor, titleFontWeight, borderColor, actionColor, borderRadius, lineHeight, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, closeBorderRadius, closeIconSize, closeSize, boxShadow, colorPopover, colorEmbedded, colorEmbeddedModal, colorEmbeddedPopover, [(0, _utils_1.createKey)('padding', mergedSize)]: padding, [(0, _utils_1.createKey)('fontSize', mergedSize)]: fontSize, [(0, _utils_1.createKey)('titleFontSize', mergedSize)]: titleFontSize }, common: { cubicBezierEaseInOut } } = themeRef.value;
            const { top: paddingTop, left: paddingLeft, bottom: paddingBottom } = (0, seemly_1.getPadding)(padding);
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-color': color,
                '--n-color-modal': colorModal,
                '--n-color-popover': colorPopover,
                '--n-color-embedded': colorEmbedded,
                '--n-color-embedded-modal': colorEmbeddedModal,
                '--n-color-embedded-popover': colorEmbeddedPopover,
                '--n-color-target': colorTarget,
                '--n-text-color': textColor,
                '--n-line-height': lineHeight,
                '--n-action-color': actionColor,
                '--n-title-text-color': titleTextColor,
                '--n-title-font-weight': titleFontWeight,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-border-color': borderColor,
                '--n-box-shadow': boxShadow,
                // size
                '--n-padding-top': paddingTop,
                '--n-padding-bottom': paddingBottom,
                '--n-padding-left': paddingLeft,
                '--n-font-size': fontSize,
                '--n-title-font-size': titleFontSize,
                '--n-close-size': closeSize,
                '--n-close-icon-size': closeIconSize,
                '--n-close-border-radius': closeBorderRadius
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('card', (0, vue_1.computed)(() => {
                return mergedSizeRef.value[0];
            }), cssVarsRef, props)
            : undefined;
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedTheme: themeRef,
            handleCloseClick,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { segmented, bordered, hoverable, mergedClsPrefix, rtlEnabled, onRender, embedded, tag: Component, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)(Component, { class: [
                `${mergedClsPrefix}-card`,
                this.themeClass,
                embedded && `${mergedClsPrefix}-card--embedded`,
                {
                    [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
                    [`${mergedClsPrefix}-card--content-scrollable`]: this.contentScrollable,
                    [`${mergedClsPrefix}-card--content${typeof segmented !== 'boolean' && segmented.content === 'soft'
                        ? '-soft'
                        : ''}-segmented`]: segmented === true || (segmented !== false && segmented.content),
                    [`${mergedClsPrefix}-card--footer${typeof segmented !== 'boolean' && segmented.footer === 'soft'
                        ? '-soft'
                        : ''}-segmented`]: segmented === true || (segmented !== false && segmented.footer),
                    [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || (segmented !== false && segmented.action),
                    [`${mergedClsPrefix}-card--bordered`]: bordered,
                    [`${mergedClsPrefix}-card--hoverable`]: hoverable
                }
            ], style: this.cssVars, role: this.role },
            (0, _utils_1.resolveWrappedSlot)($slots.cover, (children) => {
                const mergedChildren = this.cover
                    ? (0, resolve_slot_1.ensureValidVNode)([this.cover()])
                    : children;
                return (mergedChildren && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-card-cover`, role: "none" }, mergedChildren)));
            }),
            (0, _utils_1.resolveWrappedSlot)($slots.header, (children) => {
                const { title } = this;
                const mergedChildren = title
                    ? (0, resolve_slot_1.ensureValidVNode)(typeof title === 'function' ? [title()] : [title])
                    : children;
                return mergedChildren || this.closable ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-card-header`, this.headerClass], style: this.headerStyle, role: "heading" },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-card-header__main`, role: "heading" }, mergedChildren),
                    (0, _utils_1.resolveWrappedSlot)($slots['header-extra'], (children) => {
                        const mergedChildren = this.headerExtra
                            ? (0, resolve_slot_1.ensureValidVNode)([this.headerExtra()])
                            : children;
                        return (mergedChildren && ((0, vue_1.h)("div", { class: [
                                `${mergedClsPrefix}-card-header__extra`,
                                this.headerExtraClass
                            ], style: this.headerExtraStyle }, mergedChildren)));
                    }),
                    this.closable && ((0, vue_1.h)(_internal_1.NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-card-header__close`, onClick: this.handleCloseClick, focusable: this.closeFocusable, absolute: true })))) : null;
            }),
            (0, _utils_1.resolveWrappedSlot)($slots.default, (children) => {
                const { content } = this;
                const mergedChildren = content
                    ? (0, resolve_slot_1.ensureValidVNode)(typeof content === 'function' ? [content()] : [content])
                    : children;
                return mergedChildren ? (this.contentScrollable ? ((0, vue_1.h)(_internal_1.NScrollbar, { class: `${mergedClsPrefix}-card__content-scrollbar`, contentClass: [
                        `${mergedClsPrefix}-card-content`,
                        this.contentClass
                    ], contentStyle: this.contentStyle }, mergedChildren)) : ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-card-content`, this.contentClass], style: this.contentStyle, role: "none" }, mergedChildren))) : null;
            }),
            (0, _utils_1.resolveWrappedSlot)($slots.footer, (children) => {
                const mergedChildren = this.footer
                    ? (0, resolve_slot_1.ensureValidVNode)([this.footer()])
                    : children;
                return (mergedChildren && ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-card__footer`, this.footerClass], style: this.footerStyle, role: "none" }, mergedChildren)));
            }),
            (0, _utils_1.resolveWrappedSlot)($slots.action, (children) => {
                const mergedChildren = this.action
                    ? (0, resolve_slot_1.ensureValidVNode)([this.action()])
                    : children;
                return (mergedChildren && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-card__action`, role: "none" }, mergedChildren)));
            })));
    }
});
