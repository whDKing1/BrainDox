"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const vue_1 = require("vue");
const utils_1 = require("./utils");
let usedCount = 0;
// Mql means media query list
const supportMatchMedia = typeof window !== 'undefined' && window.matchMedia !== undefined;
const osTheme = (0, vue_1.ref)(null);
let darkMql;
let lightMql;
function handleDarkMqlChange(e) {
    if (e.matches) {
        osTheme.value = 'dark';
    }
}
function handleLightMqlChange(e) {
    if (e.matches) {
        osTheme.value = 'light';
    }
}
function init() {
    darkMql = window.matchMedia('(prefers-color-scheme: dark)');
    lightMql = window.matchMedia('(prefers-color-scheme: light)');
    if (darkMql.matches) {
        osTheme.value = 'dark';
    }
    else if (lightMql.matches) {
        osTheme.value = 'light';
    }
    else {
        osTheme.value = null;
    }
    if (darkMql.addEventListener) {
        darkMql.addEventListener('change', handleDarkMqlChange);
        lightMql.addEventListener('change', handleLightMqlChange);
    }
    else if (darkMql.addListener) {
        darkMql.addListener(handleDarkMqlChange);
        lightMql.addListener(handleLightMqlChange);
    }
}
function clean() {
    if ('removeEventListener' in darkMql) {
        darkMql.removeEventListener('change', handleDarkMqlChange);
        lightMql.removeEventListener('change', handleLightMqlChange);
    }
    else if ('removeListener' in darkMql) {
        darkMql.removeListener(handleDarkMqlChange);
        lightMql.removeListener(handleLightMqlChange);
    }
    darkMql = undefined;
    lightMql = undefined;
}
let managable = true;
function useOsTheme() {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test' && !supportMatchMedia) {
        return (0, vue_1.readonly)(osTheme);
    }
    if (process.env.NODE_ENV === 'test' && window.matchMedia === undefined) {
        return (0, vue_1.readonly)(osTheme);
    }
    if (usedCount === 0)
        init();
    if (managable && (managable = (0, utils_1.hasInstance)())) {
        (0, vue_1.onBeforeMount)(() => {
            usedCount += 1;
        });
        (0, vue_1.onBeforeUnmount)(() => {
            usedCount -= 1;
            if (usedCount === 0)
                clean();
        });
    }
    return (0, vue_1.readonly)(osTheme);
}
exports.default = useOsTheme;
