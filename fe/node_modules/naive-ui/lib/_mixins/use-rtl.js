"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRtl = useRtl;
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const css_render_1 = require("css-render");
const vue_1 = require("vue");
const context_1 = require("../config-provider/src/context");
const common_1 = require("./common");
function useRtl(mountId, rtlStateRef, clsPrefixRef) {
    if (!rtlStateRef)
        return undefined;
    const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
    const componentRtlStateRef = (0, vue_1.computed)(() => {
        const { value: rtlState } = rtlStateRef;
        if (!rtlState) {
            return undefined;
        }
        const componentRtlState = rtlState[mountId];
        if (!componentRtlState) {
            return undefined;
        }
        return componentRtlState;
    });
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    const mountStyle = () => {
        (0, vue_1.watchEffect)(() => {
            const { value: clsPrefix } = clsPrefixRef;
            const id = `${clsPrefix}${mountId}Rtl`;
            // if it already exists, we only need to watch clsPrefix, although in most
            // of time it's unnecessary... However we can at least listen less
            // handlers, which is great.
            if ((0, css_render_1.exists)(id, ssrAdapter))
                return;
            const { value: componentRtlState } = componentRtlStateRef;
            if (!componentRtlState)
                return;
            componentRtlState.style.mount({
                id,
                head: true,
                anchorMetaName: common_1.cssrAnchorMetaName,
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
    }
    else {
        (0, vue_1.onBeforeMount)(mountStyle);
    }
    return componentRtlStateRef;
}
