"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatButtonGroupInjectionKey = exports.floatButtonGroupProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const light_1 = __importDefault(require("../styles/light"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.floatButtonGroupProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { left: [Number, String], right: [Number, String], top: [Number, String], bottom: [Number, String], shape: {
        type: String,
        default: 'circle'
    }, position: {
        type: String,
        default: 'fixed'
    } });
exports.floatButtonGroupInjectionKey = (0, _utils_1.createInjectionKey)('n-float-button-group');
exports.default = (0, vue_1.defineComponent)({
    name: 'FloatButtonGroup',
    props: exports.floatButtonGroupProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('FloatButtonGroup', '-float-button-group', index_cssr_1.default, light_1.default, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { color, boxShadow, buttonBorderColor, borderRadiusSquare }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-box-shadow': boxShadow,
                '--n-color': color,
                '--n-button-border-color': buttonBorderColor,
                '--n-border-radius-square': borderRadiusSquare,
                position: props.position,
                left: (0, _utils_1.formatLength)(props.left) || '',
                right: (0, _utils_1.formatLength)(props.right) || '',
                top: (0, _utils_1.formatLength)(props.top) || '',
                bottom: (0, _utils_1.formatLength)(props.bottom) || ''
            };
        });
        (0, vue_1.provide)(exports.floatButtonGroupInjectionKey, {
            shapeRef: (0, vue_1.toRef)(props, 'shape')
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('float-button', undefined, cssVarsRef, props)
            : undefined;
        return {
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            mergedClsPrefix: mergedClsPrefixRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix, cssVars, shape } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-float-button-group`,
                `${mergedClsPrefix}-float-button-group--${shape}-shape`
            ], style: cssVars, role: "group" }, this.$slots));
    }
});
