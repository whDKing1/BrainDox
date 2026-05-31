"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const context_1 = require("./context");
const message_props_1 = require("./message-props");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const iconRenderMap = {
    info: () => (0, vue_1.h)(icons_1.InfoIcon, null),
    success: () => (0, vue_1.h)(icons_1.SuccessIcon, null),
    warning: () => (0, vue_1.h)(icons_1.WarningIcon, null),
    error: () => (0, vue_1.h)(icons_1.ErrorIcon, null),
    default: () => null
};
exports.default = (0, vue_1.defineComponent)({
    name: 'Message',
    props: Object.assign(Object.assign({}, message_props_1.messageProps), { render: Function }),
    setup(props) {
        const { inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const { props: messageProviderProps, mergedClsPrefixRef } = (0, vue_1.inject)(context_1.messageProviderInjectionKey);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Message', mergedRtlRef, mergedClsPrefixRef);
        const themeRef = (0, _mixins_1.useTheme)('Message', '-message', index_cssr_1.default, styles_1.messageLight, messageProviderProps, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type } = props;
            const { common: { cubicBezierEaseInOut }, self: { padding, margin, maxWidth, iconMargin, closeMargin, closeSize, iconSize, fontSize, lineHeight, borderRadius, border, iconColorInfo, iconColorSuccess, iconColorWarning, iconColorError, iconColorLoading, closeIconSize, closeBorderRadius, [(0, _utils_1.createKey)('textColor', type)]: textColor, [(0, _utils_1.createKey)('boxShadow', type)]: boxShadow, [(0, _utils_1.createKey)('color', type)]: color, [(0, _utils_1.createKey)('closeColorHover', type)]: closeColorHover, [(0, _utils_1.createKey)('closeColorPressed', type)]: closeColorPressed, [(0, _utils_1.createKey)('closeIconColor', type)]: closeIconColor, [(0, _utils_1.createKey)('closeIconColorPressed', type)]: closeIconColorPressed, [(0, _utils_1.createKey)('closeIconColorHover', type)]: closeIconColorHover } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-margin': margin,
                '--n-padding': padding,
                '--n-max-width': maxWidth,
                '--n-font-size': fontSize,
                '--n-icon-margin': iconMargin,
                '--n-icon-size': iconSize,
                '--n-close-icon-size': closeIconSize,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-size': closeSize,
                '--n-close-margin': closeMargin,
                '--n-text-color': textColor,
                '--n-color': color,
                '--n-box-shadow': boxShadow,
                '--n-icon-color-info': iconColorInfo,
                '--n-icon-color-success': iconColorSuccess,
                '--n-icon-color-warning': iconColorWarning,
                '--n-icon-color-error': iconColorError,
                '--n-icon-color-loading': iconColorLoading,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-line-height': lineHeight,
                '--n-border-radius': borderRadius,
                '--n-border': border
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('message', (0, vue_1.computed)(() => props.type[0]), cssVarsRef, {})
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            messageProviderProps,
            handleClose() {
                var _a;
                (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
            },
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            placement: messageProviderProps.placement
        };
    },
    render() {
        const { render: renderMessage, type, closable, content, mergedClsPrefix, cssVars, themeClass, onRender, icon, handleClose, showIcon } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        let iconNode;
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-message-wrapper`, themeClass], onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave, style: [
                {
                    alignItems: this.placement.startsWith('top')
                        ? 'flex-start'
                        : 'flex-end'
                },
                cssVars
            ] }, renderMessage ? (renderMessage(this.$props)) : ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-message ${mergedClsPrefix}-message--${type}-type`,
                this.rtlEnabled && `${mergedClsPrefix}-message--rtl`
            ] },
            (iconNode = createIconVNode(icon, type, mergedClsPrefix, this.spinProps)) && showIcon ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${type}-type` },
                (0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                    default: () => iconNode
                }))) : null,
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-message__content` }, (0, _utils_1.render)(content)),
            closable ? ((0, vue_1.h)(_internal_1.NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-message__close`, onClick: handleClose, absolute: true })) : null))));
    }
});
function createIconVNode(icon, type, clsPrefix, spinProps) {
    if (typeof icon === 'function') {
        return icon();
    }
    else {
        const innerIcon = type === 'loading' ? ((0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ clsPrefix: clsPrefix, strokeWidth: 24, scale: 0.85 }, spinProps))) : (iconRenderMap[type]());
        if (!innerIcon)
            return null;
        return ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, key: type }, {
            default: () => innerIcon
        }));
    }
}
