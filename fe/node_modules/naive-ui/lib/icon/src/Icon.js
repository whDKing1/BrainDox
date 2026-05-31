"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NIcon = exports.iconProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.iconProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { depth: [String, Number], size: [Number, String], color: String, component: [Object, Function] });
exports.NIcon = (0, vue_1.defineComponent)({
    _n_icon__: true,
    name: 'Icon',
    inheritAttrs: false,
    props: exports.iconProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Icon', '-icon', index_cssr_1.default, styles_1.iconLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { depth } = props;
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            if (depth !== undefined) {
                const { color, [`opacity${depth}Depth`]: opacity } = self;
                return {
                    '--n-bezier': cubicBezierEaseInOut,
                    '--n-color': color,
                    '--n-opacity': opacity
                };
            }
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-color': '',
                '--n-opacity': ''
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('icon', (0, vue_1.computed)(() => `${props.depth || 'd'}`), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedStyle: (0, vue_1.computed)(() => {
                const { size, color } = props;
                return {
                    fontSize: (0, _utils_1.formatLength)(size),
                    color
                };
            }),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { $parent, depth, mergedClsPrefix, component, onRender, themeClass } = this;
        if ((_a = $parent === null || $parent === void 0 ? void 0 : $parent.$options) === null || _a === void 0 ? void 0 : _a._n_icon__) {
            (0, _utils_1.warn)('icon', 'don\'t wrap `n-icon` inside `n-icon`');
        }
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return (0, vue_1.h)('i', (0, vue_1.mergeProps)(this.$attrs, {
            role: 'img',
            class: [
                `${mergedClsPrefix}-icon`,
                themeClass,
                {
                    [`${mergedClsPrefix}-icon--depth`]: depth,
                    [`${mergedClsPrefix}-icon--color-transition`]: depth !== undefined
                }
            ],
            style: [this.cssVars, this.mergedStyle]
        }), component ? (0, vue_1.h)(component) : this.$slots);
    }
});
