"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelPropKeys = exports.panelProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const button_1 = require("../../button");
const interface_1 = require("./interface");
exports.panelProps = {
    positiveText: String,
    negativeText: String,
    showIcon: {
        type: Boolean,
        default: true
    },
    onPositiveClick: {
        type: Function,
        required: true
    },
    onNegativeClick: {
        type: Function,
        required: true
    }
};
exports.panelPropKeys = (0, _utils_1.keysOf)(exports.panelProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'NPopconfirmPanel',
    props: exports.panelProps,
    setup(props) {
        const { localeRef } = (0, _mixins_1.useLocale)('Popconfirm');
        const { inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const { mergedClsPrefixRef, mergedThemeRef, props: popconfirmProps } = (0, vue_1.inject)(interface_1.popconfirmInjectionKey);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { fontSize, iconSize, iconColor } } = mergedThemeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-icon-size': iconSize,
                '--n-icon-color': iconColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('popconfirm-panel', undefined, cssVarsRef, popconfirmProps)
            : undefined;
        return Object.assign(Object.assign({}, (0, _mixins_1.useLocale)('Popconfirm')), { mergedClsPrefix: mergedClsPrefixRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, localizedPositiveText: (0, vue_1.computed)(() => {
                return props.positiveText || localeRef.value.positiveText;
            }), localizedNegativeText: (0, vue_1.computed)(() => {
                return props.negativeText || localeRef.value.negativeText;
            }), positiveButtonProps: (0, vue_1.toRef)(popconfirmProps, 'positiveButtonProps'), negativeButtonProps: (0, vue_1.toRef)(popconfirmProps, 'negativeButtonProps'), handlePositiveClick(e) {
                props.onPositiveClick(e);
            },
            handleNegativeClick(e) {
                props.onNegativeClick(e);
            }, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        var _a;
        const { mergedClsPrefix, showIcon, $slots } = this;
        const actionContentNode = (0, _utils_1.resolveSlot)($slots.action, () => this.negativeText === null && this.positiveText === null
            ? []
            : [
                this.negativeText !== null && ((0, vue_1.h)(button_1.NButton, Object.assign({ size: "small", onClick: this.handleNegativeClick }, this.negativeButtonProps), { default: () => this.localizedNegativeText })),
                this.positiveText !== null && ((0, vue_1.h)(button_1.NButton, Object.assign({ size: "small", type: "primary", onClick: this.handlePositiveClick }, this.positiveButtonProps), { default: () => this.localizedPositiveText }))
            ]);
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-popconfirm__panel`, this.themeClass], style: this.cssVars },
            (0, _utils_1.resolveWrappedSlot)($slots.default, children => showIcon || children ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-popconfirm__body` },
                showIcon ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-popconfirm__icon` }, (0, _utils_1.resolveSlot)($slots.icon, () => [
                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.WarningIcon, null) })
                ]))) : null,
                children)) : null),
            actionContentNode ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-popconfirm__action`] }, actionContentNode)) : null));
    }
});
