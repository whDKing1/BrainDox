"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadingStyleClass = useLoadingStyleClass;
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const css_render_1 = require("css-render");
const vue_1 = require("vue");
const cssr_1 = require("../../_utils/cssr");
const context_1 = require("../../config-provider/src/context");
function useLoadingStyleClass(props, themeRef) {
    const loadingClassRef = (0, vue_1.ref)('');
    const adapter = (0, vue3_ssr_1.useSsrAdapter)();
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    const styleMountTarget = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget;
    (0, vue_1.onMounted)(() => {
        (0, vue_1.watchEffect)(() => {
            if (!props.loading) {
                return;
            }
            const { self: { loadingColorStart, loadingColorEnd } } = themeRef.value;
            const loadingColorHash = (0, css_render_1.hash)(loadingColorStart) + (0, css_render_1.hash)(loadingColorEnd);
            const className = `heatmap-loading-${loadingColorHash}`;
            const animationName = `heatmap-loading-animation-${loadingColorHash}`;
            loadingClassRef.value = className;
            const cnode = (0, cssr_1.c)([
                (0, cssr_1.c)(`.${className}`, `
          animation: 2s ${animationName} infinite cubic-bezier(0.36, 0, 0.64, 1);
        `),
                (0, cssr_1.c)(`@keyframes ${animationName}`, `
          0% {
            background: ${loadingColorStart};
          }
          40% {
            background: ${loadingColorEnd};
          }
          80% {
            background: ${loadingColorStart};
          }
          100% {
            background: ${loadingColorStart};
          }
        `)
            ]);
            // We don't unmount it since we didn't know its mount count
            cnode.mount({
                id: loadingColorHash,
                ssr: adapter,
                parent: styleMountTarget
            });
        });
    });
    return loadingClassRef;
}
