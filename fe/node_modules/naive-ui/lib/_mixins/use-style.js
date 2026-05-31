"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useStyle;
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const vue_1 = require("vue");
const index_cssr_1 = __importDefault(require("../_styles/global/index.cssr"));
const _utils_1 = require("../_utils");
const context_1 = require("../config-provider/src/context");
const common_1 = require("./common");
function useStyle(mountId, style, clsPrefixRef) {
    if (!style) {
        if (process.env.NODE_ENV !== 'production')
            (0, _utils_1.throwError)('use-style', 'No style is specified.');
        return;
    }
    const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    const mountStyle = () => {
        const clsPrefix = clsPrefixRef.value;
        style.mount({
            id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
            head: true,
            anchorMetaName: common_1.cssrAnchorMetaName,
            props: {
                bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
            },
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
