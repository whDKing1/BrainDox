"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInjectionKey = exports.listProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.listProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: {
        type: String,
        default: 'medium'
    }, bordered: Boolean, clickable: Boolean, hoverable: Boolean, showDivider: {
        type: Boolean,
        default: true
    } });
exports.listInjectionKey = (0, _utils_1.createInjectionKey)('n-list');
exports.default = (0, vue_1.defineComponent)({
    name: 'List',
    props: exports.listProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('List', mergedRtlRef, mergedClsPrefixRef);
        const themeRef = (0, _mixins_1.useTheme)('List', '-list', index_cssr_1.default, styles_1.listLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(exports.listInjectionKey, {
            showDividerRef: (0, vue_1.toRef)(props, 'showDivider'),
            mergedClsPrefixRef
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { fontSize, textColor, color, colorModal, colorPopover, borderColor, borderColorModal, borderColorPopover, borderRadius, colorHover, colorHoverModal, colorHoverPopover } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-text-color': textColor,
                '--n-color': color,
                '--n-border-radius': borderRadius,
                '--n-border-color': borderColor,
                '--n-border-color-modal': borderColorModal,
                '--n-border-color-popover': borderColorPopover,
                '--n-color-modal': colorModal,
                '--n-color-popover': colorPopover,
                '--n-color-hover': colorHover,
                '--n-color-hover-modal': colorHoverModal,
                '--n-color-hover-popover': colorHoverPopover
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('list', undefined, cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { $slots, mergedClsPrefix, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("ul", { class: [
                `${mergedClsPrefix}-list`,
                this.rtlEnabled && `${mergedClsPrefix}-list--rtl`,
                this.bordered && `${mergedClsPrefix}-list--bordered`,
                this.showDivider && `${mergedClsPrefix}-list--show-divider`,
                this.hoverable && `${mergedClsPrefix}-list--hoverable`,
                this.clickable && `${mergedClsPrefix}-list--clickable`,
                this.themeClass
            ], style: this.cssVars },
            $slots.header ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list__header` }, $slots.header())) : null, (_a = $slots.default) === null || _a === void 0 ? void 0 :
            _a.call($slots),
            $slots.footer ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list__footer` }, $slots.footer())) : null));
    }
});
