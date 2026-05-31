import { useSsrAdapter } from '@css-render/vue3-ssr';
import { exists } from 'css-render';
import { computed, inject, onBeforeMount, watchEffect } from 'vue';
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
import { cssrAnchorMetaName } from "./common.mjs";
export function useRtl(mountId, rtlStateRef, clsPrefixRef) {
  if (!rtlStateRef) return undefined;
  const ssrAdapter = useSsrAdapter();
  const componentRtlStateRef = computed(() => {
    const {
      value: rtlState
    } = rtlStateRef;
    if (!rtlState) {
      return undefined;
    }
    const componentRtlState = rtlState[mountId];
    if (!componentRtlState) {
      return undefined;
    }
    return componentRtlState;
  });
  const NConfigProvider = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    watchEffect(() => {
      const {
        value: clsPrefix
      } = clsPrefixRef;
      const id = `${clsPrefix}${mountId}Rtl`;
      // if it already exists, we only need to watch clsPrefix, although in most
      // of time it's unnecessary... However we can at least listen less
      // handlers, which is great.
      if (exists(id, ssrAdapter)) return;
      const {
        value: componentRtlState
      } = componentRtlStateRef;
      if (!componentRtlState) return;
      componentRtlState.style.mount({
        id,
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
        },
        ssr: ssrAdapter,
        parent: NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget
      });
    });
  };
  if (ssrAdapter) {
    mountStyle();
  } else {
    onBeforeMount(mountStyle);
  }
  return componentRtlStateRef;
}