"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NDialog = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const button_1 = require("../../button");
const styles_1 = require("../styles");
const dialogProps_1 = require("./dialogProps");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const iconRenderMap = {
    default: () => (0, vue_1.h)(icons_1.InfoIcon, null),
    info: () => (0, vue_1.h)(icons_1.InfoIcon, null),
    success: () => (0, vue_1.h)(icons_1.SuccessIcon, null),
    warning: () => (0, vue_1.h)(icons_1.WarningIcon, null),
    error: () => (0, vue_1.h)(icons_1.ErrorIcon, null)
};
exports.NDialog = (0, vue_1.defineComponent)({
    name: 'Dialog',
    alias: [
        'NimbusConfirmCard', // deprecated
        'Confirm' // deprecated
    ],
    props: Object.assign(Object.assign({}, _mixins_1.useTheme.props), dialogProps_1.dialogProps),
    slots: Object,
    setup(props) {
        const { mergedComponentPropsRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Dialog', mergedRtlRef, mergedClsPrefixRef);
        const mergedIconPlacementRef = (0, vue_1.computed)(() => {
            var _a, _b;
            const { iconPlacement } = props;
            return (iconPlacement
                || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Dialog) === null || _b === void 0 ? void 0 : _b.iconPlacement)
                || 'left');
        });
        function handlePositiveClick(e) {
            const { onPositiveClick } = props;
            if (onPositiveClick)
                onPositiveClick(e);
        }
        function handleNegativeClick(e) {
            const { onNegativeClick } = props;
            if (onNegativeClick)
                onNegativeClick(e);
        }
        function handleCloseClick() {
            const { onClose } = props;
            if (onClose)
                onClose();
        }
        const themeRef = (0, _mixins_1.useTheme)('Dialog', '-dialog', index_cssr_1.default, styles_1.dialogLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type } = props;
            const iconPlacement = mergedIconPlacementRef.value;
            const { common: { cubicBezierEaseInOut }, self: { fontSize, lineHeight, border, titleTextColor, textColor, color, closeBorderRadius, closeColorHover, closeColorPressed, closeIconColor, closeIconColorHover, closeIconColorPressed, closeIconSize, borderRadius, titleFontWeight, titleFontSize, padding, iconSize, actionSpace, contentMargin, closeSize, [iconPlacement === 'top' ? 'iconMarginIconTop' : 'iconMargin']: iconMargin, [iconPlacement === 'top' ? 'closeMarginIconTop' : 'closeMargin']: closeMargin, [(0, _utils_1.createKey)('iconColor', type)]: iconColor } } = themeRef.value;
            const iconMarginDiscrete = (0, seemly_1.getMargin)(iconMargin);
            return {
                '--n-font-size': fontSize,
                '--n-icon-color': iconColor,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-close-margin': closeMargin,
                '--n-icon-margin-top': iconMarginDiscrete.top,
                '--n-icon-margin-right': iconMarginDiscrete.right,
                '--n-icon-margin-bottom': iconMarginDiscrete.bottom,
                '--n-icon-margin-left': iconMarginDiscrete.left,
                '--n-icon-size': iconSize,
                '--n-close-size': closeSize,
                '--n-close-icon-size': closeIconSize,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-color': color,
                '--n-text-color': textColor,
                '--n-border-radius': borderRadius,
                '--n-padding': padding,
                '--n-line-height': lineHeight,
                '--n-border': border,
                '--n-content-margin': contentMargin,
                '--n-title-font-size': titleFontSize,
                '--n-title-font-weight': titleFontWeight,
                '--n-title-text-color': titleTextColor,
                '--n-action-space': actionSpace
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('dialog', (0, vue_1.computed)(() => `${props.type[0]}${mergedIconPlacementRef.value[0]}`), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            mergedIconPlacement: mergedIconPlacementRef,
            mergedTheme: themeRef,
            handlePositiveClick,
            handleNegativeClick,
            handleCloseClick,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { bordered, mergedIconPlacement, cssVars, closable, showIcon, title, content, action, negativeText, positiveText, positiveButtonProps, negativeButtonProps, handlePositiveClick, handleNegativeClick, mergedTheme, loading, type, mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const icon = showIcon ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-dialog__icon` }, {
            default: () => (0, _utils_1.resolveWrappedSlot)(this.$slots.icon, children => children
                || (this.icon ? (0, _utils_1.render)(this.icon) : iconRenderMap[this.type]()))
        })) : null;
        const actionNode = (0, _utils_1.resolveWrappedSlot)(this.$slots.action, children => children || positiveText || negativeText || action ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-dialog__action`, this.actionClass], style: this.actionStyle }, children
            || (action
                ? [(0, _utils_1.render)(action)]
                : [
                    this.negativeText && ((0, vue_1.h)(button_1.NButton, Object.assign({ theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, ghost: true, size: "small", onClick: handleNegativeClick }, negativeButtonProps), {
                        default: () => (0, _utils_1.render)(this.negativeText)
                    })),
                    this.positiveText && ((0, vue_1.h)(button_1.NButton, Object.assign({ theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "small", type: type === 'default' ? 'primary' : type, disabled: loading, loading: loading, onClick: handlePositiveClick }, positiveButtonProps), {
                        default: () => (0, _utils_1.render)(this.positiveText)
                    }))
                ]))) : null);
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-dialog`,
                this.themeClass,
                this.closable && `${mergedClsPrefix}-dialog--closable`,
                `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
                bordered && `${mergedClsPrefix}-dialog--bordered`,
                this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`
            ], style: cssVars, role: "dialog" },
            closable
                ? (0, _utils_1.resolveWrappedSlot)(this.$slots.close, (node) => {
                    const classNames = [
                        `${mergedClsPrefix}-dialog__close`,
                        this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`
                    ];
                    return node ? ((0, vue_1.h)("div", { class: classNames }, node)) : ((0, vue_1.h)(_internal_1.NBaseClose, { focusable: this.closeFocusable, clsPrefix: mergedClsPrefix, class: classNames, onClick: this.handleCloseClick }));
                })
                : null,
            showIcon && mergedIconPlacement === 'top' ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-dialog-icon-container` }, icon)) : null,
            (0, vue_1.h)("div", { class: [`${mergedClsPrefix}-dialog__title`, this.titleClass], style: this.titleStyle },
                showIcon && mergedIconPlacement === 'left' ? icon : null,
                (0, _utils_1.resolveSlot)(this.$slots.header, () => [(0, _utils_1.render)(title)])),
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-dialog__content`,
                    actionNode ? '' : `${mergedClsPrefix}-dialog__content--last`,
                    this.contentClass
                ], style: this.contentStyle }, (0, _utils_1.resolveSlot)(this.$slots.default, () => [(0, _utils_1.render)(content)])),
            actionNode));
    }
});
