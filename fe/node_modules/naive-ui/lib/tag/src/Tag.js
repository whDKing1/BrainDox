"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagInjectionKey = exports.tagProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const close_1 = require("../../_internal/close");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const common_props_1 = __importDefault(require("./common-props"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.tagProps = Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), common_props_1.default), { bordered: {
        type: Boolean,
        default: undefined
    }, checked: Boolean, checkable: Boolean, strong: Boolean, triggerClickOnClose: Boolean, onClose: [Array, Function], onMouseenter: Function, onMouseleave: Function, 'onUpdate:checked': Function, onUpdateChecked: Function, 
    // private
    internalCloseFocusable: {
        type: Boolean,
        default: true
    }, internalCloseIsButtonTag: {
        type: Boolean,
        default: true
    }, 
    // deprecated
    onCheckedChange: Function });
exports.tagInjectionKey = (0, _utils_1.createInjectionKey)('n-tag');
exports.default = (0, vue_1.defineComponent)({
    name: 'Tag',
    props: exports.tagProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onCheckedChange !== undefined) {
                    (0, _utils_1.warnOnce)('tag', '`on-checked-change` is deprecated, please use `on-update:checked` instead');
                }
            });
        }
        const contentRef = (0, vue_1.ref)(null);
        const { mergedBorderedRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Tag) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
        });
        const themeRef = (0, _mixins_1.useTheme)('Tag', '-tag', index_cssr_1.default, styles_1.tagLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(exports.tagInjectionKey, {
            roundRef: (0, vue_1.toRef)(props, 'round')
        });
        function handleClick() {
            if (!props.disabled) {
                if (props.checkable) {
                    const { checked, onCheckedChange, onUpdateChecked, 'onUpdate:checked': _onUpdateChecked } = props;
                    if (onUpdateChecked)
                        onUpdateChecked(!checked);
                    if (_onUpdateChecked)
                        _onUpdateChecked(!checked);
                    // deprecated
                    if (onCheckedChange)
                        onCheckedChange(!checked);
                }
            }
        }
        function handleCloseClick(e) {
            if (!props.triggerClickOnClose) {
                e.stopPropagation();
            }
            if (!props.disabled) {
                const { onClose } = props;
                if (onClose)
                    (0, _utils_1.call)(onClose, e);
            }
        }
        const tagPublicMethods = {
            setTextContent(textContent) {
                const { value } = contentRef;
                if (value)
                    value.textContent = textContent;
            }
        };
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Tag', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type, color: { color, textColor } = {} } = props;
            const size = mergedSizeRef.value;
            const { common: { cubicBezierEaseInOut }, self: { padding, closeMargin, borderRadius, opacityDisabled, textColorCheckable, textColorHoverCheckable, textColorPressedCheckable, textColorChecked, colorCheckable, colorHoverCheckable, colorPressedCheckable, colorChecked, colorCheckedHover, colorCheckedPressed, closeBorderRadius, fontWeightStrong, [(0, _utils_1.createKey)('colorBordered', type)]: colorBordered, [(0, _utils_1.createKey)('closeSize', size)]: closeSize, [(0, _utils_1.createKey)('closeIconSize', size)]: closeIconSize, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('height', size)]: height, [(0, _utils_1.createKey)('color', type)]: typedColor, [(0, _utils_1.createKey)('textColor', type)]: typeTextColor, [(0, _utils_1.createKey)('border', type)]: border, [(0, _utils_1.createKey)('closeIconColor', type)]: closeIconColor, [(0, _utils_1.createKey)('closeIconColorHover', type)]: closeIconColorHover, [(0, _utils_1.createKey)('closeIconColorPressed', type)]: closeIconColorPressed, [(0, _utils_1.createKey)('closeColorHover', type)]: closeColorHover, [(0, _utils_1.createKey)('closeColorPressed', type)]: closeColorPressed } } = themeRef.value;
            const closeMarginDiscrete = (0, seemly_1.getMargin)(closeMargin);
            return {
                '--n-font-weight-strong': fontWeightStrong,
                '--n-avatar-size-override': `calc(${height} - 8px)`,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-border': border,
                '--n-close-icon-size': closeIconSize,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-color-hover': closeColorHover,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-close-icon-color-disabled': closeIconColor,
                '--n-close-margin-top': closeMarginDiscrete.top,
                '--n-close-margin-right': closeMarginDiscrete.right,
                '--n-close-margin-bottom': closeMarginDiscrete.bottom,
                '--n-close-margin-left': closeMarginDiscrete.left,
                '--n-close-size': closeSize,
                '--n-color': color || (mergedBorderedRef.value ? colorBordered : typedColor),
                '--n-color-checkable': colorCheckable,
                '--n-color-checked': colorChecked,
                '--n-color-checked-hover': colorCheckedHover,
                '--n-color-checked-pressed': colorCheckedPressed,
                '--n-color-hover-checkable': colorHoverCheckable,
                '--n-color-pressed-checkable': colorPressedCheckable,
                '--n-font-size': fontSize,
                '--n-height': height,
                '--n-opacity-disabled': opacityDisabled,
                '--n-padding': padding,
                '--n-text-color': textColor || typeTextColor,
                '--n-text-color-checkable': textColorCheckable,
                '--n-text-color-checked': textColorChecked,
                '--n-text-color-hover-checkable': textColorHoverCheckable,
                '--n-text-color-pressed-checkable': textColorPressedCheckable
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('tag', (0, vue_1.computed)(() => {
                let hash = '';
                const { type, color: { color, textColor } = {} } = props;
                hash += type[0];
                hash += mergedSizeRef.value[0];
                if (color) {
                    hash += `a${(0, _utils_1.color2Class)(color)}`;
                }
                if (textColor) {
                    hash += `b${(0, _utils_1.color2Class)(textColor)}`;
                }
                if (mergedBorderedRef.value) {
                    hash += 'c';
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({}, tagPublicMethods), { rtlEnabled: rtlEnabledRef, mergedClsPrefix: mergedClsPrefixRef, contentRef, mergedBordered: mergedBorderedRef, handleClick,
            handleCloseClick, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        var _a, _b;
        const { mergedClsPrefix, rtlEnabled, closable, color: { borderColor } = {}, round, onRender, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const avatarNode = (0, _utils_1.resolveWrappedSlot)($slots.avatar, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tag__avatar` }, children)));
        const iconNode = (0, _utils_1.resolveWrappedSlot)($slots.icon, children => children && (0, vue_1.h)("div", { class: `${mergedClsPrefix}-tag__icon` }, children));
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-tag`,
                this.themeClass,
                {
                    [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
                    [`${mergedClsPrefix}-tag--strong`]: this.strong,
                    [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
                    [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
                    [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
                    [`${mergedClsPrefix}-tag--round`]: round,
                    [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
                    [`${mergedClsPrefix}-tag--icon`]: iconNode,
                    [`${mergedClsPrefix}-tag--closable`]: closable
                }
            ], style: this.cssVars, onClick: this.handleClick, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
            iconNode || avatarNode,
            (0, vue_1.h)("span", { class: `${mergedClsPrefix}-tag__content`, ref: "contentRef" }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)),
            !this.checkable && closable ? ((0, vue_1.h)(close_1.NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-tag__close`, disabled: this.disabled, onClick: this.handleCloseClick, focusable: this.internalCloseFocusable, round: round, isButtonTag: this.internalCloseIsButtonTag, absolute: true })) : null,
            !this.checkable && this.mergedBordered ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tag__border`, style: { borderColor } })) : null));
    }
});
