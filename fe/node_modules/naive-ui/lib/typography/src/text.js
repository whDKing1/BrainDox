"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const text_cssr_1 = __importDefault(require("./styles/text.cssr"));
exports.textProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { code: Boolean, type: {
        type: String,
        default: 'default'
    }, delete: Boolean, strong: Boolean, italic: Boolean, underline: Boolean, depth: [String, Number], tag: String, 
    // deprecated
    as: {
        type: String,
        validator: () => {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('text', '`as` is deprecated, please use `tag` instead.');
            }
            return true;
        },
        default: undefined
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Text',
    props: exports.textProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Typography', '-text', text_cssr_1.default, styles_1.typographyLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { depth, type } = props;
            const textColorKey = type === 'default'
                ? depth === undefined
                    ? 'textColor'
                    : `textColor${depth}Depth`
                : (0, _utils_1.createKey)('textColor', type);
            const { common: { fontWeightStrong, fontFamilyMono, cubicBezierEaseInOut }, self: { codeTextColor, codeBorderRadius, codeColor, codeBorder, [textColorKey]: textColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-text-color': textColor,
                '--n-font-weight-strong': fontWeightStrong,
                '--n-font-famliy-mono': fontFamilyMono,
                '--n-code-border-radius': codeBorderRadius,
                '--n-code-text-color': codeTextColor,
                '--n-code-color': codeColor,
                '--n-code-border': codeBorder
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('text', (0, vue_1.computed)(() => `${props.type[0]}${props.depth || ''}`), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            compitableTag: (0, vooks_1.useCompitable)(props, ['as', 'tag']),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a, _b, _c;
        const { mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const textClass = [
            `${mergedClsPrefix}-text`,
            this.themeClass,
            {
                [`${mergedClsPrefix}-text--code`]: this.code,
                [`${mergedClsPrefix}-text--delete`]: this.delete,
                [`${mergedClsPrefix}-text--strong`]: this.strong,
                [`${mergedClsPrefix}-text--italic`]: this.italic,
                [`${mergedClsPrefix}-text--underline`]: this.underline
            }
        ];
        const children = (_c = (_b = this.$slots).default) === null || _c === void 0 ? void 0 : _c.call(_b);
        return this.code ? ((0, vue_1.h)("code", { class: textClass, style: this.cssVars }, this.delete ? (0, vue_1.h)("del", null, children) : children)) : this.delete ? ((0, vue_1.h)("del", { class: textClass, style: this.cssVars }, children)) : ((0, vue_1.h)(this.compitableTag || 'span', { class: textClass, style: this.cssVars }, children));
    }
});
