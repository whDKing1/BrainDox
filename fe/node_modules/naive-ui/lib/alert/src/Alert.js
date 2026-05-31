"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.alertProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { title: String, showIcon: {
        type: Boolean,
        default: true
    }, type: {
        type: String,
        default: 'default'
    }, bordered: {
        type: Boolean,
        default: true
    }, closable: Boolean, onClose: Function, onAfterLeave: Function, 
    /** @deprecated */
    onAfterHide: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Alert',
    inheritAttrs: false,
    props: exports.alertProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onAfterHide !== undefined) {
                    (0, _utils_1.warnOnce)('alert', '`on-after-hide` is deprecated, please use `on-after-leave` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, mergedBorderedRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Alert', '-alert', index_cssr_1.default, styles_1.alertLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Alert', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { fontSize, borderRadius, titleFontWeight, lineHeight, iconSize, iconMargin, iconMarginRtl, closeIconSize, closeBorderRadius, closeSize, closeMargin, closeMarginRtl, padding } = self;
            const { type } = props;
            const { left, right } = (0, seemly_1.getMargin)(iconMargin);
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-color': self[(0, _utils_1.createKey)('color', type)],
                '--n-close-icon-size': closeIconSize,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-color-hover': self[(0, _utils_1.createKey)('closeColorHover', type)],
                '--n-close-color-pressed': self[(0, _utils_1.createKey)('closeColorPressed', type)],
                '--n-close-icon-color': self[(0, _utils_1.createKey)('closeIconColor', type)],
                '--n-close-icon-color-hover': self[(0, _utils_1.createKey)('closeIconColorHover', type)],
                '--n-close-icon-color-pressed': self[(0, _utils_1.createKey)('closeIconColorPressed', type)],
                '--n-icon-color': self[(0, _utils_1.createKey)('iconColor', type)],
                '--n-border': self[(0, _utils_1.createKey)('border', type)],
                '--n-title-text-color': self[(0, _utils_1.createKey)('titleTextColor', type)],
                '--n-content-text-color': self[(0, _utils_1.createKey)('contentTextColor', type)],
                '--n-line-height': lineHeight,
                '--n-border-radius': borderRadius,
                '--n-font-size': fontSize,
                '--n-title-font-weight': titleFontWeight,
                '--n-icon-size': iconSize,
                '--n-icon-margin': iconMargin,
                '--n-icon-margin-rtl': iconMarginRtl,
                '--n-close-size': closeSize,
                '--n-close-margin': closeMargin,
                '--n-close-margin-rtl': closeMarginRtl,
                '--n-padding': padding,
                '--n-icon-margin-left': left,
                '--n-icon-margin-right': right
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('alert', (0, vue_1.computed)(() => {
                return props.type[0];
            }), cssVarsRef, props)
            : undefined;
        const visibleRef = (0, vue_1.ref)(true);
        const doAfterLeave = () => {
            const { onAfterLeave, onAfterHide // deprecated
             } = props;
            if (onAfterLeave)
                onAfterLeave();
            if (onAfterHide)
                onAfterHide();
        };
        const handleCloseClick = () => {
            var _a;
            void Promise.resolve((_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props)).then((result) => {
                if (result === false)
                    return;
                visibleRef.value = false;
            });
        };
        const handleAfterLeave = () => {
            doAfterLeave();
        };
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            visible: visibleRef,
            handleCloseClick,
            handleAfterLeave,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, { onAfterLeave: this.handleAfterLeave }, {
            default: () => {
                const { mergedClsPrefix, $slots } = this;
                const attrs = {
                    class: [
                        `${mergedClsPrefix}-alert`,
                        this.themeClass,
                        this.closable && `${mergedClsPrefix}-alert--closable`,
                        this.showIcon && `${mergedClsPrefix}-alert--show-icon`,
                        // fix: https://github.com/tusen-ai/naive-ui/issues/4588
                        !this.title
                            && this.closable
                            && `${mergedClsPrefix}-alert--right-adjust`,
                        this.rtlEnabled && `${mergedClsPrefix}-alert--rtl`
                    ],
                    style: this.cssVars,
                    role: 'alert'
                };
                return this.visible ? ((0, vue_1.h)("div", Object.assign({}, (0, vue_1.mergeProps)(this.$attrs, attrs)),
                    this.closable && ((0, vue_1.h)(_internal_1.NBaseClose, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-alert__close`, onClick: this.handleCloseClick })),
                    this.bordered && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-alert__border` })),
                    this.showIcon && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-alert__icon`, "aria-hidden": "true" }, (0, _utils_1.resolveSlot)($slots.icon, () => [
                        (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                            default: () => {
                                switch (this.type) {
                                    case 'success':
                                        return (0, vue_1.h)(icons_1.SuccessIcon, null);
                                    case 'info':
                                        return (0, vue_1.h)(icons_1.InfoIcon, null);
                                    case 'warning':
                                        return (0, vue_1.h)(icons_1.WarningIcon, null);
                                    case 'error':
                                        return (0, vue_1.h)(icons_1.ErrorIcon, null);
                                    default:
                                        return null;
                                }
                            }
                        })
                    ]))),
                    (0, vue_1.h)("div", { class: [
                            `${mergedClsPrefix}-alert-body`,
                            this.mergedBordered
                                && `${mergedClsPrefix}-alert-body--bordered`
                        ] },
                        (0, _utils_1.resolveWrappedSlot)($slots.header, (children) => {
                            const mergedChildren = children || this.title;
                            return mergedChildren ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-alert-body__title` }, mergedChildren)) : null;
                        }),
                        $slots.default && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-alert-body__content` }, $slots))))) : null;
            }
        }));
    }
});
