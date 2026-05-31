"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = createTheme;
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const index_cssr_1 = __importDefault(require("../_styles/global/index.cssr"));
const context_1 = require("../config-provider/src/context");
const common_1 = require("./common");
function createTheme(theme) {
    return theme;
}
function useTheme(resolveId, mountId, style, defaultTheme, props, clsPrefixRef) {
    const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    if (style) {
        const mountStyle = () => {
            const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
            style.mount({
                id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
                head: true,
                props: {
                    bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
                },
                anchorMetaName: common_1.cssrAnchorMetaName,
                ssr: ssrAdapter,
                parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
            });
            if (!(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.preflightStyleDisabled)) {
                index_cssr_1.default.mount({
                    id: 'n-global',
                    head: true,
                    anchorMetaName: common_1.cssrAnchorMetaName,
                    ssr: ssrAdapter,
                    parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
                });
            }
        };
        if (ssrAdapter) {
            mountStyle();
        }
        else {
            (0, vue_1.onBeforeMount)(mountStyle);
        }
    }
    const mergedThemeRef = (0, vue_1.computed)(() => {
        var _a;
        // keep props to make theme overrideable
        const { theme: { common: selfCommon, self, peers = {} } = {}, themeOverrides: selfOverrides = {}, builtinThemeOverrides: builtinOverrides = {} } = props;
        const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides;
        const { common: globalCommon = undefined, [resolveId]: { common: globalSelfCommon = undefined, self: globalSelf = undefined, peers: globalPeers = {} } = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || {};
        const { common: globalCommonOverrides = undefined, [resolveId]: globalSelfOverrides = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value) || {};
        const { common: globalSelfCommonOverrides, peers: globalPeersOverrides = {} } = globalSelfOverrides;
        const mergedCommon = (0, lodash_1.merge)({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
        const mergedSelf = (0, lodash_1.merge)(
        // {}, executed every time, no need for empty obj
        (_a = (self || globalSelf || defaultTheme.self)) === null || _a === void 0 ? void 0 : _a(mergedCommon), builtinOverrides, globalSelfOverrides, selfOverrides);
        return {
            common: mergedCommon,
            self: mergedSelf,
            peers: (0, lodash_1.merge)({}, defaultTheme.peers, globalPeers, peers),
            peerOverrides: (0, lodash_1.merge)({}, builtinOverrides.peers, globalPeersOverrides, peersOverrides)
        };
    });
    return mergedThemeRef;
}
useTheme.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
};
/**
 * props.theme (Theme):
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 * provider.theme:
 * {
 *   common: CommonThemeVars,
 *   Button: Theme
 *   ...
 * }
 * defaultTheme:
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 *
 * props.themeOverrides (ThemeOverrides):
 * {
 *   common: CommonThemeVars,
 *   peers: { Component: ThemeOverrides },
 *   ...ThemeVars
 * }
 * provider.themeOverrides:
 * {
 *   common: CommonThemeVars,
 *   Component: ThemeOverrides
 *   ...
 * }
 *
 * mergedTheme:
 * {
 *   common: CommonThemeVars,
 *   self: ThemeVars,
 *   peers: { Component: Theme },
 *   overrides: { Component: ThemeOverrides }
 * }
 */
exports.default = useTheme;
