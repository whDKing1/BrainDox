"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configProviderProps = void 0;
const css_render_1 = require("css-render");
const lodash_1 = require("lodash");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
exports.configProviderProps = {
    abstract: Boolean,
    bordered: {
        type: Boolean,
        default: undefined
    },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
        type: String,
        default: 'div'
    },
    hljs: Object,
    katex: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    preflightStyleDisabled: Boolean,
    styleMountTarget: Object,
    inlineThemeDisabled: {
        type: Boolean,
        default: undefined
    },
    // deprecated
    as: {
        type: String,
        validator: () => {
            (0, _utils_1.warn)('config-provider', '`as` is deprecated, please use `tag` instead.');
            return true;
        },
        default: undefined
    }
};
exports.default = (0, vue_1.defineComponent)({
    name: 'ConfigProvider',
    alias: ['App'],
    props: exports.configProviderProps,
    setup(props) {
        const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
        const mergedThemeRef = (0, vue_1.computed)(() => {
            const { theme } = props;
            if (theme === null)
                return undefined;
            const inheritedTheme = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value;
            return theme === undefined
                ? inheritedTheme
                : inheritedTheme === undefined
                    ? theme
                    : Object.assign({}, inheritedTheme, theme);
        });
        const mergedThemeOverridesRef = (0, vue_1.computed)(() => {
            const { themeOverrides } = props;
            // stop inheriting themeOverrides
            if (themeOverrides === null)
                return undefined;
            // use inherited themeOverrides
            if (themeOverrides === undefined) {
                return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
            }
            else {
                const inheritedThemeOverrides = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
                if (inheritedThemeOverrides === undefined) {
                    // no inherited, use self overrides
                    return themeOverrides;
                }
                else {
                    // merge overrides
                    return (0, lodash_1.merge)({}, inheritedThemeOverrides, themeOverrides);
                }
            }
        });
        const mergedNamespaceRef = (0, vooks_1.useMemo)(() => {
            const { namespace } = props;
            return namespace === undefined
                ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value
                : namespace;
        });
        const mergedBorderedRef = (0, vooks_1.useMemo)(() => {
            const { bordered } = props;
            return bordered === undefined
                ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value
                : bordered;
        });
        const mergedIconsRef = (0, vue_1.computed)(() => {
            const { icons } = props;
            return icons === undefined ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedIconsRef.value : icons;
        });
        const mergedComponentPropsRef = (0, vue_1.computed)(() => {
            const { componentOptions } = props;
            if (componentOptions !== undefined)
                return componentOptions;
            return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value;
        });
        const mergedClsPrefixRef = (0, vue_1.computed)(() => {
            const { clsPrefix } = props;
            if (clsPrefix !== undefined)
                return clsPrefix;
            if (NConfigProvider)
                return NConfigProvider.mergedClsPrefixRef.value;
            return _mixins_1.defaultClsPrefix;
        });
        const mergedRtlRef = (0, vue_1.computed)(() => {
            var _a;
            const { rtl } = props;
            if (rtl === undefined) {
                return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef.value;
            }
            const rtlEnabledState = {};
            for (const rtlInfo of rtl) {
                rtlEnabledState[rtlInfo.name] = (0, vue_1.markRaw)(rtlInfo);
                (_a = rtlInfo.peers) === null || _a === void 0 ? void 0 : _a.forEach((peerRtlInfo) => {
                    if (!(peerRtlInfo.name in rtlEnabledState)) {
                        rtlEnabledState[peerRtlInfo.name] = (0, vue_1.markRaw)(peerRtlInfo);
                    }
                });
            }
            return rtlEnabledState;
        });
        const mergedBreakpointsRef = (0, vue_1.computed)(() => {
            return props.breakpoints || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBreakpointsRef.value);
        });
        const inlineThemeDisabled = props.inlineThemeDisabled || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.inlineThemeDisabled);
        const preflightStyleDisabled = props.preflightStyleDisabled || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.preflightStyleDisabled);
        const styleMountTarget = props.styleMountTarget || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget);
        const mergedThemeHashRef = (0, vue_1.computed)(() => {
            const { value: theme } = mergedThemeRef;
            const { value: mergedThemeOverrides } = mergedThemeOverridesRef;
            const hasThemeOverrides = mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0;
            const themeName = theme === null || theme === void 0 ? void 0 : theme.name;
            if (themeName) {
                if (hasThemeOverrides) {
                    return `${themeName}-${(0, css_render_1.hash)(JSON.stringify(mergedThemeOverridesRef.value))}`;
                }
                return themeName;
            }
            else {
                if (hasThemeOverrides) {
                    return (0, css_render_1.hash)(JSON.stringify(mergedThemeOverridesRef.value));
                }
                return '';
            }
        });
        (0, vue_1.provide)(context_1.configProviderInjectionKey, {
            mergedThemeHashRef,
            mergedBreakpointsRef,
            mergedRtlRef,
            mergedIconsRef,
            mergedComponentPropsRef,
            mergedBorderedRef,
            mergedNamespaceRef,
            mergedClsPrefixRef,
            mergedLocaleRef: (0, vue_1.computed)(() => {
                const { locale } = props;
                if (locale === null)
                    return undefined;
                return locale === undefined
                    ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedLocaleRef.value
                    : locale;
            }),
            mergedDateLocaleRef: (0, vue_1.computed)(() => {
                const { dateLocale } = props;
                if (dateLocale === null)
                    return undefined;
                return dateLocale === undefined
                    ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedDateLocaleRef.value
                    : dateLocale;
            }),
            mergedHljsRef: (0, vue_1.computed)(() => {
                const { hljs } = props;
                return hljs === undefined ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value : hljs;
            }),
            mergedKatexRef: (0, vue_1.computed)(() => {
                const { katex } = props;
                return katex === undefined
                    ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedKatexRef.value
                    : katex;
            }),
            mergedThemeRef,
            mergedThemeOverridesRef,
            inlineThemeDisabled: inlineThemeDisabled || false,
            preflightStyleDisabled: preflightStyleDisabled || false,
            styleMountTarget
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            mergedNamespace: mergedNamespaceRef,
            mergedTheme: mergedThemeRef,
            mergedThemeOverrides: mergedThemeOverridesRef
        };
    },
    render() {
        var _a, _b, _c, _d;
        return !this.abstract
            ? (0, vue_1.h)(this.as || this.tag, {
                class: `${this.mergedClsPrefix || _mixins_1.defaultClsPrefix}-config-provider`
            }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
            : (_d = (_c = this.$slots).default) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
});
