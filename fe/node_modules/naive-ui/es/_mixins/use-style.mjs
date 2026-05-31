import { useSsrAdapter } from '@css-render/vue3-ssr';
import { inject, onBeforeMount } from 'vue';
import globalStyle from "../_styles/global/index.cssr.mjs";
import { throwError } from "../_utils/index.mjs";
import { configProviderInjectionKey } from "../config-provider/src/context.mjs";
import { cssrAnchorMetaName } from "./common.mjs";
export default function useStyle(mountId, style, clsPrefixRef) {
  if (!style) {
    if (process.env.NODE_ENV !== 'production') throwError('use-style', 'No style is specified.');
    return;
  }
  const ssrAdapter = useSsrAdapter();
  const NConfigProvider = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    const clsPrefix = clsPrefixRef.value;
    style.mount({
      id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      },
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