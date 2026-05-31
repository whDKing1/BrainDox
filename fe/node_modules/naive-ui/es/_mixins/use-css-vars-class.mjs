import { useSsrAdapter } from '@css-render/vue3-ssr';
import { hash } from 'css-render';
import { inject, ref, watchEffect } from 'vue';
import { throwError } from "../_utils/index.mjs";
import { c } from "../_utils/cssr/index.mjs";
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
export function useThemeClass(componentName, hashRef, cssVarsRef, props) {
  if (!cssVarsRef) throwError('useThemeClass', 'cssVarsRef is not passed');
  const NConfigProvider = inject(configProviderInjectionKey, null);
  const mergedThemeHashRef = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeHashRef;
  const styleMountTarget = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget;
  const themeClassRef = ref('');
  const ssrAdapter = useSsrAdapter();
  let renderCallback;
  const hashClassPrefix = `__${componentName}`;
  const mountStyle = () => {
    let finalThemeHash = hashClassPrefix;
    const hashValue = hashRef ? hashRef.value : undefined;
    const themeHash = mergedThemeHashRef === null || mergedThemeHashRef === void 0 ? void 0 : mergedThemeHashRef.value;
    if (themeHash) finalThemeHash += `-${themeHash}`;
    if (hashValue) finalThemeHash += `-${hashValue}`;
    const {
      themeOverrides,
      builtinThemeOverrides
    } = props;
    if (themeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(themeOverrides))}`;
    }
    if (builtinThemeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(builtinThemeOverrides))}`;
    }
    themeClassRef.value = finalThemeHash;
    renderCallback = () => {
      const cssVars = cssVarsRef.value;
      let style = '';
      for (const key in cssVars) {
        style += `${key}: ${cssVars[key]};`;
      }
      c(`.${finalThemeHash}`, style).mount({
        id: finalThemeHash,
        ssr: ssrAdapter,
        parent: styleMountTarget
      });
      renderCallback = undefined;
    };
  };
  watchEffect(() => {
    mountStyle();
  });
  return {
    themeClass: themeClassRef,
    onRender: () => {
      renderCallback === null || renderCallback === void 0 ? void 0 : renderCallback();
    }
  };
}