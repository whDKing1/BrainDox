"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeVars = useThemeVars;
const vue_1 = require("vue");
const common_1 = require("../_styles/common");
const context_1 = require("../config-provider/src/context");
function useThemeVars() {
    const configProviderInjection = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
    return (0, vue_1.computed)(() => {
        if (configProviderInjection === null)
            return common_1.commonLight;
        const { mergedThemeRef: { value: mergedTheme }, mergedThemeOverridesRef: { value: mergedThemeOverrides } } = configProviderInjection;
        const currentThemeVars = (mergedTheme === null || mergedTheme === void 0 ? void 0 : mergedTheme.common) || common_1.commonLight;
        if (mergedThemeOverrides === null || mergedThemeOverrides === void 0 ? void 0 : mergedThemeOverrides.common) {
            return Object.assign({}, currentThemeVars, mergedThemeOverrides.common);
        }
        else {
            return currentThemeVars;
        }
    });
}
