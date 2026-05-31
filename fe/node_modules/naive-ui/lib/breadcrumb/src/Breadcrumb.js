"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumbProps = exports.breadcrumbInjectionKey = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.breadcrumbInjectionKey = (0, _utils_1.createInjectionKey)('n-breadcrumb');
exports.breadcrumbProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { separator: {
        type: String,
        default: '/'
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Breadcrumb',
    props: exports.breadcrumbProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Breadcrumb', '-breadcrumb', index_cssr_1.default, styles_1.breadcrumbLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(exports.breadcrumbInjectionKey, {
            separatorRef: (0, vue_1.toRef)(props, 'separator'),
            mergedClsPrefixRef
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { separatorColor, itemTextColor, itemTextColorHover, itemTextColorPressed, itemTextColorActive, fontSize, fontWeightActive, itemBorderRadius, itemColorHover, itemColorPressed, itemLineHeight } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-item-text-color': itemTextColor,
                '--n-item-text-color-hover': itemTextColorHover,
                '--n-item-text-color-pressed': itemTextColorPressed,
                '--n-item-text-color-active': itemTextColorActive,
                '--n-separator-color': separatorColor,
                '--n-item-color-hover': itemColorHover,
                '--n-item-color-pressed': itemColorPressed,
                '--n-item-border-radius': itemBorderRadius,
                '--n-font-weight-active': fontWeightActive,
                '--n-item-line-height': itemLineHeight
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('breadcrumb', undefined, cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("nav", { class: [`${this.mergedClsPrefix}-breadcrumb`, this.themeClass], style: this.cssVars, "aria-label": "Breadcrumb" },
            (0, vue_1.h)("ul", null, this.$slots)));
    }
});
