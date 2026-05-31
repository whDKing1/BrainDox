"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dividerProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.dividerProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { titlePlacement: {
        type: String,
        default: 'center'
    }, dashed: Boolean, vertical: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Divider',
    props: exports.dividerProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Divider', '-divider', index_cssr_1.default, styles_1.dividerLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { color, textColor, fontWeight } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-color': color,
                '--n-text-color': textColor,
                '--n-font-weight': fontWeight
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('divider', undefined, cssVarsRef, props)
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
        const { $slots, titlePlacement, vertical, dashed, cssVars, mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { role: "separator", class: [
                `${mergedClsPrefix}-divider`,
                this.themeClass,
                {
                    [`${mergedClsPrefix}-divider--vertical`]: vertical,
                    [`${mergedClsPrefix}-divider--no-title`]: !$slots.default,
                    [`${mergedClsPrefix}-divider--dashed`]: dashed,
                    [`${mergedClsPrefix}-divider--title-position-${titlePlacement}`]: $slots.default && titlePlacement
                }
            ], style: cssVars },
            !vertical ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--left` })) : null,
            !vertical && $slots.default ? ((0, vue_1.h)(vue_1.Fragment, null,
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-divider__title` }, this.$slots),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--right` }))) : null));
    }
});
