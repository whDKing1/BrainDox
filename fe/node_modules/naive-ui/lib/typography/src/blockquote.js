"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockquoteProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const blockquote_cssr_1 = __importDefault(require("./styles/blockquote.cssr"));
exports.blockquoteProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { alignText: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Blockquote',
    props: exports.blockquoteProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Typography', '-blockquote', blockquote_cssr_1.default, styles_1.typographyLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { blockquoteTextColor, blockquotePrefixColor, blockquoteLineHeight, blockquoteFontSize } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': blockquoteFontSize,
                '--n-line-height': blockquoteLineHeight,
                '--n-prefix-color': blockquotePrefixColor,
                '--n-text-color': blockquoteTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('blockquote', undefined, cssVarsRef, props)
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
        const { mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("blockquote", { class: [
                `${mergedClsPrefix}-blockquote`,
                this.themeClass,
                this.alignText && `${mergedClsPrefix}-blockquote--align-text`
            ], style: this.cssVars }, this.$slots));
    }
});
