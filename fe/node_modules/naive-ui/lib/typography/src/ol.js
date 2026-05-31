"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.olProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const list_cssr_1 = __importDefault(require("./styles/list.cssr"));
exports.olProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { alignText: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Ol',
    props: exports.olProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Typography', '-xl', list_cssr_1.default, styles_1.typographyLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { olPadding, ulPadding, liMargin, liTextColor, liLineHeight, liFontSize } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': liFontSize,
                '--n-line-height': liLineHeight,
                '--n-text-color': liTextColor,
                '--n-li-margin': liMargin,
                '--n-ol-padding': olPadding,
                '--n-ul-padding': ulPadding
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('ol', undefined, cssVarsRef, props)
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
        return ((0, vue_1.h)("ol", { class: [
                `${mergedClsPrefix}-ol`,
                this.themeClass,
                this.alignText && `${mergedClsPrefix}-ol--align-text`
            ], style: this.cssVars }, this.$slots));
    }
});
