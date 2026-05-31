"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocale;
const vue_1 = require("vue");
const context_1 = require("../config-provider/src/context");
const locales_1 = require("../locales");
function useLocale(ns) {
    const { mergedLocaleRef, mergedDateLocaleRef } = (0, vue_1.inject)(context_1.configProviderInjectionKey, null) || {};
    const localeRef = (0, vue_1.computed)(() => {
        var _a, _b;
        return (_b = (_a = mergedLocaleRef === null || mergedLocaleRef === void 0 ? void 0 : mergedLocaleRef.value) === null || _a === void 0 ? void 0 : _a[ns]) !== null && _b !== void 0 ? _b : locales_1.enUS[ns];
    });
    const dateLocaleRef = (0, vue_1.computed)(() => {
        var _a;
        return (_a = mergedDateLocaleRef === null || mergedDateLocaleRef === void 0 ? void 0 : mergedDateLocaleRef.value) !== null && _a !== void 0 ? _a : locales_1.dateEnUS;
    });
    return {
        dateLocaleRef,
        localeRef
    };
}
