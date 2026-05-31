"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NIconWrapper = exports.iconWrapperProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.iconWrapperProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: {
        type: Number,
        default: 24
    }, borderRadius: {
        type: Number,
        default: 6
    }, color: String, iconColor: String });
exports.NIconWrapper = (0, vue_1.defineComponent)({
    name: 'IconWrapper',
    props: exports.iconWrapperProps,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('IconWrapper', '-icon-wrapper', index_cssr_1.default, styles_1.iconWrapperLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { color, iconColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-color': color,
                '--n-icon-color': iconColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('icon-wrapper', undefined, cssVarsRef, props)
            : undefined;
        return () => {
            const size = (0, _utils_1.formatLength)(props.size);
            themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefixRef.value}-icon-wrapper`,
                    themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value
                ], style: [
                    cssVarsRef === null || cssVarsRef === void 0 ? void 0 : cssVarsRef.value,
                    {
                        height: size,
                        width: size,
                        borderRadius: (0, _utils_1.formatLength)(props.borderRadius),
                        backgroundColor: props.color,
                        color: props.iconColor
                    }
                ] }, slots));
        };
    }
});
