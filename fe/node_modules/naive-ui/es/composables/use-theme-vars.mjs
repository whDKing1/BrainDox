import { computed, inject } from 'vue';
import { commonLight } from "../_styles/common/index.mjs";
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
export function useThemeVars() {
  const configProviderInjection = inject(configProviderInjectionKey, null);
  return computed(() => {
    if (configProviderInjection === null) return commonLight;
    const {
      mergedThemeRef: {
        value: mergedTheme
      },
      mergedThemeOverridesRef: {
        value: mergedThemeOverrides
      }
    } = configProviderInjection;
    const currentThemeVars = (mergedTheme === null || mergedTheme === void 0 ? void 0 : mergedTheme.common) || commonLight;
    if (mergedThemeOverrides === null || mergedThemeOverrides === void 0 ? void 0 : mergedThemeOverrides.common) {
      return Object.assign({}, currentThemeVars, mergedThemeOverrides.common);
    } else {
      return currentThemeVars;
    }
  });
}