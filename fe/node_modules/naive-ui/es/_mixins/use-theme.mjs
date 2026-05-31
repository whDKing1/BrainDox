import { useSsrAdapter } from '@css-render/vue3-ssr';
import { merge } from 'lodash-es';
import { computed, inject, onBeforeMount } from 'vue';
import globalStyle from "../_styles/global/index.cssr.mjs";
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
import { cssrAnchorMetaName } from "./common.mjs";
export function createTheme(theme) {
  return theme;
}
function useTheme(resolveId, mountId, style, defaultTheme, props, clsPrefixRef) {
  const ssrAdapter = useSsrAdapter();
  const NConfigProvider = inject(configProviderInjectionKey, null);
  if (style) {
    const mountStyle = () => {
      const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
      style.mount({
        id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
        },
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
      if (!(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.preflightStyleDisabled)) {
        globalStyle.mount({
          id: 'n-global',
          head: true,
          anchorMetaName: cssrAnchorMetaName,
          ssr: ssrAdapter,
          parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
        });
      }
    };
    if (ssrAdapter) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
  }
  const mergedThemeRef = computed(() => {
    var _a;
    // keep props to make theme overrideable
    const {
      theme: {
        common: selfCommon,
        self,
        peers = {}
      } = {},
      themeOverrides: selfOverrides = {},
      builtinThemeOverrides: builtinOverrides = {}
    } = props;
    const {
      common: selfCommonOverrides,
      peers: peersOverrides
    } = selfOverrides;
    const {
      common: globalCommon = undefined,
      [resolveId]: {
        common: globalSelfCommon = undefined,
        self: globalSelf = undefined,
        peers: globalPeers = {}
      } = {}
    } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || {};
    const {
      common: globalCommonOverrides = undefined,
      [resolveId]: globalSelfOverrides = {}
    } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value) || {};
    const {
      common: globalSelfCommonOverrides,
      peers: globalPeersOverrides = {}
    } = globalSelfOverrides;
    const mergedCommon = merge({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
    const mergedSelf = merge(
    // {}, executed every time, no need for empty obj
    (_a = self || globalSelf || defaultTheme.self) === null || _a === void 0 ? void 0 : _a(mergedCommon), builtinOverrides, globalSelfOverrides, selfOverrides);
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge({}, builtinOverrides.peers, globalPeersOverrides, peersOverrides)
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
export default useTheme;