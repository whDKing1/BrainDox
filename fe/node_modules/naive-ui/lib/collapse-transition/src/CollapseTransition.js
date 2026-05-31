"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collapseTransitionProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.collapseTransitionProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { show: {
        type: Boolean,
        default: true
    }, appear: Boolean, 
    // The collapsed is implemented with mistake, collapsed=true would make it show
    // However there's no possibility to change so I just let it deprecated and use
    // `show` prop instead.
    /** @deprecated */
    collapsed: {
        type: Boolean,
        default: undefined
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'CollapseTransition',
    props: exports.collapseTransitionProps,
    inheritAttrs: false,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.collapsed !== undefined) {
                    (0, _utils_1.warnOnce)('collapse-transition', '`collapsed` is deprecated, please use `show` instead');
                }
            });
        }
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const mergedThemeRef = (0, _mixins_1.useTheme)('CollapseTransition', '-collapse-transition', index_cssr_1.default, styles_1.collapseTransitionLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('CollapseTransition', mergedRtlRef, mergedClsPrefixRef);
        const mergedShowRef = (0, vue_1.computed)(() => {
            if (props.collapsed !== undefined) {
                // No mistake, it's implemented with error at first, just keep it here
                return props.collapsed;
            }
            return props.show;
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { bezier } } = mergedThemeRef.value;
            return {
                '--n-bezier': bezier
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('collapse-transition', undefined, cssVarsRef, props)
            : undefined;
        return {
            rtlEnabled: rtlEnabledRef,
            mergedShow: mergedShowRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, { appear: this.appear }, {
            default: () => {
                var _a;
                if (!this.mergedShow)
                    return;
                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                return (0, vue_1.h)('div', // Don't use jsx since it would cause useless spread in each rendering
                (0, vue_1.mergeProps)({
                    class: [
                        `${this.mergedClsPrefix}-collapse-transition`,
                        this.rtlEnabled
                            && `${this.mergedClsPrefix}-collapse-transition--rtl`,
                        this.themeClass
                    ],
                    style: this.cssVars
                }, this.$attrs), this.$slots);
            }
        }));
    }
});
