"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradientTextProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.gradientTextProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: [String, Number], fontSize: [String, Number], type: {
        type: String,
        default: 'primary'
    }, color: [Object, String], gradient: [Object, String] });
exports.default = (0, vue_1.defineComponent)({
    name: 'GradientText',
    props: exports.gradientTextProps,
    setup(props) {
        (0, _utils_1.useHoudini)();
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const compatibleTypeRef = (0, vue_1.computed)(() => {
            const { type } = props;
            if (type === 'danger')
                return 'error';
            return type;
        });
        const styleFontSizeRef = (0, vue_1.computed)(() => {
            let fontSize = props.size || props.fontSize;
            if (fontSize)
                fontSize = (0, _utils_1.formatLength)(fontSize);
            return fontSize || undefined;
        });
        const styleBgImageRef = (0, vue_1.computed)(() => {
            const gradient = props.color || props.gradient;
            if (typeof gradient === 'string') {
                return gradient;
            }
            else if (gradient) {
                const deg = gradient.deg || 0;
                const from = gradient.from;
                const to = gradient.to;
                return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`;
            }
            return undefined;
        });
        const themeRef = (0, _mixins_1.useTheme)('GradientText', '-gradient-text', index_cssr_1.default, styles_1.gradientTextLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: type } = compatibleTypeRef;
            const { common: { cubicBezierEaseInOut }, self: { rotate, [(0, _utils_1.createKey)('colorStart', type)]: colorStart, [(0, _utils_1.createKey)('colorEnd', type)]: colorEnd, fontWeight } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-rotate': rotate,
                '--n-color-start': colorStart,
                '--n-color-end': colorEnd,
                '--n-font-weight': fontWeight
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('gradient-text', (0, vue_1.computed)(() => compatibleTypeRef.value[0]), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            compatibleType: compatibleTypeRef,
            styleFontSize: styleFontSizeRef,
            styleBgImage: styleBgImageRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("span", { class: [
                `${mergedClsPrefix}-gradient-text`,
                `${mergedClsPrefix}-gradient-text--${this.compatibleType}-type`,
                this.themeClass
            ], style: [
                {
                    fontSize: this.styleFontSize,
                    backgroundImage: this.styleBgImage
                },
                this.cssVars
            ] }, this.$slots));
    }
});
