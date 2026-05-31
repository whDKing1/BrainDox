"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutFooterProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const layout_footer_cssr_1 = __importDefault(require("./styles/layout-footer.cssr"));
exports.layoutFooterProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { inverted: Boolean, position: interface_1.positionProp, bordered: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'LayoutFooter',
    props: exports.layoutFooterProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Layout', '-layout-footer', layout_footer_cssr_1.default, styles_1.layoutLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const vars = {
                '--n-bezier': cubicBezierEaseInOut
            };
            if (props.inverted) {
                vars['--n-color'] = self.footerColorInverted;
                vars['--n-text-color'] = self.textColorInverted;
                vars['--n-border-color'] = self.footerBorderColorInverted;
            }
            else {
                vars['--n-color'] = self.footerColor;
                vars['--n-text-color'] = self.textColor;
                vars['--n-border-color'] = self.footerBorderColor;
            }
            return vars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('layout-footer', (0, vue_1.computed)(() => (props.inverted ? 'a' : 'b')), cssVarsRef, props)
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
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-layout-footer`,
                this.themeClass,
                this.position
                    && `${mergedClsPrefix}-layout-footer--${this.position}-positioned`,
                this.bordered && `${mergedClsPrefix}-layout-footer--bordered`
            ], style: this.cssVars }, this.$slots));
    }
});
