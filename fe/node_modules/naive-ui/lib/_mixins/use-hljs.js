"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useHljs;
const vue_1 = require("vue");
const _utils_1 = require("../_utils");
const context_1 = require("../config-provider/src/context");
function useHljs(props, shouldHighlightRef) {
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    if (process.env.NODE_ENV !== 'production') {
        const warnHljs = () => {
            if (!props.hljs && !(NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value)) {
                (0, _utils_1.warn)('code', 'hljs is not set.');
            }
        };
        if (!shouldHighlightRef) {
            warnHljs();
        }
        else {
            (0, vue_1.watchEffect)(() => {
                if (shouldHighlightRef.value) {
                    warnHljs();
                }
            });
        }
    }
    return (0, vue_1.computed)(() => {
        return props.hljs || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value);
    });
}
