"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.notificationPropKeys = exports.notificationProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
const iconRenderMap = {
    info: () => (0, vue_1.h)(icons_1.InfoIcon, null),
    success: () => (0, vue_1.h)(icons_1.SuccessIcon, null),
    warning: () => (0, vue_1.h)(icons_1.WarningIcon, null),
    error: () => (0, vue_1.h)(icons_1.ErrorIcon, null),
    default: () => null
};
exports.notificationProps = {
    closable: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'default'
    },
    avatar: Function,
    title: [String, Function],
    description: [String, Function],
    content: [String, Function],
    meta: [String, Function],
    action: [String, Function],
    onClose: {
        type: Function,
        required: true
    },
    keepAliveOnHover: Boolean,
    onMouseenter: Function,
    onMouseleave: Function
};
exports.notificationPropKeys = (0, _utils_1.keysOf)(exports.notificationProps);
exports.Notification = (0, vue_1.defineComponent)({
    name: 'Notification',
    props: exports.notificationProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedThemeRef, props: providerProps } = (0, vue_1.inject)(context_1.notificationProviderInjectionKey);
        const { inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)();
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Notification', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type } = props;
            const { self: { color, textColor, closeIconColor, closeIconColorHover, closeIconColorPressed, headerTextColor, descriptionTextColor, actionTextColor, borderRadius, headerFontWeight, boxShadow, lineHeight, fontSize, closeMargin, closeSize, width, padding, closeIconSize, closeBorderRadius, closeColorHover, closeColorPressed, titleFontSize, metaFontSize, descriptionFontSize, [(0, _utils_1.createKey)('iconColor', type)]: iconColor }, common: { cubicBezierEaseOut, cubicBezierEaseIn, cubicBezierEaseInOut } } = mergedThemeRef.value;
            const { left, right, top, bottom } = (0, seemly_1.getPadding)(padding);
            return {
                '--n-color': color,
                '--n-font-size': fontSize,
                '--n-text-color': textColor,
                '--n-description-text-color': descriptionTextColor,
                '--n-action-text-color': actionTextColor,
                '--n-title-text-color': headerTextColor,
                '--n-title-font-weight': headerFontWeight,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-bezier-ease-out': cubicBezierEaseOut,
                '--n-bezier-ease-in': cubicBezierEaseIn,
                '--n-border-radius': borderRadius,
                '--n-box-shadow': boxShadow,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-line-height': lineHeight,
                '--n-icon-color': iconColor,
                '--n-close-margin': closeMargin,
                '--n-close-size': closeSize,
                '--n-close-icon-size': closeIconSize,
                '--n-width': width,
                '--n-padding-left': left,
                '--n-padding-right': right,
                '--n-padding-top': top,
                '--n-padding-bottom': bottom,
                '--n-title-font-size': titleFontSize,
                '--n-meta-font-size': metaFontSize,
                '--n-description-font-size': descriptionFontSize
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('notification', (0, vue_1.computed)(() => props.type[0]), cssVarsRef, providerProps)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            showAvatar: (0, vue_1.computed)(() => {
                return props.avatar || props.type !== 'default';
            }),
            handleCloseClick() {
                props.onClose();
            },
            rtlEnabled: rtlEnabledRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-notification-wrapper`, this.themeClass], onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave, style: this.cssVars },
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-notification`,
                    this.rtlEnabled && `${mergedClsPrefix}-notification--rtl`,
                    this.themeClass,
                    {
                        [`${mergedClsPrefix}-notification--closable`]: this.closable,
                        [`${mergedClsPrefix}-notification--show-avatar`]: this.showAvatar
                    }
                ], style: this.cssVars },
                this.showAvatar ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification__avatar` }, this.avatar ? ((0, _utils_1.render)(this.avatar)) : this.type !== 'default' ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => iconRenderMap[this.type]() })) : null)) : null,
                this.closable ? ((0, vue_1.h)(_internal_1.NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-notification__close`, onClick: this.handleCloseClick })) : null,
                (0, vue_1.h)("div", { ref: "bodyRef", class: `${mergedClsPrefix}-notification-main` },
                    this.title ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification-main__header` }, (0, _utils_1.render)(this.title))) : null,
                    this.description ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification-main__description` }, (0, _utils_1.render)(this.description))) : null,
                    this.content ? ((0, vue_1.h)("pre", { class: `${mergedClsPrefix}-notification-main__content` }, (0, _utils_1.render)(this.content))) : null,
                    this.meta || this.action ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification-main-footer` },
                        this.meta ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification-main-footer__meta` }, (0, _utils_1.render)(this.meta))) : null,
                        this.action ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-notification-main-footer__action` }, (0, _utils_1.render)(this.action))) : null)) : null))));
    }
});
