"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeClass = useThemeClass;
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const css_render_1 = require("css-render");
const vue_1 = require("vue");
const _utils_1 = require("../_utils");
const cssr_1 = require("../_utils/cssr");
const context_1 = require("../config-provider/src/context");
function useThemeClass(componentName, hashRef, cssVarsRef, props) {
    if (!cssVarsRef)
        (0, _utils_1.throwError)('useThemeClass', 'cssVarsRef is not passed');
    const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    const mergedThemeHashRef = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeHashRef;
    const styleMountTarget = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget;
    const themeClassRef = (0, vue_1.ref)('');
    const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
    let renderCallback;
    const hashClassPrefix = `__${componentName}`;
    const mountStyle = () => {
        let finalThemeHash = hashClassPrefix;
        const hashValue = hashRef ? hashRef.value : undefined;
        const themeHash = mergedThemeHashRef === null || mergedThemeHashRef === void 0 ? void 0 : mergedThemeHashRef.value;
        if (themeHash)
            finalThemeHash += `-${themeHash}`;
        if (hashValue)
            finalThemeHash += `-${hashValue}`;
        const { themeOverrides, builtinThemeOverrides } = props;
        if (themeOverrides) {
            finalThemeHash += `-${(0, css_render_1.hash)(JSON.stringify(themeOverrides))}`;
        }
        if (builtinThemeOverrides) {
            finalThemeHash += `-${(0, css_render_1.hash)(JSON.stringify(builtinThemeOverrides))}`;
        }
        themeClassRef.value = finalThemeHash;
        renderCallback = () => {
            const cssVars = cssVarsRef.value;
            let style = '';
            for (const key in cssVars) {
                style += `${key}: ${cssVars[key]};`;
            }
            (0, cssr_1.c)(`.${finalThemeHash}`, style).mount({
                id: finalThemeHash,
                ssr: ssrAdapter,
                parent: styleMountTarget
            });
            renderCallback = undefined;
        };
    };
    (0, vue_1.watchEffect)(() => {
        mountStyle();
    });
    return {
        themeClass: themeClassRef,
        onRender: () => {
            renderCallback === null || renderCallback === void 0 ? void 0 : renderCallback();
        }
    };
}
