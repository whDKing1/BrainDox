"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const header_cssr_1 = __importDefault(require("./styles/header.cssr"));
exports.headerProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { type: {
        type: String,
        default: 'default'
    }, prefix: String, alignText: Boolean });
exports.default = (level) => (0, vue_1.defineComponent)({
    name: `H${level}`,
    props: exports.headerProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Typography', '-h', header_cssr_1.default, styles_1.typographyLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type } = props;
            const { common: { cubicBezierEaseInOut }, self: { headerFontWeight, headerTextColor, [(0, _utils_1.createKey)('headerPrefixWidth', level)]: prefixWidth, [(0, _utils_1.createKey)('headerFontSize', level)]: fontSize, [(0, _utils_1.createKey)('headerMargin', level)]: margin, [(0, _utils_1.createKey)('headerBarWidth', level)]: barWidth, [(0, _utils_1.createKey)('headerBarColor', type)]: barColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-margin': margin,
                '--n-bar-color': barColor,
                '--n-bar-width': barWidth,
                '--n-font-weight': headerFontWeight,
                '--n-text-color': headerTextColor,
                '--n-prefix-width': prefixWidth
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)(`h${level}`, (0, vue_1.computed)(() => props.type[0]), cssVarsRef, props)
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
        const { prefix, alignText, mergedClsPrefix, cssVars, $slots } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return (0, vue_1.h)(`h${level}`, {
            class: [
                `${mergedClsPrefix}-h`,
                `${mergedClsPrefix}-h${level}`,
                this.themeClass,
                {
                    [`${mergedClsPrefix}-h--prefix-bar`]: prefix,
                    [`${mergedClsPrefix}-h--align-text`]: alignText
                }
            ],
            style: cssVars
        }, $slots);
    }
});
