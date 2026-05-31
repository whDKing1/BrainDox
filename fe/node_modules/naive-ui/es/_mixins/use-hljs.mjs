import { computed, inject, watchEffect } from 'vue';
import { warn } from "../_utils/index.mjs";
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
export default function useHljs(props, shouldHighlightRef) {
  const NConfigProvider = inject(configProviderInjectionKey, null);
  if (process.env.NODE_ENV !== 'production') {
    const warnHljs = () => {
      if (!props.hljs && !(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value)) {
        warn('code', 'hljs is not set.');
      }
    };
    if (!shouldHighlightRef) {
      warnHljs();
    } else {
      watchEffect(() => {
        if (shouldHighlightRef.value) {
          warnHljs();
        }
      });
    }
  }
  return computed(() => {
    return props.hljs || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value);
  });
}