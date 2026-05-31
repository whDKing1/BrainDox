"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.statisticProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { tabularNums: Boolean, label: String, value: [String, Number] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Statistic',
    props: exports.statisticProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Statistic', '-statistic', index_cssr_1.default, styles_1.statisticLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Statistic', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { labelFontWeight, valueFontSize, valueFontWeight, valuePrefixTextColor, labelTextColor, valueSuffixTextColor, valueTextColor, labelFontSize }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-label-font-size': labelFontSize,
                '--n-label-font-weight': labelFontWeight,
                '--n-label-text-color': labelTextColor,
                '--n-value-font-weight': valueFontWeight,
                '--n-value-font-size': valueFontSize,
                '--n-value-prefix-text-color': valuePrefixTextColor,
                '--n-value-suffix-text-color': valueSuffixTextColor,
                '--n-value-text-color': valueTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('statistic', undefined, cssVarsRef, props)
            : undefined;
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { mergedClsPrefix, $slots: { default: defaultSlot, label: labelSlot, prefix: prefixSlot, suffix: suffixSlot } } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-statistic`,
                this.themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-statistic--rtl`
            ], style: this.cssVars },
            (0, _utils_1.resolveWrappedSlot)(labelSlot, children => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-statistic__label` }, this.label || children))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-statistic-value`, style: {
                    fontVariantNumeric: this.tabularNums ? 'tabular-nums' : ''
                } },
                (0, _utils_1.resolveWrappedSlot)(prefixSlot, children => children && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-statistic-value__prefix` }, children))),
                this.value !== undefined ? ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-statistic-value__content` }, this.value)) : ((0, _utils_1.resolveWrappedSlot)(defaultSlot, children => children && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-statistic-value__content` }, children)))),
                (0, _utils_1.resolveWrappedSlot)(suffixSlot, children => children && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-statistic-value__suffix` }, children))))));
    }
});
